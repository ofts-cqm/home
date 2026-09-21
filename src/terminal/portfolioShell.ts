import {
  Bash,
  defineCommand,
  getCommandNames,
  InMemoryFs,
  type BufferEncoding,
  type CpOptions,
  type FileContent,
  type IFileSystem,
  type InitialFiles,
  type MkdirOptions,
  type RmOptions,
} from "just-bash/browser";

const ASSET_ROOT = "/assets";
export const DEFAULT_TERMINAL_DIRECTORY = `${ASSET_ROOT}/content`;

const assetUrls = import.meta.glob("../assets/**/*", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

function toVirtualPath(sourcePath: string): string {
  return `${ASSET_ROOT}/${sourcePath.replace(/^\.\.\/assets\//, "")}`;
}

async function createAssetFiles(): Promise<InitialFiles> {
  const files: InitialFiles = {};

  const loadedAssets = await Promise.all(
    Object.entries(assetUrls).map(async ([sourcePath, url]) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Unable to load ${sourcePath}`);
      }

      return [
        toVirtualPath(sourcePath),
        new Uint8Array(await response.arrayBuffer()),
      ] as const;
    }),
  );

  for (const [path, source] of loadedAssets) {
    files[path] = source;
  }

  return files;
}

function accessDeniedError(): Error {
  return new Error("Permission denied: portfolio filesystem is read-only");
}

class ReadOnlyFileSystem implements IFileSystem {
  constructor(private readonly source: IFileSystem) {}

  readFile(
    path: string,
    options?: BufferEncoding | { encoding?: BufferEncoding | null },
  ) {
    return this.source.readFile(path, options);
  }

  readFileBuffer(path: string) {
    return this.source.readFileBuffer(path);
  }

  exists(path: string) {
    return this.source.exists(path);
  }

  stat(path: string) {
    return this.source.stat(path);
  }

  lstat(path: string) {
    return this.source.lstat(path);
  }

  readdir(path: string) {
    return this.source.readdir(path);
  }

  resolvePath(base: string, path: string) {
    const resolved = this.source.resolvePath(base, path);
    return isWithinAssets(resolved) ? resolved : ASSET_ROOT;
  }

  getAllPaths() {
    return this.source.getAllPaths();
  }

  readlink(path: string) {
    return this.source.readlink(path);
  }

  realpath(path: string) {
    return this.source.realpath(path);
  }

  writeFile(_path: string, _content: FileContent) {
    return Promise.reject(accessDeniedError());
  }

  appendFile(_path: string, _content: FileContent) {
    return Promise.reject(accessDeniedError());
  }

  mkdir(_path: string, _options?: MkdirOptions) {
    return Promise.reject(accessDeniedError());
  }

  rm(_path: string, _options?: RmOptions) {
    return Promise.reject(accessDeniedError());
  }

  cp(_source: string, _destination: string, _options?: CpOptions) {
    return Promise.reject(accessDeniedError());
  }

  mv(_source: string, _destination: string) {
    return Promise.reject(accessDeniedError());
  }

  chmod(_path: string, _mode: number) {
    return Promise.reject(accessDeniedError());
  }

  symlink(_target: string, _linkPath: string) {
    return Promise.reject(accessDeniedError());
  }

  link(_existingPath: string, _newPath: string) {
    return Promise.reject(accessDeniedError());
  }

  utimes(_path: string, _atime: Date, _mtime: Date) {
    return Promise.reject(accessDeniedError());
  }
}

function isWithinAssets(path: string): boolean {
  return path === ASSET_ROOT || path.startsWith(`${ASSET_ROOT}/`);
}

function readonlyCommand(name: string) {
  return defineCommand(name, async () => ({
    stdout: "",
    stderr: `${name}: access denied: portfolio filesystem is read-only\n`,
    exitCode: 1,
  }));
}

const restrictedCommands = [
  "cp",
  "mv",
  "rm",
  "touch",
  "mkdir",
  "chmod",
  "sudo",
];

const shellBuiltins = [
  ".",
  ":",
  "[",
  "alias",
  "bg",
  "break",
  "builtin",
  "caller",
  "cd",
  "command",
  "compgen",
  "complete",
  "continue",
  "declare",
  "dirs",
  "disown",
  "echo",
  "enable",
  "eval",
  "exec",
  "exit",
  "export",
  "false",
  "fc",
  "fg",
  "getopts",
  "hash",
  "help",
  "history",
  "jobs",
  "kill",
  "let",
  "local",
  "mapfile",
  "popd",
  "printf",
  "pushd",
  "pwd",
  "read",
  "readarray",
  "readonly",
  "return",
  "set",
  "shift",
  "shopt",
  "source",
  "suspend",
  "test",
  "times",
  "trap",
  "true",
  "type",
  "typeset",
  "ulimit",
  "umask",
  "unalias",
  "unset",
  "wait",
];

const availableCommands = Array.from(
  new Set([
    ...getCommandNames(),
    ...shellBuiltins,
    ...restrictedCommands,
    "open",
  ]),
).sort((left, right) => left.localeCompare(right));

const helpOutput = [
  "Portfolio shell commands (filesystem is read-only):",
  availableCommands.join("  "),
  "",
  "Use open <file.md> to display a Markdown file in the editor.",
  "",
].join("\n");

export interface PortfolioShellOptions {
  onOpenMarkdown?: (path: string) => void | Promise<void>;
}

export interface TerminalCommandResult {
  directory: string;
  stdout: string;
  stderr: string;
}

export interface PortfolioShell {
  execute(command: string): Promise<TerminalCommandResult>;
}

export function createPortfolioShellWithFiles(
  files: InitialFiles,
  options: PortfolioShellOptions = {},
): PortfolioShell {
  const fileSystem = new ReadOnlyFileSystem(new InMemoryFs(files));
  let directory = DEFAULT_TERMINAL_DIRECTORY;

  const openCommand = defineCommand("open", async (args, context) => {
    if (args.length !== 1) {
      return {
        stdout: "",
        stderr: "Usage: open <file.md>\n",
        exitCode: 2,
      };
    }

    const requestedPath = args[0]!;
    const resolvedPath = context.fs.resolvePath(context.cwd, requestedPath);

    if (!resolvedPath.toLowerCase().endsWith(".md")) {
      return {
        stdout: "",
        stderr: `open: ${requestedPath}: not a Markdown file\n`,
        exitCode: 1,
      };
    }

    if (!(await context.fs.exists(resolvedPath))) {
      return {
        stdout: "",
        stderr: `open: ${requestedPath}: no such file\n`,
        exitCode: 1,
      };
    }

    const file = await context.fs.stat(resolvedPath);
    if (!file.isFile) {
      return {
        stdout: "",
        stderr: `open: ${requestedPath}: not a file\n`,
        exitCode: 1,
      };
    }

    try {
      await options.onOpenMarkdown?.(resolvedPath);
    } catch (error) {
      return {
        stdout: "",
        stderr: `open: ${error instanceof Error ? error.message : "unable to open file"}\n`,
        exitCode: 1,
      };
    }

    return { stdout: "", stderr: "", exitCode: 0 };
  });

  const shell = new Bash({
    fs: fileSystem,
    cwd: directory,
    env: {
      HOME: ASSET_ROOT,
      LOGNAME: "guest",
      SHELL: "/bin/bash",
      USER: "guest",
    },
    customCommands: [...restrictedCommands.map(readonlyCommand), openCommand],
  });

  return {
    async execute(command: string): Promise<TerminalCommandResult> {
      if (command.trim() === "help") {
        return {
          directory,
          stdout: helpOutput,
          stderr: "",
        };
      }

      try {
        const result = await shell.exec(command, { cwd: directory });
        const nextDirectory = result.env.PWD;

        if (nextDirectory && isWithinAssets(nextDirectory)) {
          directory = nextDirectory;
        }

        return {
          directory,
          stdout: result.stdout,
          stderr: result.stderr,
        };
      } catch (error) {
        return {
          directory,
          stdout: "",
          stderr: `${error instanceof Error ? error.message : "Command failed"}\n`,
        };
      }
    },
  };
}

export async function createPortfolioShell(
  options: PortfolioShellOptions = {},
): Promise<PortfolioShell> {
  return createPortfolioShellWithFiles(await createAssetFiles(), options);
}

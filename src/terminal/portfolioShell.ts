import {
  Bash,
  defineCommand,
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
): PortfolioShell {
  const fileSystem = new ReadOnlyFileSystem(new InMemoryFs(files));
  let directory = DEFAULT_TERMINAL_DIRECTORY;

  const shell = new Bash({
    fs: fileSystem,
    cwd: directory,
    env: {
      HOME: ASSET_ROOT,
      LOGNAME: "guest",
      SHELL: "/bin/bash",
      USER: "guest",
    },
    customCommands: [...restrictedCommands.map(readonlyCommand)],
  });

  return {
    async execute(command: string): Promise<TerminalCommandResult> {
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

export async function createPortfolioShell(): Promise<PortfolioShell> {
  return createPortfolioShellWithFiles(await createAssetFiles());
}

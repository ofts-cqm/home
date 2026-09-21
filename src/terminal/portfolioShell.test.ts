import { describe, expect, it } from "vitest";
import {
  createPortfolioShellWithFiles,
  DEFAULT_TERMINAL_DIRECTORY,
} from "./portfolioShell";

function createPortfolioShell() {
  return createPortfolioShellWithFiles({
    "/assets/content/README.md": "---\nroute: /\n---\n# Welcome\n",
    "/assets/pictures/me.jpg": new Uint8Array([0xff, 0xd8, 0xff]),
    "/assets/svgs/logo.svg": "<svg></svg>",
  });
}

describe("portfolio shell", () => {
  it("starts in the content directory and exposes the complete asset tree", async () => {
    const shell = createPortfolioShell();

    const pwd = await shell.execute("pwd");
    const files = await shell.execute("find /assets -type f");

    expect(pwd.stdout).toBe(`${DEFAULT_TERMINAL_DIRECTORY}\n`);
    expect(files.stdout).toContain("/assets/content/README.md");
    expect(files.stdout).toContain("/assets/pictures/me.jpg");
    expect(files.stdout).toContain("/assets/svgs/logo.svg");
  });

  it("supports common read-only search commands", async () => {
    const shell = createPortfolioShell();

    const result = await shell.execute("grep -n route: README.md");

    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("route:");
  });

  it("opens an existing Markdown file", async () => {
    const openedFiles: string[] = [];
    const shell = createPortfolioShellWithFiles(
      {
        "/assets/content/README.md": "# Welcome\n",
      },
      {
        onOpenMarkdown(path) {
          openedFiles.push(path);
        },
      },
    );

    const result = await shell.execute("open README.md");

    expect(result.stderr).toBe("");
    expect(openedFiles).toEqual(["/assets/content/README.md"]);
  });

  it("rejects non-Markdown, missing, and ambiguous open targets", async () => {
    const shell = createPortfolioShell();

    const nonMarkdown = await shell.execute("open ../pictures/me.jpg");
    const missing = await shell.execute("open Missing.md");
    const tooMany = await shell.execute("open README.md Other.md");

    expect(nonMarkdown.stderr).toContain("not a Markdown file");
    expect(missing.stderr).toContain("no such file");
    expect(tooMany.stderr).toBe("Usage: open <file.md>\n");
  });

  it("shows the commands that are available in the portfolio shell", async () => {
    const shell = createPortfolioShell();

    const result = await shell.execute("help");

    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("cat");
    expect(result.stdout).toContain("open");
    expect(result.stdout).toContain("Use open <file.md>");
    expect(result.stdout).not.toContain("logout");
  });

  it("keeps navigation inside /assets", async () => {
    const shell = createPortfolioShell();

    await shell.execute("cd ..");
    const result = await shell.execute("cd ..");

    expect(result.directory).toBe("/assets");
    expect(result.stderr).toBe("");
  });

  it("rejects direct and redirected writes", async () => {
    const shell = createPortfolioShell();

    const touch = await shell.execute("touch scratch.md");
    const redirect = await shell.execute("echo test > scratch.md");

    expect(touch.stderr).toContain("portfolio filesystem is read-only");
    expect(redirect.stderr).toContain("Permission denied");
  });
});

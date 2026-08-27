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

import { describe, expect, it } from "vitest";
import { parseFrontMatter } from "./frontMatter";

describe("parseFrontMatter", () => {
  it("parses the document routing fields", () => {
    expect(
      parseFrontMatter(
        "---\nroute: /story\nlabel: Story.md\norder: 2\n---\n# Story",
        "Story.md",
      ),
    ).toEqual({
      metadata: { route: "/story", label: "Story.md", order: 2 },
      body: "# Story",
    });
  });

  it("rejects missing and unknown metadata", () => {
    expect(() =>
      parseFrontMatter(
        "---\nroute: story\nlabel: Story.md\norder: 2\n---\n",
        "Story.md",
      ),
    ).toThrow('"route" must be an absolute');

    expect(() =>
      parseFrontMatter(
        "---\nroute: /story\nlabel: Story.md\norder: 2\nhidden: true\n---\n",
        "Story.md",
      ),
    ).toThrow('Unknown front matter key "hidden"');
  });
});

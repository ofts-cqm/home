import { describe, expect, it } from "vitest";
import { getContentDocumentByAssetPath } from "./registry";

describe("content registry", () => {
  it("maps terminal asset paths to published Markdown routes", () => {
    expect(
      getContentDocumentByAssetPath("/assets/content/README.md")?.route,
    ).toBe("/home");
    expect(
      getContentDocumentByAssetPath("/assets/content/ThoughtsOnAI.md")?.route,
    ).toBe("/about-ai");
  });
});

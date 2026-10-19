import { describe, expect, it } from "vitest";
import { contentDocuments, getContentDocumentByAssetPath } from "./registry";

describe("content registry", () => {
  it("maps terminal asset paths to published Markdown routes", () => {
    expect(contentDocuments.length).toBeGreaterThan(0);

    for (const document of contentDocuments) {
      const assetPath = document.sourcePath.replace(
        /^\.\.\/assets\//,
        "/assets/",
      );
      expect(getContentDocumentByAssetPath(assetPath)).toBe(document);
    }

    expect(getContentDocumentByAssetPath("/assets/content/")).toBeUndefined();
  });
});

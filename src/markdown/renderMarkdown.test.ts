import { describe, expect, it } from "vitest";
import { contentDocuments } from "@/content/registry";
import type { ContentDocument } from "@/content/types";
import { renderMarkdown } from "./renderMarkdown";

let documentNumber = 0;

function documentWith(body: string): ContentDocument {
  documentNumber += 1;
  return {
    id: `test-${documentNumber}`,
    route: `/test-${documentNumber}`,
    label: `Test${documentNumber}.md`,
    order: documentNumber,
    sourcePath: "../assets/content/Test.md",
    source: body,
    body,
  };
}

describe("renderMarkdown", () => {
  it("renders every site document without errors", () => {
    expect(contentDocuments.map((document) => document.route)).toEqual([
      "/home",
      "/projects",
      "/about-me",
      "/contact",
    ]);

    for (const document of contentDocuments) {
      expect(renderMarkdown(document)).toContain("<h1>");
    }
  });

  it("renders basic Markdown while escaping raw HTML", () => {
    const html = renderMarkdown(
      documentWith("# Heading\n\n**Strong**\n\n<script>alert(1)</script>"),
    );

    expect(html).toContain("<h1>Heading</h1>");
    expect(html).toContain("<strong>Strong</strong>");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).not.toContain("<script>");
  });

  it("renders columns, grid cards, accordions, and resolved assets", () => {
    const html = renderMarkdown(
      documentWith(`:::: columns flex="2 3"
::: column
Left
:::
::: column
Right
:::
::::

:::: grid columns=2
::: flip-card title="Card" image="../me.jpg" alt="Portrait" languages="Java, Vue"
Back
:::
::::

::: accordion title="Details" open=true
Body
:::`),
    );

    expect(html).toContain('data-flex-left="2" data-flex-right="3"');
    expect(html).toContain('class="md-grid" data-columns="2"');
    expect(html).toContain('class="md-flip-card"');
    expect(html).toContain('class="md-language-chip"');
    expect(html).toMatch(/src="[^\"]+me[^\"]*\.jpg"/);
    expect(html).toContain('<details class="md-accordion" open>');
  });

  it("requires a grid column count and validates layout nesting", () => {
    expect(() => renderMarkdown(documentWith("::: grid\n:::"))).toThrow(
      "grid requires columns=...",
    );

    expect(() =>
      renderMarkdown(
        documentWith(":::: columns\n::: column\nOnly one\n:::\n::::"),
      ),
    ).toThrow("columns must contain exactly two columns");
  });
});

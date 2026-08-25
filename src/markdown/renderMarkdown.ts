import MarkdownIt from "markdown-it";
import { resolveContentAsset } from "@/content/assets";
import type { ContentDocument, RenderEnvironment } from "@/content/types";
import { contentDirectives } from "./directives";

const markdown = new MarkdownIt("commonmark", {
  breaks: false,
  html: false,
  linkify: false,
  typographer: false,
});

contentDirectives(markdown);

const defaultImageRenderer = markdown.renderer.rules.image;

markdown.renderer.rules.image = (
  tokens,
  index,
  options,
  environment,
  renderer,
) => {
  const token = tokens[index]!;
  const source = token.attrGet("src");
  const renderEnvironment = environment as unknown as RenderEnvironment;

  if (source) {
    token.attrSet(
      "src",
      resolveContentAsset(
        renderEnvironment.document.sourcePath,
        String(source),
      ),
    );
  }
  token.attrSet("loading", "lazy");
  token.attrSet("decoding", "async");

  return defaultImageRenderer
    ? defaultImageRenderer(tokens, index, options, environment, renderer)
    : renderer.renderToken(tokens, index, options);
};

const defaultLinkRenderer = markdown.renderer.rules.link_open;

markdown.renderer.rules.link_open = (
  tokens,
  index,
  options,
  environment,
  renderer,
) => {
  const token = tokens[index]!;
  const href = token.attrGet("href");

  if (href && /^https?:\/\//i.test(String(href))) {
    token.attrSet("target", "_blank");
    token.attrSet("rel", "noopener noreferrer");
  }

  return defaultLinkRenderer
    ? defaultLinkRenderer(tokens, index, options, environment, renderer)
    : renderer.renderToken(tokens, index, options);
};

const renderedDocuments = new Map<string, string>();

export function renderMarkdown(document: ContentDocument): string {
  const cached = renderedDocuments.get(document.id);
  if (cached !== undefined) return cached;

  const rendered = markdown.render(document.body, {
    document,
  } satisfies RenderEnvironment);
  renderedDocuments.set(document.id, rendered);
  return rendered;
}

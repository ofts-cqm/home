import { parseFrontMatter } from "./frontMatter";
import type { ContentDocument } from "./types";

const markdownSources = import.meta.glob("../assets/content/**/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

function createId(label: string): string {
  return label
    .replace(/\.md$/i, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function buildRegistry(): ContentDocument[] {
  const documents = Object.entries(markdownSources).map(
    ([sourcePath, source]) => {
      const { metadata, body } = parseFrontMatter(source, sourcePath);

      return {
        ...metadata,
        id: createId(metadata.label),
        sourcePath,
        source,
        body,
      };
    },
  );

  const routes = new Set<string>();
  const labels = new Set<string>();
  const ids = new Set<string>();

  for (const document of documents) {
    if (routes.has(document.route)) {
      throw new Error(`Duplicate Markdown route: ${document.route}`);
    }
    if (labels.has(document.label)) {
      throw new Error(`Duplicate Markdown label: ${document.label}`);
    }
    if (ids.has(document.id)) {
      throw new Error(`Duplicate Markdown document id: ${document.id}`);
    }

    routes.add(document.route);
    labels.add(document.label);
    ids.add(document.id);
  }

  return documents.sort((left, right) => left.order - right.order);
}

export const contentDocuments = buildRegistry();

export function getContentDocument(id: string): ContentDocument | undefined {
  return contentDocuments.find((document) => document.id === id);
}

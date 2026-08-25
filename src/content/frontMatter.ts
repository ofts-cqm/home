import type { ContentMetadata } from "./types";

interface ParsedFrontMatter {
  metadata: ContentMetadata;
  body: string;
}

function unquote(value: string): string {
  const first = value[0];
  const last = value[value.length - 1];

  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    return value.slice(1, -1);
  }

  return value;
}

export function parseFrontMatter(
  source: string,
  sourcePath: string,
): ParsedFrontMatter {
  const normalized = source.replace(/\r\n?/g, "\n");

  if (!normalized.startsWith("---\n")) {
    throw new Error(
      `${sourcePath}: Markdown documents must start with front matter`,
    );
  }

  const closingIndex = normalized.indexOf("\n---\n", 4);
  if (closingIndex === -1) {
    throw new Error(
      `${sourcePath}: Front matter is missing its closing --- line`,
    );
  }

  const values = new Map<string, string>();
  const header = normalized.slice(4, closingIndex);

  for (const [index, line] of header.split("\n").entries()) {
    if (!line.trim()) continue;

    const match = /^([a-z][a-z0-9-]*):\s*(.+)$/i.exec(line);
    if (!match) {
      throw new Error(`${sourcePath}:${index + 2}: Invalid front matter entry`);
    }

    const key = match[1]!;
    const rawValue = match[2]!;
    if (values.has(key)) {
      throw new Error(
        `${sourcePath}:${index + 2}: Duplicate front matter key "${key}"`,
      );
    }

    values.set(key, unquote(rawValue.trim()));
  }

  const route = values.get("route");
  const label = values.get("label");
  const rawOrder = values.get("order");
  const unexpectedKeys = [...values.keys()].filter(
    (key) => !["route", "label", "order"].includes(key),
  );

  if (unexpectedKeys.length > 0) {
    throw new Error(
      `${sourcePath}: Unknown front matter key "${unexpectedKeys[0]}"`,
    );
  }
  if (!route?.startsWith("/") || route === "/") {
    throw new Error(
      `${sourcePath}: "route" must be an absolute, non-root URL path`,
    );
  }
  if (!/^\/[a-z0-9]+(?:[/-][a-z0-9]+)*$/i.test(route)) {
    throw new Error(`${sourcePath}: "route" contains unsupported characters`);
  }
  if (!label?.endsWith(".md")) {
    throw new Error(`${sourcePath}: "label" must be a Markdown filename`);
  }

  const order = Number(rawOrder);
  if (!Number.isInteger(order) || order < 0) {
    throw new Error(`${sourcePath}: "order" must be a non-negative integer`);
  }

  return {
    metadata: { route, label, order },
    body: normalized.slice(closingIndex + 5),
  };
}

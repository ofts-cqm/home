import type { MarkdownIt, StateBlock, StateCore, Token } from "markdown-it";
import { resolveContentAsset } from "@/content/assets";
import type { RenderEnvironment } from "@/content/types";
import { getLanguageColor } from "./languageColors";

const directiveNames = new Set([
  "accordion",
  "column",
  "columns",
  "flip-card",
  "grid",
  "item",
]);

interface DirectiveMeta {
  name: string;
  params: Record<string, string>;
  line: number;
}

interface DirectiveFrame {
  meta: DirectiveMeta;
  childDirectives: string[];
  hasDirectMarkdown: boolean;
}

function sourceName(environment: unknown): string {
  return (
    (environment as Partial<RenderEnvironment>)?.document?.sourcePath ??
    "Markdown"
  );
}

function syntaxError(
  environment: unknown,
  line: number,
  message: string,
): Error {
  return new Error(`${sourceName(environment)}:${line + 1}: ${message}`);
}

function parseArguments(
  input: string,
  environment: unknown,
  line: number,
): Record<string, string> {
  const values: Record<string, string> = {};
  let position = 0;

  while (position < input.length) {
    while (/\s/.test(input[position] ?? "")) position += 1;
    if (position >= input.length) break;

    const keyMatch = /^[a-z][a-z0-9-]*/i.exec(input.slice(position));
    if (!keyMatch)
      throw syntaxError(environment, line, "Expected a parameter name");

    const key = keyMatch[0];
    position += key.length;
    while (/\s/.test(input[position] ?? "")) position += 1;

    if (input[position] !== "=") {
      throw syntaxError(environment, line, `Expected = after "${key}"`);
    }
    position += 1;
    while (/\s/.test(input[position] ?? "")) position += 1;

    let value = "";
    const quote = input[position];
    if (quote === '"' || quote === "'") {
      position += 1;
      let closed = false;

      while (position < input.length) {
        const character = input[position];
        if (character === "\\" && position + 1 < input.length) {
          value += input[position + 1];
          position += 2;
        } else if (character === quote) {
          position += 1;
          closed = true;
          break;
        } else {
          value += character;
          position += 1;
        }
      }

      if (!closed)
        throw syntaxError(environment, line, `Unclosed value for "${key}"`);
    } else {
      const valueMatch = /^\S+/.exec(input.slice(position));
      if (!valueMatch)
        throw syntaxError(environment, line, `Missing value for "${key}"`);
      value = valueMatch[0];
      position += value.length;
    }

    if (key in values) {
      throw syntaxError(environment, line, `Duplicate parameter "${key}"`);
    }
    values[key] = value;
  }

  return values;
}

function assertParameters(
  meta: DirectiveMeta,
  environment: unknown,
  allowed: string[],
  required: string[] = [],
): void {
  const unknown = Object.keys(meta.params).find(
    (key) => !allowed.includes(key),
  );
  if (unknown) {
    throw syntaxError(
      environment,
      meta.line,
      `Unknown ${meta.name} parameter "${unknown}"`,
    );
  }

  const missing = required.find((key) => !meta.params[key]?.trim());
  if (missing) {
    throw syntaxError(
      environment,
      meta.line,
      `${meta.name} requires ${missing}=...`,
    );
  }
}

function validateParameters(meta: DirectiveMeta, environment: unknown): void {
  if (meta.name === "columns") {
    assertParameters(meta, environment, ["flex"]);
    const flexValues = (meta.params.flex ?? "1 1")
      .trim()
      .split(/\s+/)
      .map(Number);
    if (
      flexValues.length !== 2 ||
      flexValues.some((value) => !Number.isFinite(value) || value <= 0)
    ) {
      throw syntaxError(
        environment,
        meta.line,
        "columns flex must contain two positive numbers",
      );
    }
    meta.params.flex = flexValues.join(" ");
    return;
  }

  if (meta.name === "grid") {
    assertParameters(meta, environment, ["columns"], ["columns"]);
    const columns = Number(meta.params.columns);
    if (!Number.isInteger(columns) || columns < 1) {
      throw syntaxError(
        environment,
        meta.line,
        "grid columns must be a positive integer",
      );
    }
    return;
  }

  if (meta.name === "accordion") {
    assertParameters(meta, environment, ["open", "title"], ["title"]);
    if (meta.params.open && !["true", "false"].includes(meta.params.open)) {
      throw syntaxError(
        environment,
        meta.line,
        "accordion open must be true or false",
      );
    }
    return;
  }

  if (meta.name === "flip-card") {
    assertParameters(
      meta,
      environment,
      ["alt", "image", "languages", "title"],
      ["alt", "image", "title"],
    );
    return;
  }

  assertParameters(meta, environment, []);
}

function getLine(state: StateBlock, line: number): string {
  const start = state.bMarks[line]! + state.tShift[line]!;
  return state.src.slice(start, state.eMarks[line]!);
}

function directiveBlockRule(
  state: StateBlock,
  startLine: number,
  endLine: number,
  silent: boolean,
): boolean {
  const openingMatch = /^(:{3,})\s+([a-z][a-z0-9-]*)(?:\s+(.*?))?\s*$/i.exec(
    getLine(state, startLine),
  );
  if (!openingMatch) return false;

  const fence = openingMatch[1]!;
  const name = openingMatch[2]!;
  const rawArguments = openingMatch[3] ?? "";
  if (!directiveNames.has(name)) {
    throw syntaxError(state.env, startLine, `Unknown directive "${name}"`);
  }
  if (silent) return true;

  let closingLine = startLine + 1;
  const closingFence = new RegExp(`^:{${fence.length}}\\s*$`);
  while (
    closingLine < endLine &&
    !closingFence.test(getLine(state, closingLine))
  ) {
    closingLine += 1;
  }

  if (closingLine >= endLine) {
    throw syntaxError(state.env, startLine, `Unclosed ${name} directive`);
  }

  const meta: DirectiveMeta = {
    name,
    params: parseArguments(rawArguments, state.env, startLine),
    line: startLine,
  };
  validateParameters(meta, state.env);

  const openingToken = state.push("content_directive_open", "", 1);
  openingToken.block = true;
  openingToken.map = [startLine, closingLine];
  openingToken.meta = meta as unknown as Record<string, unknown>;

  state.md.block.tokenize(state, startLine + 1, closingLine);

  const closingToken = state.push("content_directive_close", "", -1);
  closingToken.block = true;
  closingToken.meta = meta as unknown as Record<string, unknown>;
  state.line = closingLine + 1;
  return true;
}

function directiveMeta(token: Token): DirectiveMeta {
  return token.meta as unknown as DirectiveMeta;
}

function validateDirectiveTree(state: StateCore): void {
  const stack: DirectiveFrame[] = [];

  for (const token of state.tokens) {
    if (token.type === "content_directive_open") {
      const meta = directiveMeta(token);
      const parent = stack[stack.length - 1];
      parent?.childDirectives.push(meta.name);

      if (meta.name === "column" && parent?.meta.name !== "columns") {
        throw syntaxError(
          state.env,
          meta.line,
          "column must be directly inside columns",
        );
      }
      if (meta.name === "item" && parent?.meta.name !== "grid") {
        throw syntaxError(
          state.env,
          meta.line,
          "item must be directly inside grid",
        );
      }
      if (parent?.meta.name === "columns" && meta.name !== "column") {
        throw syntaxError(
          state.env,
          meta.line,
          "columns may only contain column directives",
        );
      }
      if (
        parent?.meta.name === "grid" &&
        !["item", "flip-card"].includes(meta.name)
      ) {
        throw syntaxError(
          state.env,
          meta.line,
          "grid may only contain item or flip-card directives",
        );
      }

      stack.push({ meta, childDirectives: [], hasDirectMarkdown: false });
      continue;
    }

    if (token.type === "content_directive_close") {
      const frame = stack.pop();
      if (!frame) continue;

      if (frame.meta.name === "columns") {
        if (frame.hasDirectMarkdown || frame.childDirectives.length !== 2) {
          throw syntaxError(
            state.env,
            frame.meta.line,
            "columns must contain exactly two columns",
          );
        }
      }
      if (frame.meta.name === "grid") {
        if (frame.hasDirectMarkdown || frame.childDirectives.length === 0) {
          throw syntaxError(
            state.env,
            frame.meta.line,
            "grid must contain at least one item",
          );
        }
      }
      continue;
    }

    const parent = stack[stack.length - 1];
    if (parent && ["columns", "grid"].includes(parent.meta.name)) {
      parent.hasDirectMarkdown = true;
    }
  }
}

function renderOpeningDirective(
  md: MarkdownIt,
  token: Token,
  environment: RenderEnvironment,
): string {
  const { name, params } = directiveMeta(token);
  const escape = md.utils.escapeHtml;

  if (name === "columns") {
    const [left, right] = params.flex!.split(" ");
    return `<section class="md-columns" data-flex-left="${left}" data-flex-right="${right}" style="--md-left-flex: ${left}; --md-right-flex: ${right}">\n`;
  }
  if (name === "column") return '<div class="md-column">\n';
  if (name === "grid") {
    return `<section class="md-grid" data-columns="${params.columns}" style="--md-grid-columns: ${params.columns}">\n`;
  }
  if (name === "item") return '<div class="md-grid-item">\n';
  if (name === "accordion") {
    const open = params.open === "true" ? " open" : "";
    return `<details class="md-accordion"${open}><summary>${escape(params.title!)}</summary><div class="md-accordion-panel">\n`;
  }

  const image = escape(
    resolveContentAsset(environment.document.sourcePath, params.image!),
  );
  const title = escape(params.title!);
  const alt = escape(params.alt!);
  const languages = (params.languages ?? "")
    .split(",")
    .map((language) => language.trim())
    .filter(Boolean)
    .map((language) => {
      const color = escape(getLanguageColor(language));
      return `<span class="md-language-chip" style="--language-color: ${color}">${escape(language)}</span>`;
    })
    .join("");

  return `<article class="md-flip-card" tabindex="0" role="button" aria-pressed="false" aria-label="Flip ${title} card"><div class="md-flip-card-inner"><div class="md-flip-card-front"><h3>${title}</h3><img src="${image}" alt="${alt}" loading="lazy" decoding="async"><div class="md-language-list">${languages}</div></div><div class="md-flip-card-back">\n`;
}

function renderClosingDirective(token: Token): string {
  const { name } = directiveMeta(token);
  if (name === "columns" || name === "grid") return "</section>\n";
  if (name === "column" || name === "item") return "</div>\n";
  if (name === "accordion") return "</div></details>\n";
  return "</div></div></article>\n";
}

export function contentDirectives(md: MarkdownIt): void {
  md.block.ruler.before("fence", "content_directive", directiveBlockRule, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  });
  md.core.ruler.after(
    "block",
    "validate_content_directives",
    validateDirectiveTree,
  );

  md.renderer.rules.content_directive_open = (
    tokens,
    index,
    _options,
    environment,
  ) =>
    renderOpeningDirective(
      md,
      tokens[index]!,
      environment as unknown as RenderEnvironment,
    );
  md.renderer.rules.content_directive_close = (tokens, index) =>
    renderClosingDirective(tokens[index]!);
}

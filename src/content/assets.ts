const assetUrls = import.meta.glob(
  "../assets/**/*.{avif,gif,jpeg,jpg,png,svg,webp}",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
) as Record<string, string>;

function normalizePath(path: string): string {
  const segments: string[] = [];

  for (const segment of path.split("/")) {
    if (!segment || segment === ".") continue;
    if (segment === "..") {
      segments.pop();
    } else {
      segments.push(segment);
    }
  }

  return segments.join("/");
}

function splitSuffix(path: string): [string, string] {
  const suffixIndex = path.search(/[?#]/);
  return suffixIndex === -1
    ? [path, ""]
    : [path.slice(0, suffixIndex), path.slice(suffixIndex)];
}

export function resolveContentAsset(sourcePath: string, path: string): string {
  if (/^(?:[a-z]+:|\/|#)/i.test(path)) return path;

  const [assetPath, suffix] = splitSuffix(path);
  const sourceDirectory = sourcePath.slice(0, sourcePath.lastIndexOf("/"));
  const resolvedPath = normalizePath(`${sourceDirectory}/${assetPath}`);
  const matchingEntry = Object.entries(assetUrls).find(
    ([candidate]) => normalizePath(candidate) === resolvedPath,
  );

  if (!matchingEntry) {
    throw new Error(`${sourcePath}: Cannot resolve asset "${path}"`);
  }

  return `${matchingEntry[1]}${suffix}`;
}

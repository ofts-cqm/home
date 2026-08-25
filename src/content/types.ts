export interface ContentMetadata {
  route: string;
  label: string;
  order: number;
}

export interface ContentDocument extends ContentMetadata {
  id: string;
  sourcePath: string;
  source: string;
  body: string;
}

export interface RenderEnvironment {
  document: ContentDocument;
}

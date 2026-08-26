export const MIN_LAYOUT_COLUMN_WIDTH = 300;
export const MIN_LAYOUT_TOTAL_WIDTH = 600;

export function shouldStackColumns(
  width: number,
): boolean {
 return width < MIN_LAYOUT_TOTAL_WIDTH;
}

export function getGridColumnCount(
  width: number,
  gap: number,
  preferredColumns: number,
): number {
  const fittingColumns = Math.max(
    1,
    Math.floor((width + gap) / (MIN_LAYOUT_COLUMN_WIDTH + gap)),
  );
  return Math.min(preferredColumns, fittingColumns);
}

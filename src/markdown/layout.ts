export const MIN_LAYOUT_COLUMN_WIDTH = 300;

export function shouldStackColumns(
  width: number,
  gap: number,
  leftFlex: number,
  rightFlex: number,
): boolean {
  const usableWidth = Math.max(0, width - gap);
  const totalFlex = leftFlex + rightFlex;
  const leftWidth = (usableWidth * leftFlex) / totalFlex;
  const rightWidth = (usableWidth * rightFlex) / totalFlex;
  return Math.min(leftWidth, rightWidth) < MIN_LAYOUT_COLUMN_WIDTH;
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

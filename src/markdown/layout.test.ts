import { describe, expect, it } from "vitest";
import { getGridColumnCount, shouldStackColumns } from "./layout";

describe("responsive Markdown layouts", () => {
  it("stacks when either flex column would be narrower than 300px", () => {
    expect(shouldStackColumns(620)).toBe(false);
    expect(shouldStackColumns(770)).toBe(false);
    expect(shouldStackColumns(569)).toBe(true);
  });

  it("reduces equal grid tracks without going below one", () => {
    expect(getGridColumnCount(940, 20, 3)).toBe(3);
    expect(getGridColumnCount(939, 20, 3)).toBe(2);
    expect(getGridColumnCount(300, 20, 3)).toBe(1);
    expect(getGridColumnCount(200, 20, 3)).toBe(1);
    expect(getGridColumnCount(3000, 20, 2)).toBe(2);
  });
});

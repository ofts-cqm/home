import { describe, expect, it } from "vitest";
import { getGridColumnCount, shouldStackColumns } from "./layout";

describe("responsive Markdown layouts", () => {
  it("stacks when either flex column would be narrower than 300px", () => {
    expect(shouldStackColumns(620, 20, 1, 1)).toBe(false);
    expect(shouldStackColumns(619, 20, 1, 1)).toBe(true);
    expect(shouldStackColumns(770, 20, 2, 3)).toBe(false);
    expect(shouldStackColumns(769, 20, 2, 3)).toBe(true);
  });

  it("reduces equal grid tracks without going below one", () => {
    expect(getGridColumnCount(940, 20, 3)).toBe(3);
    expect(getGridColumnCount(939, 20, 3)).toBe(2);
    expect(getGridColumnCount(300, 20, 3)).toBe(1);
    expect(getGridColumnCount(200, 20, 3)).toBe(1);
    expect(getGridColumnCount(3000, 20, 2)).toBe(2);
  });
});

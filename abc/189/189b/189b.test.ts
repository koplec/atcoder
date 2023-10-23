import { describe, test, expect } from "@jest/globals";
import { solve } from "./189b";

describe("solve", () => {
  test("sample1", () => {
    expect(solve(15, [200, 350], [5, 3])).toBe(1);
  });
  test("sample2", () => {
    expect(solve(10, [200, 350], [5, 3])).toBe(1);
  });

  test("sample3", () => {
    expect(solve(1000000, [1000, 1000, 1000], [100, 100, 100])).toBe(-1);
  });
});

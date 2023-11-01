import { solve } from "./182c";
import { describe, test, expect } from "@jest/globals";

describe("solve", () => {
  test("sample1", () => {
    expect(solve(35)).toBe(1);
  });
  test("sample2", () => {
    expect(solve(369)).toBe(0);
  });
  test("sample3", () => {
    expect(solve(6227384)).toBe(1);
  });
  test("sample4", () => {
    expect(solve(11)).toBe(-1);
  });

  test("handmade_00", () => {
    //jsだと1000000000000000000となってしまう。 10^19
    expect(solve(999999999999999999)).toBe(0); //18桁
  });
});

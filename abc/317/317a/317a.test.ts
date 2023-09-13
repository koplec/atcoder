import { describe, expect, test } from "@jest/globals";
import { calcEffectivePointIndex } from "./317a.ts";

describe("calcEffectivePointIndex", () => {
  test("sample01", () => {
    expect(calcEffectivePointIndex(3, 100, 200, [50, 200, 999])).toBe(1);
  });
  test("sample02", () => {
    expect(calcEffectivePointIndex(2, 10, 21, [10, 999])).toBe(1);
  });
  test("sample03", () => {
    expect(
      calcEffectivePointIndex(
        10,
        500,
        999,
        [38, 420, 490, 585, 613, 614, 760, 926, 945, 999]
      )
    ).toBe(3);
  });
});

// ~/sandbox/atcoder$ ./node_modules/.bin/jest abc/317/317a/317a.test.ts でjestが動く

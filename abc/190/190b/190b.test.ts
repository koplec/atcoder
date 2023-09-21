import { describe, expect, test } from "@jest/globals";
import { takahashiCanMakeDamage } from "./190b";

describe("191b takahashi-kun can make damage to a monster", () => {
  test("sample01", () => {
    expect(takahashiCanMakeDamage(9, 9, [5, 15, 5, 15], [5, 5, 15, 15])).toBe(
      true
    );
  });
  test("sample02", () => {
    expect(
      takahashiCanMakeDamage(691, 273, [691, 593, 691], [997, 273, 273])
    ).toBe(false);
  });
  test("sample03", () => {
    expect(
      takahashiCanMakeDamage(
        100,
        100,
        [10, 12, 192, 154, 142, 20, 17],
        [11, 67, 79, 197, 158, 25, 108]
      )
    ).toBe(true);
  });
});

import { test, describe, expect } from "@jest/globals";

import { canSeeMasu } from "./197b";

describe("array equality check", () => {
  test("number[][]", () => {
    const aryA = [
      [1, 2],
      [3, 4],
    ];

    const aryB = [
      [1, 2],
      [3, 4],
    ];

    expect(aryA).toStrictEqual(aryB);
  });
});

describe("197b test", () => {
  test("init attempt", () => {
    expect(canSeeMasu(0, 0, [[0]])).toStrictEqual([[0, 0]]);

    expect(
      canSeeMasu(0, 0, [
        [0, 0],
        [1, 1],
      ])
    ).toStrictEqual([
      [0, 0],
      [0, 1],
    ]);

    expect(
      canSeeMasu(0, 0, [
        [0, 1],
        [0, 1],
      ])
    ).toStrictEqual([
      [0, 0],
      [1, 0],
    ]);

    expect(
      canSeeMasu(0, 0, [
        [0, 0],
        [0, 1],
      ])
    ).toStrictEqual([
      [0, 0],
      [0, 1],
      [1, 0],
    ]);

    expect(
      canSeeMasu(0, 0, [
        [0, 0],
        [0, 1],
      ]).sort()
    ).toStrictEqual(
      [
        [0, 0],
        [1, 0],
        [0, 1],
      ].sort()
    );

    expect(
      canSeeMasu(0, 0, [
        [0, 0],
        [0, 0],
      ]).sort()
    ).toStrictEqual(
      [
        [0, 0],
        [1, 0],
        [0, 1],
      ].sort()
    );
  });
});

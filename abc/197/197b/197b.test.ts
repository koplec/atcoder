import { test, describe, expect } from "@jest/globals";

import { Masu, canSeeMasu, compareMasuPoint, genMasuMap } from "./197b";

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

describe("object array sort is stable?", () => {
  let a = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ];

  let b = [
    { x: 1, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
  ];

  console.debug(a.sort(compareMasuPoint));
  console.debug(b.sort(compareMasuPoint));

  expect(a.sort(compareMasuPoint)).toStrictEqual(b.sort(compareMasuPoint));
});

describe("197b 2block", () => {
  test("init attempt", () => {
    expect(canSeeMasu(0, 0, [[0]]).sort(compareMasuPoint)).toStrictEqual(
      [{ x: 0, y: 0 }].sort(compareMasuPoint)
    );
  });
  test("right", () => {
    expect(
      canSeeMasu(0, 0, [
        [0, 0],
        [1, 1],
      ]).sort(compareMasuPoint)
    ).toStrictEqual(
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
      ].sort(compareMasuPoint)
    );
  });

  test("down", () => {
    expect(
      canSeeMasu(0, 0, [
        [0, 1],
        [0, 1],
      ]).sort(compareMasuPoint)
    ).toStrictEqual(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ].sort(compareMasuPoint)
    );
  });

  test("down and right", () => {
    let expected = canSeeMasu(0, 0, [
      [0, 0],
      [0, 1],
    ]).sort(compareMasuPoint);

    expect(expected).toEqual(
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
      ].sort(compareMasuPoint)
    );
  });

  test("down and right 2", () => {
    expect(
      canSeeMasu(0, 0, [
        [0, 0],
        [0, 1],
      ]).sort(compareMasuPoint)
    ).toStrictEqual(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ].sort(compareMasuPoint)
    );
  });

  test("down and right 3", () => {
    expect(
      canSeeMasu(0, 0, [
        [0, 0],
        [0, 0],
      ]).sort(compareMasuPoint)
    ).toStrictEqual(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ].sort(compareMasuPoint)
    );
  });

  test("left", () => {
    let expected = canSeeMasu(0, 1, [
      [0, 0],
      [1, 1],
    ]);
    expect(expected.sort(compareMasuPoint)).toStrictEqual(
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
      ].sort(compareMasuPoint)
    );
  });

  test("up", () => {
    expect(
      canSeeMasu(0, 1, [
        [0, 1],
        [0, 1],
      ]).sort(compareMasuPoint)
    ).toStrictEqual(
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
      ].sort(compareMasuPoint)
    );
  });
});

describe("given sample", () => {
  test("sample01", () => {
    const lines = `##..
...#
#.#.
.#.#`.split("\n");
    const expectedMasuMap = genMasuMap(4, 4, lines);
    expect(expectedMasuMap).toStrictEqual([
      [1, 1, 0, 0],
      [0, 0, 0, 1],
      [1, 0, 1, 0],
      [0, 1, 0, 1],
    ]);

    const expecedCanSeeMasu = canSeeMasu(2 - 1, 2 - 1, expectedMasuMap);
    expect(expecedCanSeeMasu.length).toBe(4);
  });

  test("sample02", () => {
    const lines = `#....
#####
....#`.split("\n");
    const expectedMasuMap = genMasuMap(3, 5, lines);
    expect(expectedMasuMap).toStrictEqual([
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1],
    ]);

    const expectedMasu = new Masu(expectedMasuMap);
    expect(expectedMasu.height()).toBe(3);
    expect(expectedMasu.width()).toBe(5);
    expect(expectedMasu.value(0, 0)).toBe(1);
    expect(expectedMasu.value(0, 1)).toBe(0);
    expect(expectedMasu.value(0, 2)).toBe(0);
    expect(expectedMasu.value(0, 3)).toBe(0);
    expect(expectedMasu.value(0, 4)).toBe(0);
    expect(expectedMasu.value(1, 0)).toBe(1);
    expect(expectedMasu.value(1, 1)).toBe(1);
    expect(expectedMasu.value(1, 2)).toBe(1);
    expect(expectedMasu.value(1, 3)).toBe(1);
    expect(expectedMasu.value(1, 4)).toBe(1);

    //0,3で呼び出したい
    let expectedCanSeeMasu = canSeeMasu(1 - 1, 4 - 1, expectedMasuMap);
    expect(expectedCanSeeMasu.length).toBe(4);
  });

  test("sample03", () => {
    const lines = `.#..#
#.###
##...
#..#.
#.###`.split("\n");
    const expectedMasuMap = genMasuMap(5, 5, lines);
    expect(expectedMasuMap).toStrictEqual([
      [0, 1, 0, 0, 1],
      [1, 0, 1, 1, 1],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 1, 0],
      [1, 0, 1, 1, 1],
    ]);

    let expectedCanSeeMasu = canSeeMasu(4 - 1, 2 - 1, expectedMasuMap);
    expect(expectedCanSeeMasu.length).toBe(3);
  });
});

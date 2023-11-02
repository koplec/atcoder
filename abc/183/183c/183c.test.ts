import { describe, expect, test } from "@jest/globals";
import { genPerm, genPermArys } from "./183c";

describe("genPermArys", () => {
  test("tdd", () => {
    expect(genPermArys(0)).toEqual([]);
    let perms = genPermArys(1);
    console.log("perms(1):", perms);
    expect(perms).toEqual([[0]]);

    perms = genPermArys(2);
    console.log("perms(2):", perms);
    expect(perms).toEqual([
      [0, 1],
      [1, 0],
    ]);

    perms = genPermArys(3);
    console.log("perms(3):", perms);
    expect(perms.length).toBe(6);
    [
      [0, 1, 2],
      [0, 2, 1],
      [1, 0, 2],
      [1, 2, 0],
      [2, 0, 1],
      [2, 1, 0],
    ].forEach((ary) => {
      expect(perms).toContainEqual(ary);
    });
  });
});

describe("genPerm", () => {
  test("tdd", () => {
    // N===0
    let iter = genPerm(0);
    let v = iter.next();
    expect(v.done).toBe(true);

    //N===1
    iter = genPerm(1);
    v = iter.next();
    expect(v.done).toBe(false);
    expect(v.value).toEqual([0]);

    v = iter.next();
    expect(v.done).toBe(true);

    //N===2
    iter = genPerm(2);
    v = iter.next();
    expect(v.done).toBe(false);
    expect(v.value).toEqual([0, 1]);

    v = iter.next();
    expect(v.done).toBe(false);
    expect(v.value).toEqual([1, 0]);

    v = iter.next();
    expect(v.done).toBe(true);

    //N===2
    iter = genPerm(3);
    v = iter.next();
    expect(v.done).toBe(false);
    expect(v.value).toEqual([0, 1, 2]);

    v = iter.next();
    expect(v.done).toBe(false);
    expect(v.value).toEqual([0, 2, 1]);

    v = iter.next();
    expect(v.done).toBe(false);
    expect(v.value).toEqual([2, 0, 1]);

    v = iter.next();
    expect(v.done).toBe(false);
    expect(v.value).toEqual([1, 0, 2]);

    v = iter.next();
    expect(v.done).toBe(false);
    expect(v.value).toEqual([1, 2, 0]);

    v = iter.next();
    expect(v.done).toBe(false);
    expect(v.value).toEqual([2, 1, 0]);

    v = iter.next();
    expect(v.done).toBe(true);
  });
});

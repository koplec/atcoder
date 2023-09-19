import { describe, expect, test } from "@jest/globals";
import { prod, zip } from "./188b";

describe("zipの動き確認", () => {
  test("zip<number>", () => {
    const iter = zip<number>([1, 2, 3], [5, 6, 7]);
    let v = iter.next();
    expect(v).toEqual({ done: false, value: [1, 5] });
    expect(v.done).toBe(false);
    expect(v.value).toEqual([1, 5]);

    v = iter.next();
    expect(v).toEqual({ done: false, value: [2, 6] });
    expect(v.done).toBe(false);
    expect(v.value).toEqual([2, 6]);

    v = iter.next();
    expect(v).toEqual({ done: false, value: [3, 7] });
    expect(v.done).toBe(false);
    expect(v.value).toEqual([3, 7]);

    v = iter.next();
    expect(v).toEqual({ done: true });
    expect(v.done).toBe(true);
  });

  test("different length ary arguments makes error", () => {
    const iter = zip<string>(["A", "B", "C"], ["1", "2"]);
    const nextFun = function () {
      iter.next();
    };
    expect(nextFun).toThrowError("Lengths of arrays are not equal");
  });
});

describe("188b 内積の直行", () => {
  test("sample01", () => {
    expect(prod([-3, 6], [4, 2])).toEqual(0);
  });
  test("sample02", () => {
    expect(prod([4, 5], [-1, -3])).not.toEqual(0);
  });
  test("sample03", () => {
    expect(prod([1, 3, 5], [3, -6, 3])).toEqual(0);
  });
});

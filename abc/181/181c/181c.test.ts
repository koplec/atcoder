import { describe, test, expect } from "@jest/globals";
import { genComb } from "./181c";

describe("genComb", () => {
  test("K===1", () => {
    const iter = genComb(3, 1);
    let v = iter.next();
    expect(v.value).toEqual([0]);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual([1]);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual([2]);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.done).toEqual(true);
  });

  test("K===2", () => {
    const iter = genComb(3, 2);
    let v = iter.next();
    expect(v.value).toEqual([0, 1]);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual([0, 2]);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual([1, 2]);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.done).toEqual(true);
  });

  test("K===3", () => {
    const iter = genComb(4, 3);
    let v = iter.next();
    expect(v.value).toEqual([0, 1, 2]);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual([0, 1, 3]);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual([0, 2, 3]);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual([1, 2, 3]);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.done).toEqual(true);
  });
});

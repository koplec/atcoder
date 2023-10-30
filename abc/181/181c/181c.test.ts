import { describe, test, expect } from "@jest/globals";
import { genComb3, genCombBits, combBit2IndexArray, CombBit } from "./181c";

describe("genCombBits", () => {
  test("N:4,K:1", () => {
    const iter = genCombBits(4, 1);
    let v = iter.next();
    expect(v.value).toEqual(0b0001);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual(0b0010);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual(0b0100);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual(0b1000);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.done).toEqual(true);
  });

  test("N:5,K:2", () => {
    const iter = genCombBits(5, 2);
    let v = iter.next();
    expect(v.value).toEqual(0b00011);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual(0b00101);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual(0b00110);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual(0b01001);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual(0b01010);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual(0b01100);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual(0b10001);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual(0b10010);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual(0b10100);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.value).toEqual(0b11000);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.done).toEqual(true);
  });

  test("N:5,K:5", () => {
    const iter = genCombBits(5, 5);
    let v = iter.next();
    expect(v.value).toEqual(0b11111);
    expect(v.done).toEqual(false);

    v = iter.next();
    expect(v.done).toEqual(true);
  });
});

describe("comBit2IndexArray", () => {
  test("tdd", () => {
    let combBit: CombBit = 0b0;
    expect(combBit2IndexArray(combBit)).toEqual([]);
    combBit = 0b1;
    expect(combBit2IndexArray(combBit)).toEqual([0]);

    combBit = 0b10;
    expect(combBit2IndexArray(combBit)).toEqual([1]);

    combBit = 0b101;
    expect(combBit2IndexArray(combBit)).toEqual([0, 2]);
  });
});

describe("genComb3", () => {
  test("K===3", () => {
    const iter = genComb3(4);
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

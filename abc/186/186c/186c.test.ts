import { describe, test, expect } from "@jest/globals";

import {
  countNot7LetterInOctal,
  octalNum,
  countNot7LetterInDecimal,
  countNot7Letter,
} from "./186c";

describe("octalNum test", () => {
  test("basic test", () => {
    expect(octalNum(0)).toBe("0");
    expect(octalNum(1)).toBe("1");
    expect(octalNum(2)).toBe("2");
    expect(octalNum(3)).toBe("3");
    expect(octalNum(4)).toBe("4");
    expect(octalNum(5)).toBe("5");
    expect(octalNum(6)).toBe("6");
    expect(octalNum(7)).toBe("7");
    expect(octalNum(8)).toBe("10");
    expect(octalNum(9)).toBe("11");
    expect(octalNum(10)).toBe("12");
    expect(octalNum(11)).toBe("13");
    expect(octalNum(12)).toBe("14");
    expect(octalNum(13)).toBe("15");
    expect(octalNum(14)).toBe("16");
    expect(octalNum(15)).toBe("17");
    expect(octalNum(16)).toBe("20");
    expect(octalNum(17)).toBe("21");
    expect(octalNum(18)).toBe("22");

    expect(octalNum(1 * 8 ** 2 + 1)).toBe("101");
  });
});

describe("countNot7LetterInOctal test", () => {
  test("basic test", () => {
    expect(countNot7LetterInOctal(6)).toBe(6);
    expect(countNot7LetterInOctal(7)).toBe(6);
    expect(countNot7LetterInOctal(14)).toBe(13);
    expect(countNot7LetterInOctal(15)).toBe(13);
  });
});

describe("countNot7LetterInDecimal test", () => {
  test("basic test", () => {
    expect(countNot7LetterInDecimal(6)).toBe(6);
    expect(countNot7LetterInDecimal(7)).toBe(6);
    expect(countNot7LetterInDecimal(14)).toBe(13);
    expect(countNot7LetterInDecimal(15)).toBe(14);
    expect(countNot7LetterInDecimal(16)).toBe(15);
    expect(countNot7LetterInDecimal(17)).toBe(15);
  });
});

describe("countNot7Letter test", () => {
  test("sample01", () => {
    expect(countNot7Letter(20)).toBe(17);
  });
  test("sample02", () => {
    expect(countNot7Letter(100000)).toBe(30555);
  });
});

import { describe, test, expect } from "@jest/globals";
import { gcd, lcm } from "./148c";

describe("gcd", () => {
  test("tdd", () => {
    expect(gcd(2, 3)).toBe(1);
    expect(gcd(2, 4)).toBe(2);
    expect(gcd(432, 657)).toBe(gcd(657, 432));
  });
});

describe("lcm", () => {
  test("sample1", () => {
    expect(lcm(2, 3)).toBe(6);
  });
  test("sample2", () => {
    expect(lcm(123, 456)).toBe(18696);
  });

  test("sample3", () => {
    expect(lcm(100000, 99999)).toBe(9999900000);
  });
});

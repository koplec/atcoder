import { describe, test, expect } from "@jest/globals";
import { divisors } from "./180c";
describe("divisors", () => {
  test("tdd", () => {
    expect(divisors(1)).toEqual([1]);
    expect(divisors(2)).toEqual([1, 2]);
    expect(divisors(4)).toEqual([1, 2, 4]);
  });
  test("sample01", () => {
    expect(divisors(6)).toEqual([1, 2, 3, 6]);
  });
  test("sample02", () => {
    expect(divisors(720)).toEqual([
      1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 30, 36, 40, 45, 48,
      60, 72, 80, 90, 120, 144, 180, 240, 360, 720,
    ]);
  });
  test("sample03", () => {
    expect(divisors(1000000007)).toEqual([1, 1000000007]);
  });
});

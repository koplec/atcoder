import { describe, expect, test } from "@jest/globals";
import { approxPiStr } from "./314a";

describe("approximte pi as string", () => {
  test("sample01", () => {
    expect(approxPiStr(2)).toBe("3.14");
  });
  test("sample02", () => {
    expect(approxPiStr(32)).toBe("3.14159265358979323846264338327950");
  });
  test("sample03", () => {
    expect(approxPiStr(100)).toBe(
      "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"
    );
  });
});

import { describe, test, expect } from "@jest/globals";
import { g1, g2, f, a, randomInt } from "./192c";

describe("g1", () => {
  test("g1", () => {
    expect(g1(1)).toBe(1);
    expect(g1(12)).toBe(21);
    expect(g1(21)).toBe(21);
    expect(g1(8334)).toBe(8433);
    expect(g1(3021)).toBe(321);
    expect(g1(314)).toBe(431);
  });

  test("g2", () => {
    expect(g2(1)).toBe(1);
    expect(g2(12)).toBe(12);
    expect(g2(21)).toBe(12);
    expect(g2(8334)).toBe(3348);
    expect(g2(3021)).toBe(123);
  });

  test("f", () => {
    expect(f(271)).toBe(594);
  });

  test("a", () => {
    expect(a(271, 0)).toBe(271);
    expect(a(271, 1)).toBe(f(271));
    expect(a(271, 2)).toBe(f(a(271, 1)));
    expect(a(273, 5)).toBe(f(a(273, 4)));
  });

  test("sample01", () => {
    expect(a(314, 2)).toBe(693);
  });

  test("sample02", () => {
    expect(a(1000000000, 100)).toBe(0);
  });

  test("sample03", () => {
    expect(a(6174, 100000)).toBe(6174);
  });

  test("try some", () => {
    expect(a(1000000000, 100000)).toBe(f(a(1000000000, 100000 - 1)));
  });

  test("try random", () => {
    let N = 6;
    let K = randomInt(100000);
    console.log("N=", N, " K=", K);
    expect(a(N, K)).toBe(f(a(N, K - 1)));
  });
});

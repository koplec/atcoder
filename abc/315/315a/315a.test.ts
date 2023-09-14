import { describe, expect, test } from "@jest/globals";
import { excludeVowels } from "./315a.ts";

describe("excludeVowels", () => {
  test("basic test", () => {
    expect(excludeVowels("")).toBe("");
    expect(excludeVowels("aiueo")).toBe("");
  });
  test("sample01", () => {
    expect(excludeVowels("atcoder")).toBe("tcdr");
  });
  test("sample02", () => {
    expect(excludeVowels("xyz")).toBe("xyz");
  });
  test("sample03", () => {
    expect(excludeVowels("aaaabbbbcccc")).toBe("bbbbcccc");
  });
});

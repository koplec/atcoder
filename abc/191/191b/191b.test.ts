import { describe, expect, test } from "@jest/globals";
import { remove } from "./191b";

describe("191b remove specific num from number array", () => {
  test("sample01", () => {
    expect(remove(5, [3, 5, 6, 5, 4])).toEqual([3, 6, 4]);
  });
  test("sample02", () => {
    expect(remove(3, [3, 3, 3])).toEqual([]);
  });
});

import { describe, test, expect } from "@jest/globals";
import { dilluteAbleNums } from "./193c";

describe("sample1", () => {
    test("N=8", () => {
        let nums = dilluteAbleNums(8);
        expect(nums.length).toBe(2)
    })
})
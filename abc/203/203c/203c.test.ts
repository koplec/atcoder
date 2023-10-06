import { describe, test, expect } from "@jest/globals";
import { solve, Friend, Me } from "./203c";
describe("Me", () => {
  test("move", () => {
    const me = new Me(10);
    expect(me.move()).toBe(true);
    expect(me.village).toBe(10);
    expect(me.move()).toBe(false);
  });

  test("getMoneyFromFriendInTheSaveVillage", () => {
    const friends: Friend[] = [
      { village: 1, money: 5 },
      { village: 1, money: 10 },
    ];
    const me = new Me(5);
    expect(me.move()).toBe(true);
    expect(me.village).toBe(5);
    expect(me.move()).toBe(false);
    expect(me.getMoneyFromFriend(friends[0])).toBe(true);

    expect(me.move()).toBe(true);
    expect(me.village).toBe(10);
    expect(me.move()).toBe(false);
    expect(me.getMoneyFromFriend(friends[1])).toBe(true);

    //ここがおかしいのか
    expect(me.move()).toBe(true);
    expect(me.village).toBe(20);
    expect(me.move()).toBe(false);
  });
});
describe("203c", () => {
  test("sample1", () => {
    const friends: Friend[] = [
      { village: 2, money: 1 },
      { village: 5, money: 10 },
    ];
    expect(solve(3, friends)).toBe(4);
  });
  test("sample2", () => {
    const friends: Friend[] = [
      { village: 1, money: 1000000000 },
      { village: 2, money: 1000000000 },
      { village: 3, money: 1000000000 },
      { village: 4, money: 1000000000 },
      { village: 5, money: 1000000000 },
    ];
    expect(solve(1000000000, friends)).toBe(6000000000);
  });
  test("sample3", () => {
    const friends: Friend[] = [
      { village: 5, money: 5 },
      { village: 2, money: 1 },
      { village: 2, money: 2 },
    ];
    expect(solve(2, friends)).toBe(10);
  });
});

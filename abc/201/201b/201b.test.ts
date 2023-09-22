import { describe, expect, test } from "@jest/globals";
import { Mountain, secondHighestMountain } from "./201b";

describe("201b second highest mountains", () => {
  test("sample01", () => {
    const mountains: Mountain[] = [
      { name: "Everest", height: 8849 },
      { name: "K2", height: 8611 },
      { name: "Kangchenjunga", height: 8586 },
    ];
    expect(secondHighestMountain(mountains)).toStrictEqual({
      name: "K2",
      height: 8611,
    });
  });

  test("sample01", () => {
    const mountains: Mountain[] = [
      { name: "Everest", height: 8849 },
      { name: "K2", height: 8611 },
      { name: "Kangchenjunga", height: 8586 },
    ];
    expect(secondHighestMountain(mountains)).toStrictEqual({
      name: "K2",
      height: 8611,
    });
  });

  test("sample02", () => {
    const mountains: Mountain[] = [
      { name: "Kita", height: 3193 },
      { name: "Aino", height: 3189 },
      { name: "Fuji", height: 3776 },
      { name: "Okuhotaka", height: 3190 },
    ];
    expect(secondHighestMountain(mountains)).toStrictEqual({
      name: "Kita",
      height: 3193,
    });
  });

  test("sample03", () => {
    const mountains: Mountain[] = [
      { name: "QCFium", height: 2846 },
      { name: "chokudai", height: 2992 },
      { name: "kyoprofriends", height: 2432 },
      { name: "penguinman", height: 2390 },
    ];
    expect(secondHighestMountain(mountains)).toStrictEqual({
      name: "QCFium",
      height: 2846,
    });
  });
});

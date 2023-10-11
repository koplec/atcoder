import { assert } from "console";
import * as fs from "fs";
import { type } from "os";
import { off } from "process";
import { f } from "../../192/192c/192c";

const DEBUG = false;
const DO_MAIN = false;
if (!DEBUG) {
  console.debug = () => {};
}

function readInputs(): string[] {
  const str: string = fs.readFileSync("/dev/stdin", "utf8");
  console.debug("stdin:", str);
  const lines: string[] = str.split("\n");
  return lines;
}

export function* zip<T>(...args: Array<T>[]) {
  const length = args[0].length;

  for (let arr of args) {
    if (arr.length !== length) {
      throw "Lengths of arrays are not equal";
    }
  }

  for (let index = 0; index < length; index++) {
    let elms = [];
    for (const arr of args) {
      elms.push(arr[index]);
    }
    yield elms;
  }
}

export function randomInt(max: number): number {
  const r = Math.random() * max;
  return Math.trunc(r);
}

/**
 * 与えられた正の整数の約数を求める
 *
 * @param n 約数を求めたい整数
 * @returns 約数の配列 値の小さいものから昇順で並んでいる
 */
export function divisors(n: number): number[] {
  if (n === 1) return [1];
  if (n === 2) return [1, 2];
  let ret = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      ret.push(i);
      if (i !== n / i) {
        ret.push(n / i);
      }
    }
  }
  return ret.sort((a, b) => a - b);
}

//
//MAIN
//
//

// 友達がどの村にいて、お金をいくらくれるかを管理するデータ構造
export type Friend = {
  village: number;
  money: number;
};

export function initFriends(): Friend[] {
  return [];
}
export function addFriend(
  friends: Friend[] = [],
  village: number | null,
  money: number | null
): Friend[] {
  if (!money || !village) return [];
  const f: Friend = {
    money,
    village,
  };
  return [...friends, f];
}

// 現在どこにいて、所持金がいくらかを管理するデータ構造
export class Me {
  private _village = 0;
  private _money = 0;
  constructor(money: number) {
    this._money = money;
  }

  hasMoney(): boolean {
    return this._money > 0;
  }

  move(): boolean {
    if (this._money <= 0) return false;
    this._village += this._money;
    this._money = 0;
    console.debug(`me.move village:${this.village}`);
    return true;
  }

  getMoneyFromFriend(f: Friend): boolean {
    if (f.village <= this._village) {
      this._money += f.money;
      return true;
    }
    return false;
  }

  get village(): number {
    return this._village;
  }
}

function readFriends(lines: string[]) {
  let friends = initFriends();

  //友達情報読み込み
  for (const line of lines) {
    if (line.length <= 0) break;
    const [A, B] = line.split("").map(Number);
    friends = addFriend(friends, A, B);
  }
  return friends;
}

export function solve(K: number, friends: Friend[]): number {
  const me = new Me(K);
  // 破壊的ソート！
  friends.sort((a, b) => {
    return a.village - b.village;
  });

  // 初回進む
  me.move();

  for (let i = 0; i < friends.length; i++) {
    assert(!me.hasMoney());
    const f = friends[i];
    const getMoneySuccess = me.getMoneyFromFriend(f);
    if (!getMoneySuccess) break;
    // お金が得られたら移動する
    me.move();
  }
  // me.move();
  return me.village;
}

if (DO_MAIN) {
  const [line0, ...lines] = readInputs();
  const [N, K] = line0.split("").map(Number);

  const friends = readFriends(lines);
  const ans = solve(K, friends);

  console.log(ans);
}

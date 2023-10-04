import { assert } from "console";
import * as fs from "fs";
import { off } from "process";

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

//
//MAIN
//
//

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

if (DO_MAIN) {
  const [line0, ...rem] = readInputs();
  const N = Number(line0);
  const divs = divisors(N);
  for (const d of divs) {
    console.log(d);
  }
}

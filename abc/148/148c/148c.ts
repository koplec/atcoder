import { assert } from "console";
import * as fs from "fs";

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

/**
 * 最大公約数 great common dividor
 *
 * @param x, y 最大公約数を求めたい正の数
 * @returns 最大公約数
 *
 */

export function gcd(x: number, y: number): number {
  if (x < y) return gcd(y, x);
  const rem = x % y;
  //   const div = (x - rem) / y;
  if (rem !== 0) return gcd(y, rem);
  return y;
}

/**
 * 最小公倍数 least common multiple
 *
 * @param x, y 最小公倍数を求めたい正の数
 * @returns 最小公倍数
 */
export function lcm(x: number, y: number): number {
  return (x * y) / gcd(x, y);
}

if (DO_MAIN) {
  const [line, ...rem] = readInputs();
  const [A, B] = line.split(" ").map(Number);
  console.log(lcm(A, B));
}

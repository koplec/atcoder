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

/**
 * 与えられた整数を8進数で表示する
 *
 * @param n
 */
export function octalNum(n: number): string {
  let ret = [];
  do {
    let rem = n % 8;
    n = (n - rem) / 8;
    ret.push(rem);
  } while (n > 0);
  ret = ret.reverse();
  return ret.join("");
}

/**
 * 1から与えられた最大値まで8進数あらわしたときに7という文字が含まれない数がいくつあるかカウント
 *
 * @param maxNum 最大値
 */
export function countNot7LetterInOctal(maxNum: number): number {
  let count = 0;
  for (let num = 1; num <= maxNum; num++) {
    const str = octalNum(num);
    if (!str.includes("7")) count++;
  }
  return count;
}

/**
 * 1から与えられた最大値まで10進数であらわしたときに7を含まない数がいくつあるかカウント
 *
 * @param maxNum 最大値
 */
export function countNot7LetterInDecimal(maxNum: number): number {
  let count = 0;
  for (let num = 1; num <= maxNum; num++) {
    const str = String(num);
    if (!str.includes("7")) count++;
  }
  return count;
}

export function countNot7Letter(maxNum: number): number {
  let count = 0;
  for (let num = 1; num <= maxNum; num++) {
    const octal = octalNum(num);
    if (octal.includes("7")) continue;
    const str = String(num);
    if (str.includes("7")) continue;
    count++;
  }
  return count;
}

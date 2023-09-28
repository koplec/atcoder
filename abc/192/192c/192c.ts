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

function _g(x: number, compareTo: (x: number, y: number) => number): number {
  let str = String(x);
  str = str
    .split("")
    .filter((a) => a !== "0")
    .sort((a, b) => {
      return compareTo(Number(a), Number(b));
    })
    .join("");
  return Number(str);
}
export function g1(x: number): number {
  return _g(x, (a, b) => b - a);
}

export function g2(x: number): number {
  return _g(x, (a, b) => a - b);
}

export function f(x: number): number {
  return g1(x) - g2(x);
}
/**
 * k==0のときinitValueそのまま
 * k==1のとき1回だけ
 *
 * @param initValue 初期値
 * @param kth k番目の値を求める kthは0スタート
 * @returns k番目の値
 */
export function a(initValue: number, kth: number): number {
  let tmp = initValue;
  for (let i = 0; i < kth; i++) {
    tmp = f(tmp);
  }
  return tmp;
}

if (DO_MAIN) {
  const [line0, ...rem] = readInputs();
  const [N, K] = line0.split(" ").map(Number);
  const val = a(N, K);
  console.log(val);
}

// for (let i = 0; i < 100; i++) {
//   let N = randomInt(1000000000);
//   let K = randomInt(100000);
//   console.log("N=", N, " K=", K);
//   let expected = a(N, K);
//   if (expected !== f(a(N, K - 1))) {
//     console.log("FAILED!!");
//     process.exit(1);
//   }
// }

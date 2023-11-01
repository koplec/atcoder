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

export type CombBit = number;
// https://nemutage.hatenablog.jp/entry/2023/05/04/021435
// このアルゴリズムは、桁数の制約がある
// 32bit整数で表すので、Nはせいぜい32程度まで
// それ以上の組み合わせの生成には32bit整数ではだめ
export function* genCombBits(
  N: number,
  K: number
): Generator<CombBit, any, any> {
  // N桁で下K桁が1で埋まっているBit列の生成 0b000.00111..11みたいな
  let ret = 0;

  for (let i = 0; i < K; i++) {
    ret = (ret << 1) | 1;
  }

  yield ret;

  for (;;) {
    const least = ret & -ret;
    const left = ret + least;
    const right = ((ret & ~left) / least) >> 1;
    ret = left | right;

    //N桁目で終了してほしい
    if (((1 << N) & ret) > 0) break;
    yield ret;
  }
}

/**
 * 組み合わせ(combination)を表すcomBitから、何番目の要素が含まれるかを表す配列を返す
 * 例
 * 0b00101 -> [0, 2]
 * 0b11111 -> [0,1,2,3,4]
 *
 * @param combBit
 * @returns
 */
export function combBit2IndexArray(combBit: CombBit): number[] {
  let ret: number[] = [];
  for (let index = 0; ; index++) {
    const t = 1 << index;
    if (t < 0) break;
    if (combBit & t) ret.push(index);
  }
  return ret;
}

/**
 * combinationを生成するgenerator
 *
 */
export function* genComb3(N: number) {
  for (let i = 0; i < N - 2; i++) {
    for (let j = i + 1; j < N - 1; j++) {
      for (let k = j + 1; k < N; k++) {
        yield [i, j, k];
      }
    }
  }
}

//MAIN

/**
 * atcoder 182c
 * Nの桁数をkとするとき、0個以上k個未満の数字を消して、そのまま結合したときの3の倍数にする
 * 最小の消す桁数を求める
 * 消しても3の倍数にならないときは-1を返す
 * @param N 入力される正の整数
 */
export function solve(N: bigint): number {
  assert(N > 0, "argument must be positive!!");
  const rem = N % 3n;
  let hasRem1 = false; //余りが1になる桁がある
  let hasRem2 = false; //余りが2になる桁がある

  if (rem === 0n) return 0; //3の倍数だったら、1つも消す必要はない
  const str = String(N);
  const digit = str.length;
  for (const s of str) {
    const nums = Number(s);
    const r = nums % 3;
    if (r === 1) hasRem1 = true;
    if (r === 2) hasRem2 = true;
  }

  //理論ノート参照
  if (rem === 1n) {
    if (hasRem1) {
      if (digit <= 1) return -1;
      return 1;
    } else {
      assert(hasRem2 === true);
      if (digit <= 2) return -1;
      return 2;
    }
  } else {
    assert(rem === 2n);
    if (hasRem2) {
      if (digit <= 1) return -1;
      return 1;
    } else {
      assert(hasRem1 === true);
      if (digit <= 2) return -1;
      return 2;
    }
  }
}

if (DO_MAIN) {
  const [line, ..._rem] = readInputs();
  const ans = solve(BigInt(line));
  console.log(ans);
}

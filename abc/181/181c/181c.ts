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

/**
 *
 *
 * @param begin loopの開始する番号
 * @param end loopの終了する番号+1の値
 * @param count
 * @param accumAry
 * @returns
 */
function* _genCombLoop(
  begin: number,
  end: number,
  count: number,
  accumAry: number[]
) {
  if (count === 0) {
    for (let index = begin; index < end; index++) {
      let ret = [...accumAry];
      ret.push(index);
      yield ret;
    }
    return;
  }

  // count >== 1
  for (let i = begin; i < end - count; i++) {
    const ret = [i, ...accumAry]; //[0]
    //   TODO: anyの型検討
    const iter: any = _genCombLoop(i + 1, end, count - 1, ret);
    let v: IteratorResult<number[], void>;
    for (let i = 0; i < 10; i++) {
      v = iter.next();
      if (v.done) break;
      if (!v.done) yield v.value;
    }
  }
}

/**
 * combinationを生成するgenerator
 *
 */
export function* genComb(N: number, K: number) {
  if (K === 1) {
    // 0-N-1のgen
    const iter = _genCombLoop(0, N, K - 1, []);
    let v: IteratorResult<number[], void>;
    while (true) {
      v = iter.next();
      if (v.done) break;
      yield v.value;
    }
  }

  if (K === 2) {
    const iter = _genCombLoop(0, N, K - 1, []);
    let v: IteratorResult<number[], void>;
    while (true) {
      v = iter.next();
      if (v.done) break;
      yield v.value;
    }
  }
  if (K === 3) {
    for (let i = 0; i < N - 2; i++) {
      for (let j = i + 1; j < N - 1; j++) {
        for (let k = j + 1; k < N; k++) {
          yield [i, j, k];
        }
      }
    }
  }
}

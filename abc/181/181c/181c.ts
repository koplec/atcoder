import { assert } from "console";
import * as fs from "fs";

const DEBUG = true;
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
// 32bit整数で表すので、Nはせいぜい32程度まで　それ以上の組み合わせの生成には32bit整数ではだめ
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
    console.debug("count:", count, " i:", i, " ret:", ret);
    //   TODO: anyの型検討
    const iter: any = _genCombLoop(i + 1, end, count - 1, ret);
    let v: IteratorResult<number[], void>;
    for (let _i_ = 0; _i_ < 10; _i_++) {
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
    const iter = _genCombLoop(0, N, K - 1, []);
    let v: IteratorResult<number[], void>;
    while (true) {
      v = iter.next();
      if (v.done) break;
      yield v.value;
    }
    // for (let i = 0; i < N - 2; i++) {
    //   for (let j = i + 1; j < N - 1; j++) {
    //     for (let k = j + 1; k < N; k++) {
    //       yield [i, j, k];
    //     }
    //   }
    // }
  }
}

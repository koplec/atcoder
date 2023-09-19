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

export function prod(a: number[], b: number[]): number {
  let ret = 0.0;
  for (let [elm1, elm2] of zip<number>(a, b)) {
    ret += elm1 * elm2;
  }
  return ret;
}

if (DO_MAIN) {
  const lines: string[] = readInputs();
  const ary1: number[] = lines[1].split(" ").map((a) => Number(a));
  const ary2: number[] = lines[2].split(" ").map((a) => Number(a));

  const p = prod(ary1, ary2);
}

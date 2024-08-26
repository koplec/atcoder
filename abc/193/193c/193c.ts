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

export function dilluteAbleNums(N: number): number[]{
  const ret: number[] = [];
  for (let a = 2; a <= 10**5 + 10; a++) {
    for (let b=2; b <= 1000; b++){
      if (a ** b <= N){
        ret.push(a**b)
      }
    }
    
  }
  return ret
}

if (DO_MAIN){
    const [line0, ...rem] = readInputs()
    const N = parseInt(line0)
    const nums = dilluteAbleNums(N)
    console.log(N)

    console.log(N - nums.length)
}
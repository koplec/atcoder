import { assert } from "console";
import * as fs from "fs";

const DEBUG = false;
const DO_MAIN = true;
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

export function remove(removeNum: number, numary: number[]): number[] {
  return numary.filter((elm) => elm !== removeNum);
}

if (DO_MAIN) {
  const [line0, line1, ...rem] = readInputs();
  const [N, X] = line0.split(" ").map((a) => Number(a));
  const numAry = line1.split(" ").map((a) => Number(a));
  const ans = remove(X, numAry);
  console.log(ans.join(" "));
}

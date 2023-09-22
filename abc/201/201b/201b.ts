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

function* zip<T>(...args: Array<T>[]) {
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

export type Mountain = { name: string; height: number };
export function secondHighestMountain(mountains: Mountain[]): Mountain {
  let a = mountains.sort((a, b) => {
    return b.height - a.height;
  });
  return a[1];
}

if (DO_MAIN) {
  const [line0, ...lines] = readInputs();

  let mountains: Mountain[] = [];
  for (const line of lines) {
    const obj: Mountain = {
      name: line.split(" ")[0],
      height: Number(line.split(" ")[1]),
    };
    mountains.push(obj);
  }

  const secondMt = secondHighestMountain(mountains);

  console.log(secondMt.name);
}

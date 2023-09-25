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

export function canSeeMasu(x: number, y: number, masu: number[][]): number[][] {
  console.debug("canSeeMasu masu:", masu);
  //結果のマスを[[1,2], [3,4]]のように入れていく
  const ret: number[][] = new Array();
  const h = masu.length;
  const w = masu[0].length;
  console.debug("h:", h);
  console.debug("w:", w);
  ret.push([x, y]);
  //right
  for (let j = x + 1; j < w && j >= 0; j++) {
    console.debug(`(i, j)=(${j}, ${y})`);
    console.debug(`masu value=${masu[y][j]}`);
    if (masu[y][j] === 1) break;
    ret.push([y, j]);
  }

  //down
  for (let i = y + 1; i < h && i >= 0; i++) {
    console.debug(`(i, j)=(${i}, ${x})`);
    console.debug(`masu value=${masu[i][x]}`);
    if (masu[i][x] === 1) break;
    ret.push([i, x]);
  }

  console.debug("canSeeMasu:", ret);
  return ret;
}

if (DO_MAIN) {
  const [line0, ...lines] = readInputs();
  const [H, W, X, Y] = line0.split(" ").map(Number);

  //map作り
  //0 .に対応, 障害物がないことを表す
  //1 #に対応, 障害物があることを表す
  const masu: number[][] = new Array();
  for (let j = 0; j < H; j++) {
    const line = lines[j].split("");
    for (let i = 0; i < W; i++) {
      if (line[i] === ".") {
        masu[i][j] = 0;
      } else {
        masu[i][j] = 1;
      }
    }
  }
}

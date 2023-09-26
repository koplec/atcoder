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

export class Masu {
  constructor(private _map: number[][]) {
    this._map = _map;
  }

  /**
   * 障害物か否か
   * 障害物だったら1, 層じゃないときは0
   *
   * @param x 横方向座標
   * @param y 縦方向座標
   */
  value(x: number, y: number): number {
    return this._map[y][x];
  }
  width(): number {
    return this._map[0]!.length;
  }
  height(): number {
    return this._map!.length;
  }
}

export interface MasuPoint {
  x: number;
  y: number;
}
export const compareMasuPoint = function (a: MasuPoint, b: MasuPoint): number {
  if (a.x != b.x) return a.x - b.x;
  if (a.y != b.y) return a.y - b.y;
  return 0;
};

type MasuMap = number[][];

export function canSeeMasu(
  x: number,
  y: number,
  masuMap: MasuMap
): MasuPoint[] {
  const masu = new Masu(masuMap);
  console.debug("canSeeMasu masu:", masuMap);
  //結果のマスを[[1,2], [3,4]]のように入れていく
  const ret: MasuPoint[] = new Array();
  const h = masu.height();
  const w = masu.width();
  console.debug("h:", h);
  console.debug("w:", w);
  ret.push({ x: x, y: y });
  //right
  console.debug("right");
  for (let i = x + 1; i < w && i >= 0; i++) {
    if (masu.value(i, y) === 1) break;
    ret.push({ x: i, y: y });
  }
  //left
  console.debug("left");
  for (let i = x - 1; i < w && i >= 0; i--) {
    if (masu.value(i, y) === 1) break;
    ret.push({ x: i, y: y });
  }

  //down
  for (let j = y + 1; j < h && j >= 0; j++) {
    console.debug(`(i, j)=(${j}, ${x})`);
    if (masu.value(x, j) === 1) break;
    ret.push({ x: x, y: j });
  }

  //up
  for (let j = y - 1; j < h && j >= 0; j--) {
    console.debug(`(i, j)=(${j}, ${x})`);
    if (masu.value(x, j) === 1) break;
    ret.push({ x: x, y: j });
  }

  console.debug("canSeeMasu:", ret);
  return ret;
}
/**
 *   map作り
  0 .に対応, 障害物がないことを表す
  1 #に対応, 障害物があることを表す
  地図の形を配列に書き換える
  例えば、
  ..#..
  .#..#
  ##...
  を
  [[0,0,1,0,0],
   [0,1,0,0,1],
   [1,1,0,0,0]] に変換
   
 * @param H 
 * @param W 
 * @param lines 
 * @returns 
 */
export function genMasuMap(H: number, W: number, lines: string[]): MasuMap {
  const masu: MasuMap = new Array(H);
  for (let i = 0; i < masu.length; i++) {
    masu[i] = new Array(W);
  }
  for (let j = 0; j < H; j++) {
    const line = lines[j].split("");
    for (let i = 0; i < W; i++) {
      if (line[i] === ".") {
        masu[j][i] = 0;
      } else {
        masu[j][i] = 1;
      }
    }
  }
  return masu;
}

if (DO_MAIN) {
  const [line0, ...lines] = readInputs();
  const [H, W, X, Y] = line0.split(" ").map(Number);

  const masuMap = genMasuMap(H, W, lines);
}

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

/**
 * 薬の効果が最も効率的に現れる薬のインデックスを出力する
 * モンスターを飼っていて、目標とする体力以上にしたいが、過度に体力回復もしたくない
 * 最低限どの薬を提供したい
 * 目標を達成できる傷薬のうちもっとも効き目の弱い者のインデックスを出力
 *
 * @param N 傷薬の数　全部でN種類で番号が大きいほど効果が大きい
 * @param H モンスターの現在の体力
 * @param X モンスターの目標とする最低限の体力
 * @param points 薬の番号ごとの効果の配列
 *
 * @returns 何番目の番号が薬の効果が効率的か 0空採番される
 */
export function calcEffectivePointIndex(
  N: number,
  H: number,
  X: number,
  points: number[]
): number {
  const rem = X - H;
  for (let index = 0; index < points.length; index++) {
    const point = points[index];
    if (rem <= point) return index;
  }
  return -1;
}

function main() {
  const numArys: number[][] = readInputs()
    .filter((line) => line.length > 0)
    .map((line) => line.split(" ").map((str) => Number(str)));
  console.debug("numArys:", numArys);

  //N 傷薬の種類、効き目の弱い順番
  //H モンスターの現在の体力
  //X 体力をX以上にしたい
  const [N, H, X] = numArys[0];

  //points 傷薬でどれくらい体力が回復するか
  const points = numArys[1];
  console.debug(`N:${N} H:${H} X:${X}`);
  console.debug(`points:${points}`);

  const index = calcEffectivePointIndex(N, H, X, points);
  if (index >= 0) {
    console.log(index + 1);
  }
}

if (DO_MAIN) main();

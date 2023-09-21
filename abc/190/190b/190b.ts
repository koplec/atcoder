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

/**
 *高橋君がモンスターを攻撃してダメージを与えられるか判定する
 *
 * @param spellSecMaxLimit 怪物が呪文詠唱で最大で待ってくれる秒数　これ以上だと攻撃は無効になる
 * @param spellDamageMinLimit 怪物に呪文詠唱で与えられる最小のダメージ　これ以下だとダメージを与えられない
 * @param spellSecs 呪文詠唱の秒数
 * @param spellDamages 呪文詠唱のダメージ
 */
export function takahashiCanMakeDamage(
  spellSecMaxLimit: number,
  spellDamageMinLimit: number,
  spellSecs: number[],
  spellDamages: number[]
): boolean {
  const len = spellSecs.length;
  for (let i = 0; i < len; i++) {
    if (
      spellSecs[i] < spellSecMaxLimit &&
      spellDamages[i] > spellDamageMinLimit
    ) {
      return true;
    }
  }
  return false;
}

if (DO_MAIN) {
  const [line0, ...lines] = readInputs();
  const [N, S, D] = line0.split(" ").map((a) => Number(a));
  const X: number[] = [];
  const Y: number[] = [];
  for (let i = 0; i < N; i++) {
    const line = lines[i];
    [X[i], Y[i]] = line.split(" ").map((a) => Number(a));
  }
  if (takahashiCanMakeDamage(S, D, X, Y)) {
    console.log("Yes");
  } else {
    console.log("No");
  }
}

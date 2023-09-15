"use strict";

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

const PI_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

/**
 * 与えられた桁数までの円周率を求めて、文字列で返す。
 * 具体的には、例えば小数点以下第N位まで求めるとき、
 * そのN+1位は切りすてて、末尾に0があるときは取り除かない文字列表現とする
 *
 * @param dec 小数点以下の桁数
 */
export function approxPiStr(dec: number): string {
  return PI_100.substring(0, dec + 2);
}

if (DO_MAIN) {
  const [line, ...others] = readInputs();
  console.log(approxPiStr(Number(line)));
}

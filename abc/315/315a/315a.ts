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

/**
 * 与えられた英小文字の単語から、母音を除く
 * @param word 母音を取り除く対象の単語
 * @returns 母音が取り除かれた後の単語
 */
export function excludeVowels(word: string): string {
  return word.replace(/[a,i,u,e,o]/g, "");
}

if (DO_MAIN) {
  const [line, ...others] = readInputs();
  console.debug(line);
  console.log(excludeVowels(line));
}

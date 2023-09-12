import { assert } from "console";
import * as fs from "fs";

const DEBUG = false;
if (!DEBUG) {
  console.debug = () => {};
}

function readInputs(): string[] {
  const str: string = fs.readFileSync("/dev/stdin", "utf8");
  console.debug("stdin:", str);
  const lines: string[] = str.split("\n");
  return lines;
}

const RATING_STR = `
tourist 3858
ksun48 3679
Benq 3658
Um_nik 3648
apiad 3638
Stonefeang 3630
ecnerwala 3613
mnbvmar 3555
newbiedmy 3516
semiexp 3481
`;
console.debug(`ratings:${RATING_STR}`);

function makeRateMap(ratings: string): { [key: string]: number } {
  const lines = ratings
    .split("\n")
    .filter((line) => line.length > +0)
    .map((line) => line.split(" "));
  return lines.reduce(
    (
      acc: { [key: string]: number },
      strs: string[]
    ): { [key: string]: number } => {
      const key = strs[0];
      const val = Number(strs[1]);
      acc[key] = val;
      return acc;
    },
    {}
  );
}

function genGetRating(): (name: string) => number {
  const rateMap = makeRateMap(RATING_STR);

  assert(Object.keys(rateMap).length == 10, "rateMap keys length");

  console.debug(`ratingMap: ${JSON.stringify(rateMap)}`);
  return function (name: string): number {
    return rateMap[name];
  };
}

export default genGetRating;

function main() {
  const [name] = readInputs();
  // console.debug(`name:${name}`);

  const getRating = genGetRating();
  console.log(getRating(name));
}

main();

"use strict";

// const LOG_LEVEL = "debug";
const LOG_LEVEL = "info";
if (LOG_LEVEL !== "debug") console.debug = () => {};

function findOnlyOne(a, b, c) {
  if (a === b) return c;
  if (a === c) return b;
  return a;
}

function main() {
  let input = require("fs").readFileSync("/dev/stdin", "utf8");
  console.debug(input);
  let nums = input.split(" ").map((str) => Number(str));
  console.debug(nums);
  const ans = findOnlyOne(...nums);
  process.stdout.write(String(ans));
}

main();

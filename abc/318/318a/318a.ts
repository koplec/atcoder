import * as fs from "fs";

const DEBUG = false;
if(!DEBUG){
  console.debug = () => {};
}


const str: string= fs.readFileSync("/dev/stdin", "utf8");
console.debug("stdin:", str);


// 1日目からN日目まで満月を見れる日を出力
// 満月はM日から　M+P, M+2P, で見れる
const [N, M, P]:number[] = str.split(' ').map((str) => Number(str));
console.debug(N, M, P)

let count = 0;
for (let i = M; i <= N; i=i+P) {
  count++
}

console.log(count)
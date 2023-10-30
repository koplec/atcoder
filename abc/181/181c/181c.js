"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genComb3 = exports.combBit2IndexArray = exports.genCombBits = exports.lcm = exports.gcd = exports.divisors = exports.randomInt = exports.zip = void 0;
var fs = require("fs");
var process_1 = require("process");
var DEBUG = false;
var DO_MAIN = true;
if (!DEBUG) {
    console.debug = function () { };
}
function readInputs() {
    var str = fs.readFileSync("/dev/stdin", "utf8");
    console.debug("stdin:", str);
    var lines = str.split("\n");
    return lines;
}
function zip() {
    var _i, length, _a, args_1, arr, index, elms, _b, args_2, arr;
    var args = [];
    for (_i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                length = args[0].length;
                for (_a = 0, args_1 = args; _a < args_1.length; _a++) {
                    arr = args_1[_a];
                    if (arr.length !== length) {
                        throw "Lengths of arrays are not equal";
                    }
                }
                index = 0;
                _c.label = 1;
            case 1:
                if (!(index < length)) return [3 /*break*/, 4];
                elms = [];
                for (_b = 0, args_2 = args; _b < args_2.length; _b++) {
                    arr = args_2[_b];
                    elms.push(arr[index]);
                }
                return [4 /*yield*/, elms];
            case 2:
                _c.sent();
                _c.label = 3;
            case 3:
                index++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.zip = zip;
function randomInt(max) {
    var r = Math.random() * max;
    return Math.trunc(r);
}
exports.randomInt = randomInt;
/**
 * 与えられた正の整数の約数を求める
 *
 * @param n 約数を求めたい整数
 * @returns 約数の配列 値の小さいものから昇順で並んでいる
 */
function divisors(n) {
    if (n === 1)
        return [1];
    if (n === 2)
        return [1, 2];
    var ret = [];
    for (var i = 1; i * i <= n; i++) {
        if (n % i === 0) {
            ret.push(i);
            if (i !== n / i) {
                ret.push(n / i);
            }
        }
    }
    return ret.sort(function (a, b) { return a - b; });
}
exports.divisors = divisors;
/**
 * 最大公約数 great common dividor
 *
 * @param x, y 最大公約数を求めたい正の数
 * @returns 最大公約数
 *
 */
function gcd(x, y) {
    if (x < y)
        return gcd(y, x);
    var rem = x % y;
    //   const div = (x - rem) / y;
    if (rem !== 0)
        return gcd(y, rem);
    return y;
}
exports.gcd = gcd;
/**
 * 最小公倍数 least common multiple
 *
 * @param x, y 最小公倍数を求めたい正の数
 * @returns 最小公倍数
 */
function lcm(x, y) {
    return (x * y) / gcd(x, y);
}
exports.lcm = lcm;
// https://nemutage.hatenablog.jp/entry/2023/05/04/021435
// このアルゴリズムは、桁数の制約がある
// 32bit整数で表すので、Nはせいぜい32程度まで
// それ以上の組み合わせの生成には32bit整数ではだめ
function genCombBits(N, K) {
    var ret, i, least, left, right;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ret = 0;
                for (i = 0; i < K; i++) {
                    ret = (ret << 1) | 1;
                }
                return [4 /*yield*/, ret];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                least = ret & -ret;
                left = ret + least;
                right = ((ret & ~left) / least) >> 1;
                ret = left | right;
                //N桁目で終了してほしい
                if (((1 << N) & ret) > 0)
                    return [3 /*break*/, 5];
                return [4 /*yield*/, ret];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}
exports.genCombBits = genCombBits;
/**
 * 組み合わせ(combination)を表すcomBitから、何番目の要素が含まれるかを表す配列を返す
 * 例
 * 0b00101 -> [0, 2]
 * 0b11111 -> [0,1,2,3,4]
 *
 * @param combBit
 * @returns
 */
function combBit2IndexArray(combBit) {
    var ret = [];
    for (var index = 0;; index++) {
        var t = 1 << index;
        if (t < 0)
            break;
        if (combBit & t)
            ret.push(index);
    }
    return ret;
}
exports.combBit2IndexArray = combBit2IndexArray;
/**
 * combinationを生成するgenerator
 *
 */
function genComb3(N) {
    var i, j, k;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < N - 2)) return [3 /*break*/, 8];
                j = i + 1;
                _a.label = 2;
            case 2:
                if (!(j < N - 1)) return [3 /*break*/, 7];
                k = j + 1;
                _a.label = 3;
            case 3:
                if (!(k < N)) return [3 /*break*/, 6];
                return [4 /*yield*/, [i, j, k]];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                k++;
                return [3 /*break*/, 3];
            case 6:
                j++;
                return [3 /*break*/, 2];
            case 7:
                i++;
                return [3 /*break*/, 1];
            case 8: return [2 /*return*/];
        }
    });
}
exports.genComb3 = genComb3;
function isCollinearity(p1, p2, p3) {
    var x1 = p1[0], y1 = p1[1];
    var x2 = p2[0], y2 = p2[1];
    var x3 = p3[0], y3 = p3[1];
    return (x2 - x1) * (y3 - y1) == (y2 - y1) * (x3 - x1);
}
if (DO_MAIN) {
    var _a = readInputs(), first = _a[0], lines = _a.slice(1);
    var N = Number(first);
    var inputPoints_1 = lines
        .filter(function (line) { return line.length > 0; })
        .map(function (line) { return line.split(" ").map(function (str) { return Number(str); }); });
    // console.debug(points);
    var iter = genComb3(N);
    for (var v = iter.next(); !v.done; v = iter.next()) {
        // console.debug(v.value);
        if (!v.done) {
            var indexes = v.value;
            var ps = indexes.map(function (index) { return inputPoints_1[index]; });
            // console.debug(ps);
            if (isCollinearity(ps[0], ps[1], ps[2])) {
                console.log("Yes");
                (0, process_1.exit)();
            }
        }
    }
    console.log("No");
}

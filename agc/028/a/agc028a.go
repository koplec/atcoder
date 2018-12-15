package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"strings"
)

func main() {
	nums := scanNums(2)
	N, M := nums[0], nums[1]
	var S, T string
	fmt.Scan(&S, &T)
	//S, _ := readLine() //len must N
	//T, _ := readLine() //len must M
	fmt.Printf("%d\n", solve(N, M, S, T))

}

func solve(n, m int, s, t string) int {
	//先頭が等しくないならそもそもだめ
	if s[0] != t[0] {
		return -1
	}
	//最大公約数
	gcd := greatestCommonDivider(n, n)
	//最小公倍数を求める
	lcm := leastCommonMultiple(n, m)
	debug("lcm = %d gcm = %d\n", lcm, gcd)

	//最大公約数が1なら互いに疎なので、先頭が等しければok
	if gcd == 1 {
		return lcm
	}

	//最小公倍数の約数の最小公倍数の倍数の部分が文字が被っている
	//そこの文字が等しいかどうかをチェックする
	dn := lcm / n
	dm := lcm / m
	lcm2 := leastCommonMultiple(dn, dm)
	debug("lcm2=%d\n", lcm2)
	commons := make([]int, 0) //文字の位置が被っている位置
	idx := 1
	for idx*lcm2 < lcm {
		commons = append(commons, idx*lcm2)
		idx++
	}

	debug("commons = %v\n", commons) //最大公約数の倍数
	if len(commons) == 0 {           //被るものがない
		return lcm
	} else {
		//文字列で被っているところチェック
		for _, i := range commons {
			debug("%d->%v %v\n", i, string(s[i/dn]), string(t[i/dm]))
			if s[i/dn] != t[i/dm] {
				return -1
			}
		}
		return lcm
	}
}

func greatestCommonDivider(n, m int) int {
	if m == 0 {
		return n
	} else {
		return greatestCommonDivider(m, n%m)
	}
}

func leastCommonMultiple(n, m int) int {
	gcd := greatestCommonDivider(n, m)
	return n * m / gcd
}

func powInt(a, n int) int {
	if n == 1 {
		return a
	}
	if n%2 == 0 {
		return powInt(a*a, n/2)
	} else {
		return a * powInt(a, n-1)
	}
}

func minInt(a, b int) int {
	if a < b {
		return a
	} else {
		return b
	}
}
func maxInt(a, b int) int {
	if a > b {
		return a
	} else {
		return b
	}
}

func printFactoring(factors map[int]int) string {
	strs := make([]string, 0)
	for k, v := range factors {
		strs = append(strs, fmt.Sprintf("%d^%d", k, v))
	}
	return strings.Join(strs, " * ")
}

//** DEBUG **/
const DEBUG_ENABLE = false

func debug(format string, a ...interface{}) (n int, err error) {
	if DEBUG_ENABLE {
		return fmt.Fprintf(os.Stdout, format, a...)
	} else {
		return 0, nil
	}
}

var rdr = bufio.NewReaderSize(os.Stdin, 100000)

/**
 * 長い文字列はfmt.Scanfだと時間がかかる
 */
func readLine() (string, error) {
	buf := make([]byte, 0, 100000)
	for {
		l, p, e := rdr.ReadLine()
		if e != nil {
			return "", e
		}
		buf = append(buf, l...)
		if !p {
			break
		}
	}
	return string(buf), nil
}

/**
* １行に空白区切りで数字を読み込み
 */
func scanNums(len int) (nums []int) {
	nums = make([]int, len)
	for i := 0; i < len; i++ {
		fmt.Scan(&nums[i])
	}
	return
}

//素因数分解
func factoring(num int) map[int]int {
	//debug("factoring %d BEGIN\n", num)
	if num == 1 {
		return make(map[int]int)
	}
	ret := make(map[int]int)
	//sqrt := int(math.Ceil(math.Sqrt(float64(num))))
	//debug("sqrt = %d\n", sqrt)
	maxPrime := num
	for num%2 == 0 {
		ret[2]++
		num = num / 2
	}
	for p := 3; p <= maxPrime; p = p + 1 {
		//debug("maxPrime is %d\n", maxPrime)
		if num == 1 {
			break
		}
		if isPrime(p) {
			//debug("%d is Prime\n", p)
			//debug("%d rem %d = %d\n", num, p, num%p)
			for num%p == 0 {
				//debug(" counting of %d num\n", p)
				_, ok := ret[p]
				if ok {
					ret[p]++
				} else {
					ret[p] = 1
					//debug("ret[%d] = %d\n", p, ret[p])
				}
				num = num / p
			}
		}
	}
	return ret
}

func isPrime(num int) bool {
	if num == 2 {
		return true
	}
	if num%2 == 0 {
		return false
	}
	sqrt := int(math.Ceil(math.Sqrt(float64(num))))
	for i := 3; i <= sqrt; i = i + 2 {
		if num%i == 0 {
			return false
		}
	}
	return true
}

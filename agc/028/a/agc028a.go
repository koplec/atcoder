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

	//最小公倍数を求める
	lcm := leastCommonMultiple(N, M)
	debug("lcm = %d\n", lcm)
	//最小公倍数の長さの単語の文字でN, Mの文字の位置が被るものがあるかチェック
	dn := lcm / N
	dm := lcm / M
	debug("dn = %d dm=%d\n", dn, dm)
	commons := make([]int, 0) //文字の位置が被っている位置
	for i := 0; i < lcm; i = i + dn {
		for j := 0; j < lcm; j = j + dm {
			if i == j {
				commons = append(commons, i)
			}
		}
	}
	debug("commons = %v\n", commons) //最大公約数の倍数
	if len(commons) == 0 {           //被るものがない
		fmt.Printf("%d\n", lcm)
		return
	} else {
		for _, i := range commons {
			debug("%d->%v %v\n", i, string(S[i/dn]), string(T[i/dm]))
			if S[i/dn] != T[i/dm] {
				fmt.Printf("-1\n")
				return
			}
		}
		fmt.Printf("%d\n", lcm)
	}

}

func leastCommonMultiple(n, m int) int {
	nFactors := factoring(n)
	mFactors := factoring(m)

	for p, c := range nFactors {
		nFactors[p] = maxInt(c, mFactors[p])
	}
	for p, c := range mFactors {
		nFactors[p] = maxInt(c, nFactors[p])
	}
	debug("factors -> %s\n", printFactoring(nFactors))
	ret := 1
	for p, c := range nFactors {
		ret *= powInt(p, c)
	}
	return ret
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
	debug("factoring %d BEGIN\n", num)
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
		debug("maxPrime is %d\n", maxPrime)
		if num == 1 {
			break
		}
		if isPrime(p) {
			debug("%d is Prime\n", p)
			debug("%d rem %d = %d\n", num, p, num%p)
			for num%p == 0 {
				debug(" counting of %d num\n", p)
				_, ok := ret[p]
				if ok {
					ret[p]++
				} else {
					ret[p] = 1
					debug("ret[%d] = %d\n", p, ret[p])
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

package main

import (
	"fmt"
	"math"
	"os"
	"strings"
)

const DEBUG_ENABLE = false

func debug(format string, a ...interface{}) (n int, err error) {
	if DEBUG_ENABLE {
		return fmt.Fprintf(os.Stdout, format, a...)
	} else {
		return 0, nil
	}
}

func main() {
	var N int
	fmt.Scanf("%d", &N)
	//var N = 3
	allFactors := make(map[int]int) //N!の素因数分解
	for num := 2; num <= N; num++ {
		factors := factoring(num)
		debug("factoring of %d = %s\n", num, printFactoring(factors))
		for k, v := range factors {
			_, ok := allFactors[k]
			if ok {
				allFactors[k] += v
			} else {
				allFactors[k] = v
			}
		}
	}
	debug("%d! = %s\n", N, printFactoring(allFactors))
	//N!の約数(M)の約数の個数が75個になるのは、以下の4パターン
	//M=p^4q^4r^2 (5*5*3=75), p^24q^2 (25*3=75), p^4q^14 (5*15=75), p^74 (75)

	//N!の素因数分解の結果を使って、カウントする

	//約数の数

	ret := countNum(4, allFactors)*(countNum(4, allFactors)-1)*(countNum(2, allFactors)-2)/2 + countNum(24, allFactors)*(countNum(2, allFactors)-1) + countNum(14, allFactors)*(countNum(4, allFactors)-1) + countNum(74, allFactors)

	fmt.Printf("%d\n", ret)
}

func countNum(keyCount int, factors map[int]int) int {
	//keyCount以上の値に持つkeyの数を数える
	count := 0
	for k, v := range factors {
		if v >= keyCount {
			debug("prime -> %d\n", k)
			count++
		}
	}
	debug("%d count -> %d\n", keyCount, count)
	return count
}

//階乗
func fact(num int) int {
	ret := 1
	for i := 2; i <= num; i++ {
		ret *= i
	}
	return ret
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

func printFactoring(factors map[int]int) string {

	strs := make([]string, 0)
	for k, v := range factors {
		strs = append(strs, fmt.Sprintf("%d^%d", k, v))
	}
	return strings.Join(strs, " * ")

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

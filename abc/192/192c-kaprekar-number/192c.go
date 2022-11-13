// 論理的にはあっていそうだけど全部は通らない
package main

import (
	"fmt"
	"sort"
	"strconv"
)

func main() {
	var N, K int
	fmt.Scan(&N)
	fmt.Scan(&K)
	a := N
	for i := 0; i < K; i++ {
		a = f(a)
	}
	fmt.Printf("%d", a)
}

func f(x int) int {
	return g1(x) - g2(x)
}

func makeSortedIntSlice(input int) sort.IntSlice {
	var intSlice sort.IntSlice
	intSlice = make([]int, 0)
	str := strconv.Itoa(input)
	for _, r := range str {
		if r != '0' {
			intSlice = append(intSlice, int(r-'0'))
		}
	}
	intSlice.Sort()
	return intSlice
}

//小さい順
func g2(input int) int {
	intSlice := makeSortedIntSlice(input)

	var ret int = 0
	for _, i := range intSlice {
		ret *= 10
		ret += i
	}
	return ret
}

//大きい順
func g1(input int) int {
	intSlice := makeSortedIntSlice(input)
	for i, j := 0, len(intSlice)-1; i < j; i, j = i+1, j-1 {
		intSlice[i], intSlice[j] = intSlice[j], intSlice[i]
	}

	var ret int = 0
	for _, i := range intSlice {
		ret *= 10
		ret += i
	}
	return ret
}

package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	reader = bufio.NewReader(os.Stdin)
	writer = bufio.NewWriter(os.Stdout)
	defer writer.Flush()

	N := NextInt()
	K := NextInt()

	diceMaxes := scanIntSlice(N)    //さいころの最大値
	pileUpMaxes := make([]int, N+1) //i番目までのさいころの最大の目の和
	pile := 0
	pileUpMaxes[0] = 0
	for i, max := range diceMaxes {
		pile += max
		pileUpMaxes[i+1] = pile
	}

	//前からずらしながらK個の和を取って計算する
	sumMax := -1
	for start := 0; start <= N; start++ {
		end := start + K
		if end >= N+1 {
			break
		}

		tmp := pileUpMaxes[end] - pileUpMaxes[start]
		if tmp > sumMax {
			sumMax = tmp
		}
	}

	a := float64(sumMax+K) / 2.0
	print(a)
}

// ======================================
// I/O
// ======================================

var (
	reader *bufio.Reader
	writer *bufio.Writer
)

func init() {
	reader = bufio.NewReader(os.Stdin)
	writer = bufio.NewWriter(os.Stdout)
}

func print(a ...interface{}) {
	_, _ = fmt.Fprint(writer, a...)
}

func println(a ...interface{}) {
	_, _ = fmt.Fprintln(writer, a...)
}

func scan(a interface{}) {
	_, _ = fmt.Fscan(reader, a)
}

func NextInt() int {
	var res int
	scan(&res)
	return res
}

func NextInt64() int64 {
	var res int64
	scan(&res)
	return res
}

/**
 * １行に空白区切りで数字を読み込み
 */
func scanIntSlice(len int) (nums []int) {
	nums = make([]int, len)
	for i := 0; i < len; i++ {
		fmt.Scan(&nums[i])
	}
	return
}

func NextFloat64() float64 {
	var res float64
	scan(&res)
	return res
}

func NextString() string {
	var res string
	scan(&res)
	return res
}

func NextTwoDimensionalIntArray(x, y int) [][]int {
	s := make([][]int, x)
	for i := 0; i < x; i++ {
		s[i] = make([]int, y)
		for j := 0; j < y; j++ {
			s[i][j] = NextInt()
		}
	}
	return s
}

func Split(s string) []string {
	return strings.Split(s, "")
}

// ================================================
// Others
// ================================================

func toInt(s string) int {
	i, _ := strconv.Atoi(s)
	return i
}

func toString(i int) string {
	return strconv.Itoa(i)
}

func toIntSlice(s []string) []int {
	ss := make([]int, len(s))
	for i, v := range s {
		ss[i] = toInt(v)
	}
	return ss
}

func sliceToInt(s []int) int {
	ss := make([]string, len(s))
	for i, v := range s {
		ss[i] = toString(v)
	}
	return toInt(strings.Join(ss, ""))
}

func ascSort(s []int) []int {
	sort.Ints(s)
	return s
}

func descSort(s []int) []int {
	sort.Slice(s, func(i, j int) bool {
		return s[i] > s[j]
	})
	return s
}

func reverse(s []int) []int {
	l := len(s)
	ret := make([]int, l)
	for i := l - 1; i >= 0; i-- {
		ret[l-1-i] = s[i]
	}
	return ret
}

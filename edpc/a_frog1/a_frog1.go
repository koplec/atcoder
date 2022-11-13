package main

// あっていそうなんだけど、WPがでる。

import (
	"bufio"
	"fmt"
	"math/rand"
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
	//足場の高さ
	h := []int{0} //0番目は便宜上付けた
	tmp := scanIntSlice(N)
	h = append(h, tmp...)

	ans := frog(h, N)
	print(ans)

	// //答出力
	// println(ans)
	// for i := 0; i <= 10; i++ {
	// 	N := 5
	// 	h := genRandH(N)
	// 	ans := frog(h, N)
	// 	fmt.Printf("N:%d h:%v ans:%d\n", N, h, ans)
	// }
	// // NG N:5 h:[1 7 7 9 1 8] ans:3 -> 10
	// N := 5
	// h := []int{0, 1, 7, 7, 9, 1, 8}
	// ans := frog(h, N)
	// print(ans)

	// N := 100000
	// h := []int{0}
	// for i := 1; i <= N; i++ {
	// 	h = append(h, N-i)
	// }
	// ans := frog(h, N)
	// print(ans)
}

func genRandH(N int) []int {
	ret := make([]int, N+1)
	ret[0] = 0
	for i := 1; i <= N; i++ {
		ret[i] = rand.Intn(10)
	}
	return ret
}

func frog(h []int, N int) int {
	dp := make([]int, N+1)
	dp[1] = 0
	dp[2] = AbsInt(h[2] - h[1])
	for i := 3; i <= N; i++ {
		a := dp[i-1] + AbsInt(h[i]-h[i-1])
		b := dp[i-2] + AbsInt(h[i]-h[i-2])
		dp[i] = MinInt(a, b)
	}

	return dp[N]
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

//math

func AbsInt(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func MaxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func MinInt(a, b int) int {
	if a > b {
		return b
	}
	return a
}

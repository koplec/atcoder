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
	DEBUG = false
	defer writer.Flush()

	H := NextInt()
	W := NextInt()
	K := NextInt()
	// H := 2
	// W := 3
	// K := 2

	C := make([][]string, H+1)
	for i := 0; i <= H; i++ {
		C[i] = make([]string, W+1)
		for j := 0; j <= W; j++ {
			if i == 0 {
				C[i][j] = ""
			} else if j == 0 {
				C[i][j] = ""
			} else {
				C[i][j] = NextString()
			}
		}
	}

	// C := make([][]string, H+1)
	// for i := 0; i <= H; i++ {
	// 	C[i] = make([]string, W+1)
	// 	for j := 0; j <= W; j++ {
	// 		if j != 0 {
	// 			C[i][j] = "."
	// 		} else {
	// 			C[i][j] = ""
	// 		}
	// 	}
	// }
	// C[1][3] = "#"
	// C[2][1] = "#"
	// C[2][2] = "#"
	// C[2][3] = "#"

	var count int = 0

	var bits uint
	bits = 0
	bitsDigits := H + W
	for bits = 0; bits < 1<<uint64(bitsDigits); bits++ {
		debug("bits:%b\n", bits)
		c := CopyTwoDimensionalStringArray(C)
		hslice := []int{}
		wslice := []int{}
		//bitsに対応した、hとwを調べる
		for h := 0; h < H; h++ {
			//bitsのh番目の要素の状態がonかどうか確認
			if (bits>>uint64(h))&1 == 1 {
				for j := 1; j <= W; j++ {
					c[h+1][j] = "R"
				}
				hslice = append(hslice, h+1)
			}
		}
		for w := H; w < H+W; w++ {
			//bitsのH+w番目の要素の状態がonかどうか確認
			if (bits>>uint64(w))&1 == 1 {
				for i := 1; i <= H; i++ {
					c[i][w-H+1] = "R"
				}
				wslice = append(wslice, w-H+1)
			}
		}

		//残った黒色のマスを数える
		black := 0
		for i := 1; i <= H; i++ {
			for j := 1; j <= W; j++ {
				if c[i][j] == "#" {
					black++
				}
			}
		}
		//黒色のマスの数と等しいか確認
		if black == K {
			debug("H:%v W:%v\n", hslice, wslice)
			count++
		}
	}
	print(count)
}

// ======================================
// I/O
// ======================================

var (
	reader *bufio.Reader
	writer *bufio.Writer
	DEBUG  bool
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

func debug(format string, a ...interface{}) {
	if DEBUG {
		_, _ = fmt.Fprintf(writer, format, a...)
	}
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

func NextTwoDimensionalStringArray(x, y int) [][]string {
	s := make([][]string, x)
	for i := 0; i < x; i++ {
		s[i] = make([]string, y)
		for j := 0; j < y; j++ {
			s[i][j] = NextString()
		}
	}
	return s
}

func CopyTwoDimensionalStringArray(from [][]string) [][]string {
	H := len(from)
	from0 := from[0]
	W := len(from0)

	to := make([][]string, H)
	for i := 0; i < H; i++ {
		to[i] = make([]string, W)
		for j := 0; j < W; j++ {
			to[i][j] = from[i][j]
		}
	}
	return to
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

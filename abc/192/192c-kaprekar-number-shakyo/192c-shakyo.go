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

	n := NextInt()
	k := NextInt()

	g1 := func(x int) int {
		return sliceToInt(descSort(toIntSlice(Split(toString(x)))))
	}

	g2 := func(x int) int {
		s := ascSort(toIntSlice(Split(toString(x))))
		var ss []int
		for _, v := range s {
			if v != 0 {
				ss = append(ss, v)
			}
		}
		if len(ss) == 0 {
			return 0
		}
		return sliceToInt(ss)
	}

	f := func(x, k int) int {
		result := x
		for i := 0; i < k; i++ {
			result = g1(result) - g2(result)
			if result == 0 {
				return 0
			}
		}
		return result
	}

	println(f(n, k))

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

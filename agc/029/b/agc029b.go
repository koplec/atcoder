package main

import (
	"fmt"
	"math"
	"os"
)

func main() {

	var N int
	fmt.Scanf("%d", &N)

	a := scanNums(N)

	pairs := make([][2]int, 0)

	for i := 0; i < N; i++ {
		for j := i + 1; j < N; j++ {
			sum := a[i] + a[j]
			if isPow2(sum) {
				pair := [2]int{i, j}
				pairs = append(pairs, pair)
			}
		}
	}

	pairLen := len(pairs)
	permutations := genPermutation(pairLen)
	maxBallCount := 0
	var maxBallMap map[int]bool
	for _, p := range permutations {
		ballMap := make(map[int]bool)
		for _, i := range p {
			idx := i - 1
			apair := pairs[idx]
			a, b := apair[0], apair[1]
			//既に登録済みだったらカウントしない
			if _, ok := ballMap[a]; ok {
				continue
			}
			if _, ok := ballMap[b]; ok {
				continue
			}
			ballMap[a] = true
			ballMap[b] = true
		}
		ballCount := len(ballMap)
		if maxBallCount < ballCount {
			maxBallCount = ballCount
			maxBallMap = ballMap
		}
	}
	debug("ballMap -> %v\n", maxBallMap)
	fmt.Printf("%d\n", maxBallCount/2)
}

//n!個のpermutationを作る
func genPermutation(n int) [][]int {
	if n == 1 {
		ret := make([][]int, 0)
		ret = append(ret, []int{1})
		return ret
	} else {
		permutations := genPermutation(n - 1)
		ret := make([][]int, 0)
		for _, p1 := range permutations {
			for idx := 0; idx < n-1; idx++ {
				tmpp1 := make([]int, len(p1))
				copy(tmpp1, p1)
				p2 := make([]int, 0)
				p2 = append(p2, tmpp1[:idx]...)
				p2 = append(p2, n)
				p2 = append(p2, tmpp1[idx:]...)
				ret = append(ret, p2)
			}
			tmpp1 := make([]int, len(p1))
			copy(tmpp1, p1)
			p2 := make([]int, 0)
			p2 = append(p2, tmpp1...)
			p2 = append(p2, n)

			ret = append(ret, p2)
		}

		return ret
	}
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

func isPow2(n int) bool {
	t := math.Log2(float64(n))
	return (1 << uint64(t)) == uint64(n)
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

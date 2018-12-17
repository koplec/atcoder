package main

import (
	"fmt"
	"math"
	"os"
	"sort"
)

//解説動画を見て解きなおす
//大きい順にソートして、大きい数と2^tを作る数がないか調べる
//あったら、それをpairsに追加して、大きい数とその数を消す。
//空になるまで続ける。
func main() {

	var N int
	fmt.Scanf("%d", &N)
	nums := scanNums(N)
	fmt.Printf("%d\n", countPair(nums))

}

func countPair(nums []int) int {

	//大きい順に並べる
	sort.Sort(sort.Reverse(sort.IntSlice(nums)))

	//値からスライスのindexへアクセスするためのmap
	numIndex := make(map[int]int)
	for idx, num := range nums {
		numIndex[num] = idx
	}

	pairCount := 0
	maxIndex := 0
	for maxIndex < len(nums) {
		debug("nums = %v\n", nums)
		num0 := nums[maxIndex]
		if num0 < 0 { //すでにペアになって印がついている
			maxIndex++
			continue
		}
		pow2 := ceilPow2(num0)
		num1 := pow2 - num0
		debug("nums0=%d pow2=%d num1=%d\n", num0, pow2, num1)
		if numIndex, ok := numIndex[num1]; ok {
			if nums[numIndex] > 0 {
				debug("pair=(%d,%d)\n", num0, num1)
				pairCount++
				nums[numIndex] = -1 //一度ペアになったら印をつける
			}
		}
		nums[maxIndex] = -1 //念のためmaxIndexのところに-1を付けておく
		maxIndex++
	}
	return pairCount
}

/**
 * 引数で与えられた数以上の2の累乗数を求める
 */
func ceilPow2(n int) int {
	t := math.Log2(float64(n))
	pow2 := 1 << uint64(t)
	if n == pow2 {
		return n
	} else {
		return pow2 << 1
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

//** DEBUG **/
const DEBUG_ENABLE = false

func debug(format string, a ...interface{}) (n int, err error) {
	if DEBUG_ENABLE {
		return fmt.Fprintf(os.Stdout, format, a...)
	} else {
		return 0, nil
	}
}

package main

import (
	"fmt"
	"sort"
)

func main() {
	var num int
	var diameters []int

	fmt.Scanf("%d", &num)
	diameters = scanNums(num)
	//大きい順に並べる
	sort.Sort(sort.Reverse(sort.IntSlice(diameters)))

	count := 1
	currentDiameter := diameters[0]
	for i := 1; i < num; i++ {
		d := diameters[i]
		//fmt.Printf("d=%d\n", d)
		if currentDiameter > d {
			currentDiameter = d
			count++
		}
	}

	fmt.Printf("%d\n", count)
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

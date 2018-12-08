package main

import "fmt"

func main() {
	var N int
	fmt.Scan(&N)
	prices := scanNums(N)
	max := -100
	total := 0
	for _, p := range prices {
		if max < p {
			max = p
		}
		total += p
	}
	fmt.Printf("%d\n", total-max/2)
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

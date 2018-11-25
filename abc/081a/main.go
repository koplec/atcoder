package main

import (
	"fmt"
	"strconv"
)

func main() {
	var str string
	fmt.Scanf("%s", &str)

	total := 0
	for _, s := range str {
		n, _ := strconv.Atoi(string(s))
		total += n
	}
	fmt.Printf("%d\n", total)
	return
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

/**
 *
 */

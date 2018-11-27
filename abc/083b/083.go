package main

import (
	"fmt"
)

func main() {
	nums := scanNums(3)
	max_num := nums[0]
	a := nums[1]
	b := nums[2]

	total_sum := 0
	for n := 1; n <= max_num; n++ {

		sum := 0
		//各桁の数の和
		//これは時間がかかる
		/*
			n_as_str := fmt.Sprintf("%d", n)
			for _, let := range n_as_str {
				let_as_num, _ := strconv.Atoi(string(let))
				sum += let_as_num
			}
		*/
		//こっちがよさそう
		n_as_num := n
		for n_as_num > 0 {
			sum += n_as_num % 10 //1の位を足していく
			n_as_num /= 10
		}
		if sum >= a && sum <= b {
			//fmt.Printf("sum of %d -> %d\n", n, sum)
			total_sum += n
		}
	}
	fmt.Printf("%d\n", total_sum)
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

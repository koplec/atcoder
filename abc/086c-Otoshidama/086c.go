package main

import "fmt"

func main() {
	rets := scanNums(2)
	num := rets[0]
	yen := rets[1]

	a := yen - 1000*num
	for x := 0; x <= num; x++ {
		mol := a - 9000*x
		if mol >= 0 && (mol%4000 == 0) {
			y := mol / 4000
			z := num - (x + y)
			if z >= 0 {
				fmt.Printf("%d %d %d\n", x, y, z)
				return
			}
		}
	}
	fmt.Printf("%d %d %d\n", -1, -1, -1)

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

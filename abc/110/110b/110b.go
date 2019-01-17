package main

import "fmt"

func main() {
	var tmp []int
	tmp = scanNums(4)
	N := tmp[0]
	M := tmp[1]
	X := tmp[2]           //xの首都の座標
	Y := tmp[3]           //yの首都の座標
	xslice := scanNums(N) //xの領土の座標
	yslice := scanNums(M) //yの領土の座標

	fmt.Printf("%s\n", solve(X, Y, xslice, yslice))
}

func solve(X, Y int, xslice, yslice []int) string {
	xmin, xmax := searchMinMax(xslice)
	ymin, ymax := searchMinMax(yslice)

	if xmin <= ymin && ymin <= xmax {
		return "War"
	}
	if ymin <= xmin && xmin <= ymax {
		return "War"
	}

	if X < ymin && ymin <= Y {
		return "No War"
	}
	return "War"

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

func searchMinMax(nums []int) (int, int) {
	min := 10000
	max := -10000
	for _, n := range nums {
		if n > max {
			max = n
		}
		if n < min {
			min = n
		}
	}
	return min, max
}

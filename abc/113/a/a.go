package main


import "fmt"
func main(){
    nums := scanNums(2)
    x := nums[0]
    y := nums[1]

    fmt.Printf("%d\n", x + y/2)
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


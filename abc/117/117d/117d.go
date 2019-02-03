package main

import "fmt"
import "os"

func main(){
    var N, K int
    tmp := scanNums(2)
    N, K = tmp[0], tmp[1]
    
    nums := scanNums(N)

    //debug("%d\n", xor(3, 5)) -> 6
    //debug("%d\n", xor(7, 9)) -> 14
    sum, _ := solve(nums, K)
    //debug("sum = %d, maxK = %d\n", sum, maxK)
    fmt.Printf("%d\n", sum)

    
}

func solve(nums []int, K int) (int, int){
    max := -1
    maxK := -1
    for k:=0; k<=K; k++{
        total := 0
        for _, n := range nums {
            total += xor(k, n)
        }
        if total > max {
            maxK = k
            max = total
        }
    }
    return max, maxK
}

func xor(a, b int) int{
    return a ^ b
}


//** DEBUG **/
const DEBUG_ENABLE = true

func debug(format string, a ...interface{}) (n int, err error) {
	if DEBUG_ENABLE {
		return fmt.Fprintf(os.Stdout, format, a...)
	} else {
		return 0, nil
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

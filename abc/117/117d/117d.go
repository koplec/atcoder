package main

import "fmt"
import "os"
import "sort"
import "strconv"

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
    //numsをソート
    //最大の数
    sort.Sort(sort.Reverse(sort.IntSlice(nums)))
    maxNum := nums[0]
    //バイナリ表記にする
    //最大桁数を計算する
    maxNumBinStr := fmt.Sprintf("%b", maxNum)
    maxBinNum := len(maxNumBinStr)
    
    maxKStr := ""
    for bitPos := maxBinNum; bitPos >= 0; bitPos--{
        zeroNum := 0
        oneNum := 0
        for _, num := range nums{
            if refbit(num, bitPos) == 1{
                oneNum++
            }else{
                zeroNum++
            }
        }
        if oneNum > zeroNum {
            maxKStr += "0"
        }else{
            maxKStr += "1"
        }
    }
    
    max := -1
    maxK := -1
    for k:=0; k<=K; k++{
        total := f(k, nums)
        if total > max {
            maxK = k
            max = total
        }
    }
    return max, maxK
}

//任意のビット位置の値を参照する
func refbit(i int, b uint) int {
    return (i >> b) & 1
}

func f(x int, nums []int) int{
    total := 0
    for _, n := range nums {
        total += xor(x, n)
    }
    return total
}

//

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

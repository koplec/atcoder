package main

import "math"
import "fmt"

func main(){
    var num int
    var t, a int
    var h []int

    fmt.Scanf("%d", &num)
    var tmp = scanNums(2)
    t, a = tmp[0], tmp[1]
    h = scanNums(num)

    a_float64 := float64(a)

    diff := math.MaxFloat64
    
    target_i := -1
    for i:=0; i<num; i++{
        temp := float64(t) - float64(h[i])*0.006
        if math.Abs(temp-a_float64) < diff {
            target_i = i
            diff = math.Abs(temp - a_float64)
        }
    }
    fmt.Printf("%d\n", target_i+1)
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

func absint(x int) int{
    if x < 0{
        return -x
    }
    return x
}

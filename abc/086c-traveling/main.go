package main

import "fmt"

func main(){
    var num int
    fmt.Scanf("%d", &num)

    t := make([]int, num+1)
    x := make([]int, num+1)
    y := make([]int, num+1)

   
    for i:=1; i<=num; i++{
        nums := scanNums(3)
        t[i] = nums[0]
        x[i] = nums[1]
        y[i] = nums[2]
    }

    for i:=1; i<=num; i++{
        //距離
        d := absint(x[i] - x[i-1]) + absint(y[i] - y[i-1])
        ct := t[i] - t[i-1]
        if d > ct {
            fmt.Println("No")
            return
        }
        if d == ct {
            continue
        }
        if (d - ct) % 2 == 0{
            continue
        }else{
            fmt.Println("No")
            return            
        }
    }
    fmt.Println("Yes")
    return
}

func absint(x int) int{
    if x > 0 {
        return x
    }
    return -x
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

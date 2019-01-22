package main

import "fmt"

func main(){
    var N, K int
    var sushiTypes []int
    var delicious []int
    
    fmt.Scan(&N)
    fmt.Scan(&K)
    for i:=0; i<N; i++{
        tmp := scanNums(2)
        sushiTypes = append(sushiTypes,tmp[0])
        delicious = append(delicious, tmp[1])
    }
    
    fmt.Printf("%d\n", solve(sushiTypes, delicious, K, 1))
}

func solve(t, d []int, k, count int) int {
    if count == 1 {
        maxd := -100
        maxi := -1
        for i:=0; i<len(d); i++{
            if d[i] > maxd {
                maxd = d[i]
                maxi = i
            }
        }

        nextt := append(t[:maxi], t[maxi+1:]...)
        nextd := append(d[:maxi], d[maxi+1:]...)

        return maxd + solve(nextt, nextd, k, 2)
    }else{
        
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

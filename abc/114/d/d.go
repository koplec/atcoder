package main

import "fmt"
import "math"

func main(){
    var N int
    fmt.Scanf("%d", &N)
    
    allFactors := make(map[int]int) //N!の素因数分解
    for num := 2; num <=N; num++{
        factors := factoring(num)
        for k, v := range factors {
            _, ok := allFactors[k]
            if ok {
                allFactors[k] += v
            }else {
                allFactors[k] = v
            }
        }
    }

    //N!の約数(M)の約数の個数が75個になるのは、以下の4パターン
    //M=p^4q^4r^2 (5*5*3=75), p^24q^2 (25*3=75), p^4q^14 (5*15=75), p^74 (75)

    //N!の素因数分解の結果を使って、カウントする
    
    //約数の数
    //p^4q^4r^2の数
    
    for k, v := range allFactors {
        
    }
}


//階乗
func fact(num int) int {
    ret := 1
    for i:=2; i<=num; i++{
        ret *= i
    }
    return ret
}

//素因数分解
func factoring(num int) map[int]int {
    if num == 1 {
        return make(map[int]int)
    }
    ret := make(map[int]int)
    sqrt := int(math.Ceil(math.Sqrt(float64(num))))
    for p:=2; p<=sqrt; p++ {
        if num == 1 {
            break
        }
        if isPrime(p) {
            for num % p == 0{
                _, ok := ret[p]
                if ok {
                    ret[p] += 1
                }else {
                    ret[p] = 1
                }
                num = num / p
            }
        }
    }
    return ret
}


func isPrime(num int) bool {
    if num == 2 {
        return true
    }
    if num % 2 == 0{
        return false
    }
    sqrt := int(math.Ceil(math.Sqrt(float64(num))))
    for i:=3; i<=sqrt; i=i+2{
        if num % i == 0 {
            return false
        }
    }
    return true
}

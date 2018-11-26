package main

import "fmt"

func main(){
    //a:500yen b:100yen c:50yen
    var a, b, c, total int
    fmt.Scanf("%d", &a)
    fmt.Scanf("%d", &b)
    fmt.Scanf("%d", &c)
    fmt.Scanf("%d", &total) //目標金額

    count := 0 //場合の数
    for numa:=0; numa <= a; numa++ {
        if total < 500*numa {
            break
        }
        
        for numb :=0; numb<=b; numb++ {
            if total < 500*numa + 100*numb{
                break
            }
            for numc := 0; numc<=c; numc++{
                sum := 500*numa + 100*numb + 50 * numc
                //fmt.Printf("%d,%d,%d -> %d\n", numa, numb, numc, sum)
                if sum == total {
                    count++
                }
            }
        }
    }
    fmt.Printf("%d\n", count)
    
}

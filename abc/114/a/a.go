package main

import "fmt"

func main(){
    var num int
    fmt.Scanf("%d", &num)
    //fmt.Printf("num->%d", num) 
    if (num == 7) || (num == 5) || (num == 3){
        fmt.Println("YES")
    }else{
        fmt.Println("NO")
    }
}

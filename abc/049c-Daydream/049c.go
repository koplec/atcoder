package main

import "fmt"

const (
    DREAM = "dream"
    DREAMER = "dreamer"
    ERASE = "erase"
    ERASER = "eraser"
)

func main(){
    var str string
    fmt.Scanf("%s", &str)

    if (checkWords(str)){
        fmt.Println("YES")
    }else{
        fmt.Println("NO")
    }
}

func checkWords(s string) bool{
    len_s := len(s)
    if len_s == 0 {
        return true
    }else if len_s < 5{
        return false
    }else if len_s == 5{
        five := s[0:5]
        return five == DREAM || five == ERASE
    }else if len_s == 6 {
        six := s[0:6]
        return six == ERASER
    }else if len_s == 7{
        seven := s[0:7]
        return seven == DREAMER
    }else{
        return (checkWords(s[0:5]) && checkWords(s[5:])) || (checkWords(s[0:7]) && checkWords(s[7:])) || (checkWords(s[0:6]) && checkWords(s[6:]))
    }
}

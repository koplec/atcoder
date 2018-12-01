package main

import "fmt"
import "strings"
import "bufio"
import "os"

const (
    DREAM = "dream"
    DREAMER = "dreamer"
    ERASE = "erase"
    ERASER = "eraser"
)

func main(){
    var str string
    //長い文字列だと時間がかかる
    //fmt.Scanf("%s", &str)
    //こっちのほうが早い
    str, _ = readLine()
    if (checkWords(str)){
        fmt.Println("YES")
    }else{
        fmt.Println("NO")
    }
}


var rdr = bufio.NewReaderSize(os.Stdin, 100000)

func readLine() (string, error) {
    buf := make([]byte, 0, 100000)
    for {
        l, p, e := rdr.ReadLine()
        if e!=nil {
            return "", e
        }
        buf = append(buf, l...)
        if !p {
            break
        }
    }
    return string(buf), nil
}

/*
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
*/

//別解 末尾から長い単語の順番でtrimしていく
func checkWords(s string) bool {
    t := s
    for {
        s = strings.TrimSuffix(s, DREAMER)
        s = strings.TrimSuffix(s, ERASER)
        s = strings.TrimSuffix(s, ERASE)
        s = strings.TrimSuffix(s, DREAM)

        switch s {
        case ""://空になった
            return true
        case t://トリムできなかった
            return false
        }
        t = s
    }
    
}

package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	var N, X uint
	fmt.Scan(&N, &X)

	debug("X=%d\n", X)
	//時間がかかるので文字列を直接求めるのはダメ
	/*
		barger := makeBarger(N)
		debug("level:%d -> %s\n", N, barger)
	*/
	debug("length->%d\n", bargerLength(N))
	debug("all p num -> %d\n", countP(N))
	fmt.Printf("%d\n", eatP(N, X))
}

var bargers = make(map[uint]string)

//levelのハンバーガをしたからx枚食べた時のPの枚数
func eatP(level uint, x uint) uint {
	if level == 0 && x >= 1 {
		return 1
	}
	if x <= 1 {
		return 0
	}

	bargerLen := bargerLength(level)
	if x > bargerLen {
		return countP(level)
	}
	nextLen := bargerLength(level - 1)
	if x <= nextLen+1 {
		return eatP(level-1, x-1)
	} else if x == nextLen+2 {
		return eatP(level-1, x-1) + 1
	} else if x <= 2*nextLen+2 {
		return eatP(level-1, x-2-nextLen) + 1 + countP(level-1)
	} else {
		return 2*countP(level-1) + 1
	}

}

func bargerLength(level uint) uint {
	return 1<<(level+2) - 3
}

func countP(level uint) uint {
	return 1<<(level+1) - 1
}

func makeBarger(level uint) string {
	if barger, ok := bargers[level]; ok {
		return barger
	}
	if level == 0 {
		bargers[0] = "P"
		return bargers[0]
	} else {
		tmp := make([]string, 0)
		pBarger := makeBarger(level - 1)
		tmp = append(tmp, "B")
		tmp = append(tmp, pBarger)
		tmp = append(tmp, "P")
		tmp = append(tmp, pBarger)
		tmp = append(tmp, "B")
		bargers[level] = strings.Join(tmp, "")
		return bargers[level]
	}
}

//** DEBUG **/
const DEBUG_ENABLE = false

func debug(format string, a ...interface{}) (n int, err error) {
	if DEBUG_ENABLE {
		return fmt.Fprintf(os.Stdout, format, a...)
	} else {
		return 0, nil
	}
}

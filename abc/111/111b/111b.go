package main

import (
	"fmt"
	"strconv"
)

func main() {
	var n int
	fmt.Scan(&n)
	fmt.Printf("%d\n", foundNum(n))
}

func foundNum(start int) int {
	for i := start; i <= 999; i++ {
		str := strconv.Itoa(i)
		letters := []rune(str)
		first := letters[0]
		sameLetter := true
		for i, l := range letters {
			if i >= 1 {
				if l != first {
					sameLetter = false
					break
				}
			}
		}

		if sameLetter {
			return i
		}
	}

	return -1
}

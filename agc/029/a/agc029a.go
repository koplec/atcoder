package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	s, _ := readLine()
	fmt.Printf("%d\n", solve(s))
}

func solve(s string) int {
	count := 0
	blackCount := 0
	for _, l := range s {
		if string(l) == "B" {
			blackCount++
		} else {
			count += blackCount
		}
	}

	return count
}

var rdr = bufio.NewReaderSize(os.Stdin, 100000)

/**
 * 長い文字列はfmt.Scanfだと時間がかかる
 */
func readLine() (string, error) {
	buf := make([]byte, 0, 100000)
	for {
		l, p, e := rdr.ReadLine()
		if e != nil {
			return "", e
		}
		buf = append(buf, l...)
		if !p {
			break
		}
	}
	return string(buf), nil
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

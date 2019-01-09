package main

import (
	"fmt"
	"strings"
)

func main() {
	var num string
	fmt.Scan(&num)

	num = strings.Replace(num, "9", "A", -1)
	num = strings.Replace(num, "1", "9", -1)
	num = strings.Replace(num, "A", "1", -1)
	fmt.Printf("%s\n", num)
}

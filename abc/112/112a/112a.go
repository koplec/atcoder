package main

import "fmt"

func main() {
	var N int
	fmt.Scan(&N)

	if N == 1 {
		fmt.Printf("Hello World\n")
	}
	if N == 2 {
		var a, b int
		fmt.Scan(&a)
		fmt.Scan(&b)
		fmt.Printf("%d\n", a+b)
	}
}

package main

import "fmt"

func main() {
	var a, b int
	_, err := fmt.Scanf("%d", &a)
	if err != nil {
		panic(err)
	}
	_, err = fmt.Scanf("%d", &b)
	if err != nil {
		panic(err)
	}
	if a*b%2 == 0 {
		fmt.Printf("Even")
	} else {
		fmt.Printf("Odd")
	}
}

package main

import "fmt"

func main() {
	var d int
	fmt.Scan(&d)
	switch d {
	case 25:
		fmt.Println("Christmas")
	case 24:
		fmt.Println("Christmas Eve")
	case 23:
		fmt.Println("Christmas Eve Eve")
	case 22:
		fmt.Println("Christmas Eve Eve Eve")
	}
}

package main

import "fmt"

func main() {
	var a, b, c int
	var s string

	_, err := fmt.Scanf("%d", &a)
	if err != nil {
		panic(err)
	}

	_, err = fmt.Scanf("%d", &b)
	if err != nil {
		panic(err)
	}

	_, err = fmt.Scanf("%d", &c)
	if err != nil {
		panic(err)
	}

	_, err = fmt.Scanf("%s", &s)
	if err != nil {
		panic(err)
	}

	fmt.Printf("%d %s\n", a+b+c, s)

}

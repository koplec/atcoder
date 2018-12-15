package main

import "fmt"

func main() {
	var num int
	_, err := fmt.Scanf("%d", &num)
	if err != nil {
		panic(err)
	}

	nums := scanNums(num)
	count := 0
loop:
	for {
		for i := 0; i < num; i++ {
			n := nums[i]
			if n%2 != 0 {
				break loop
			} else {
				nums[i] = n / 2
			}
		}
		count++
	}
	fmt.Printf("%d\n", count)
}

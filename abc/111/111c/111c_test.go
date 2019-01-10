package main

//go testで動かす

import (
	"testing"
	"time"
)

func TestSolve(t *testing.T) {

	check(t, []int{1, 2}, 0)
	check(t, []int{1, 1}, 1)
	check(t, []int{1, 1, 2, 2}, 2)
	check(t, []int{1, 2, 1, 2, 1, 2}, 0)
	check(t, []int{1, 1, 1, 1}, 2)
	check(t, []int{1, 2, 3, 4}, 2)
	check(t, []int{3, 1, 3, 2}, 1)
	check(t, []int{105, 119, 105, 119, 105, 119}, 0)
	check(t, []int{12, 12, 12, 12, 12, 12}, 3)
	check(t, []int{12, 12, 12, 12, 12, 13}, 2)
	check(t, []int{1, 2, 3, 4, 5, 6}, 4)
	check(t, []int{1, 2, 2, 1, 2, 3}, 3)
	check(t, []int{1e+05, 1e+05, 1e+05, 1e+05, 1e+05, 1e+05}, 3)
	//長いもの

	a := []int{}
	for i := 0; i < 1e+05; i++ {
		a = append(a, i)
	}
	check(t, a, 1e+05-2)

}

func check(t *testing.T, v []int, ans int) {
	measureTime(func() error {
		ret := solve(v)
		if ans != ret {
			t.Fatalf("ans=%d but ret=%d", ans, ret)
		}
		return nil
	})
}

func measureTime(fn func() error) (time.Duration, error) {
	start := time.Now()
	err := fn()
	end := time.Now()
	duration := end.Sub(start)
	debug(" duration->%d msec\n", duration/time.Millisecond)
	return duration, err
}

package main

import (
	"errors"
	"testing"
)

func TestSolve(t *testing.T) {
	_testSolve(t,
		[]int{100, 0, 193},
		[]int{99, 1, 191}, []int{100, 1, 192}, []int{99, 0, 192})

	_testSolve(t,
		[]int{2, 2, 6},
		[]int{2, 3, 5}, []int{2, 1, 5}, []int{1, 2, 5}, []int{3, 2, 5})

	_testSolve(t,
		[]int{0, 0, 100},
		[]int{0, 0, 100}, []int{1, 1, 98})

	_testSolve(t,
		[]int{0, 1, 11},
		[]int{0, 0, 10}, []int{0, 2, 10}, []int{1, 1, 10})

	_testSolve(t,
		[]int{2, 2, 6},
		[]int{2, 3, 5}, []int{2, 1, 5}, []int{1, 2, 5}, []int{3, 1, 4}, []int{3, 3, 4})

	_testSolve(t,
		[]int{2, 2, 6},
		[]int{2, 3, 5}, []int{2, 1, 5}, []int{1, 2, 5}, []int{3, 1, 4}, []int{4, 3, 3})

	_testSolve(t,
		[]int{2, 2, 6},
		[]int{2, 3, 5}, []int{2, 1, 5}, []int{1, 2, 5}, []int{3, 1, 4})

	_testSolve(t,
		[]int{3, 2, 7},
		[]int{2, 3, 5}, []int{2, 1, 5}, []int{1, 2, 5}, []int{4, 1, 5})

	_testSolve(t,
		[]int{4, 1, 2},
		[]int{2, 0, 0}, []int{3, 0, 0}, []int{4, 0, 1}, []int{5, 0, 0}, []int{6, 0, 0},
		[]int{2, 1, 0}, []int{3, 1, 1}, []int{5, 1, 1}, []int{6, 1, 0}, []int{7, 1, 0},
		[]int{2, 2, 0}, []int{3, 2, 0}, []int{4, 2, 1}, []int{5, 2, 0}, []int{6, 2, 0})

}

func _testSolve(t *testing.T, center []int, pos ...[]int) ([]int, []int, error) {
	answer := solve(pos)
	if !sliceEq(answer, center) {
		err := errors.New("center is not correct")
		t.Fatalf("center -> %v, answer -> %v, err -> %v", answer, center, err)
		return answer, center, err
	} else {
		return answer, center, nil
	}
}

func sliceEq(a, b []int) bool {
	//debug("a = %v, b= %v\n", a, b)
	if (a == nil) != (b == nil) {
		return false
	}

	if len(a) != len(b) {
		return false
	}

	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}

	return true
}

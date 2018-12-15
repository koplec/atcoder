package main

import (
	"fmt"
	"math"
	"sort"
)

func main() {
	var num int
	var a []int
	fmt.Scanf("%d", &num)
	a = scanNums(num)
	/* 自分の解法
	mergeSort(a, 0, num-1)

	alice := 0
	bob := 0

	for i := num - 1; i >= 0; i = i - 2 {
		alice += a[i]
		if i-1 >= 0 {
			bob += a[i-1]
		}
	}
	fmt.Printf("%d\n", alice-bob)
	*/
	//sort packageがあるとか知らなかった。。。
	sort.Sort(sort.Reverse(sort.IntSlice(a)))

	alice := 0
	bob := 0
	for i := 0; i < num; i++ {
		if i%2 == 0 { //これはかしこい
			alice += a[i]
		} else {
			bob += a[i]
		}
	}
	fmt.Printf("%d\n", alice-bob)
}

/**
 * １行に空白区切りで数字を読み込み
 */
func scanNums(len int) (nums []int) {
	nums = make([]int, len)
	for i := 0; i < len; i++ {
		fmt.Scan(&nums[i])
	}
	return
}

/**
 * 配列aの中のindex p~rまでをソート
 */
func mergeSort(a []int, p, r int) {
	if p < r {
		q := (p + r) / 2
		mergeSort(a, p, q)
		mergeSort(a, q+1, r)
		merge(a, p, q, r)
	}
}

/**
 * 配列a
 * index p~(q-1), q~rの部分配列をmergeする
 */
func merge(a []int, p, q, r int) {
	n_1 := q - p + 1 //q - (p-1) pからqまでの要素数
	n_2 := r - q     //q+1からrまでの要素数
	left := make([]int, n_1+1)
	right := make([]int, n_2+1)
	for i := 0; i < n_1; i++ {
		left[i] = a[p+i]
	}
	left[n_1] = math.MaxInt32

	for j := 0; j < n_2; j++ {
		right[j] = a[q+j+1]
	}
	right[n_2] = math.MaxInt32

	i := 0
	j := 0
	for k := p; k <= r; k++ {
		if left[i] <= right[j] {
			a[k] = left[i]
			i = i + 1
		} else { //left[i] > right[j]
			a[k] = right[j]
			j = j + 1
		}
	}
}

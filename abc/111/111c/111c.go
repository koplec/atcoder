package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
)

func main() {
	var n int
	fmt.Scan(&n)

	v := scanNums(n)
	fmt.Printf("%d\n", solve(v))
}

type NumGroup struct {
	Count      map[int]NumGroupNum //それぞれのグループに属する数の個数
	SortedNums NumGroupNums        //グループに属する数をcountの大きい順に並べたもの
}
type NumGroupNum struct {
	Num   int
	Count int
}

func MinCount(numLength int, grpa, grpb *NumGroup) (minCount, minA, minB int) {
	minCount = -1
	minA = -1
	minB = -1

	numsA := grpa.SortedNums
	numsB := grpb.SortedNums
	for i := 0; i < numsA.Len(); i++ {
		numA := numsA[i]
	B:
		for j := 0; j < numsB.Len(); j++ {
			numB := numsB[j]
			if numA.Num == numB.Num {
				continue B
			} else {
				c := numLength - numA.Count - numB.Count
				if minCount < 0 {
					minCount = c
					minA = numA.Num
					minB = numB.Num
					return
				}
			}
		}
	}
	return
}

//sortのための実装
type NumGroupNums []NumGroupNum

func (a NumGroupNums) Len() int {
	return len(a)
}

func (a NumGroupNums) Swap(i, j int) {
	a[i], a[j] = a[j], a[i]
}

func (a NumGroupNums) Less(i, j int) bool {
	return a[i].Count < a[j].Count
}

func NewNumGroup(count map[int]int) *NumGroup {
	g := NumGroup{}
	gcnt := make(map[int]NumGroupNum)
	nums := make(NumGroupNums, 0)
	for k, v := range count {
		n := NumGroupNum{
			Num: k, Count: v,
		}
		gcnt[k] = n
		nums = append(nums, n)
	}
	g.Count = gcnt

	//sort
	sort.Sort(sort.Reverse(nums))
	g.SortedNums = nums

	return &g
}

//偶数個の要素をもつslice vについて
//v[i] = v[i+2], v[i]の数字の種類は2種類のみをみたすようにするとき、数を変えたいとき、
//最小の操作数を求める
//3 1 3 2 -> 1を2に変えるだけなので、1
//105 119 105 119 105 119 -> 1回も変える必要がないので0
//1 1 1 1 -> 1を2回変える必要があるので、2
func solve(v []int) (count int) {
	debug("#solve args->%v\n", v)
	n := len(v)
	half := n / 2
	seta := make(map[int]int)
	setb := make(map[int]int)
	//順番に分ける
	for i := 0; i < n; i = i + 2 {
		seta[v[i]] += 1
		setb[v[i+1]] += 1
	}

	grpa := NewNumGroup(seta)
	grpb := NewNumGroup(setb)

	//debug("seta=%v\n", seta)
	//debug("setb=%v\n", setb)

	//両方同じ数字
	if len(seta) == 1 && len(setb) == 1 {
		if v[0] == v[1] {
			count = half
			return
		} else {
			count = 0
			return
		}
	}

	minCount, minA, minB := MinCount(n, grpa, grpb)
	minCount1, minA1, minB1 := MinCount(n, grpb, grpa)

	if minCount < minCount1 {
		debug("0:a, b = %d %d\n", minA, minB)
		return minCount
	} else {
		debug("1:a, b = %d %d\n", minA1, minB1)
		return minCount1
	}
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

const DEBUG_ENABLE = false

func debug(format string, a ...interface{}) (n int, err error) {
	if DEBUG_ENABLE {
		return fmt.Fprintf(os.Stdout, format, a...)
	} else {
		return 0, nil
	}
}

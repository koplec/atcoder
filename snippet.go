package sort

import "math"

func bubbleSort(a []int) {
	flag := true //contains reversed elements
	n := len(a)
	for i := 0; flag; i++ {
		flag = false
		for j := n - 1; j >= i+1; j-- {
			if a[j-1] > a[j] {
				a[j], a[j-1] = a[j-1], a[j]
				flag = true
			}
		}
	}
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


//readLine
import "bufio"
var rdr = bufio.NewReaderSize(os.Stdin, 100000)

func readLine() (string, error) {
    buf := make([]byte, 0, 100000)
    for {
        l, p, e := rdr.ReadLine()
        if e!=nil {
            return "", e
        }
        buf = append(buf, l...)
        if !p {
            break
        }
    }
    return string(buf), nil
}

func fact(num int) int {
    ret := 1
    for i:=2; i<=num; i++{
        ret *= i
    }
    return ret
}

func factoring(num int) map[int]int {
    if num == 1 {
        return make(map[int]int)
    }
    ret := make(map[int]int)
    sqrt := int(math.Ceil(math.Sqrt(float64(num))))
    for p:=2; p<=sqrt; p++ {
        if num == 1 {
            break
        }
        if isPrime(p) && num % p == 0{
            _, ok := ret[p]
            if ok {
                ret[p] += 1
            }else {
                ret[p] = 1
            }
            num = num / p
        }
    }
    return ret
}



func isPrime(num int) bool {
    if num == 2 {
        return true
    }
    if num % 2 == 0{
        return false
    }
    sqrt := math.Ceil(math.Sqrt(float64(num)))
    for i:=3; i<=sqrt; i=i+2{
        if num % i == 0 {
            return false
        }
    }
    return true
}

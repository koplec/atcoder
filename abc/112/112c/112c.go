package main

import (
	"fmt"
	"os"
)

func main() {
	var num int
	var pos [][]int

	fmt.Scan(&num)
	for i := 0; i < num; i++ {
		p := scanNums(3)
		pos = append(pos, p)
	}

	debug("pos = %v\n", pos)
	c := solve(pos)
	debug("center = %v\n", c)
	fmt.Printf("%d %d %d\n", c[0], c[1], c[2])
}

/**
 * 総当たりで求める
 * pos = [x, y, h]のslice
 * 0 <= x, y <= 100
 * 0 <= h <= 1e+09
 */
func solve(pos [][]int) []int {
	//座標を整理
	//高さごとに分ける
	pointMap := make(map[int][][]int)
	for _, p := range pos {
		h := p[2]
		if _, ok := pointMap[h]; ok {
			pointMap[h] = append(pointMap[h], p)
		} else {
			pointMap[h] = make([][]int, 0)
			pointMap[h] = append(pointMap[h], p)
		}
	}
	debug("pointMap = %v\n", pointMap)

	var cx, cy, ch int
CX:
	for x := 0; x <= 100; x++ {
	CY:
		for y := 0; y <= 100; y++ {
			//中心の候補
			//debug("(x,y) = (%d,%d)\n", x, y)
			//等しい高さの座標と中心との距離を測り矛盾がないか確認
			for h, pary := range pointMap {
				if h > 0 {
					p0 := pary[0]
					px := p0[0]
					py := p0[1]
					d0 := absInt(px-x) + absInt(py-y)
					for i, p := range pary {
						if i == 0 {
							continue
						} else {
							px = p[0]
							py = p[1]
							d := absInt(px-x) + absInt(py-y)
							if d0 != d { //矛盾する座標があった(中心への距離が等しくない）ので、中心とはいえない
								continue CY
							}
						}
					}
				}
			}
			//debug("center:(%d, %d)\n", x, y)
			//debug("check distance between points with same height:OK\n")

			//h>0の座標から中心の高さを推定
			//全ての座標からの高さが等しいか確認
			//矛盾があったら中心の推定やり直し
			ch = -10 //初期値
			for _, p := range pos {
				px := p[0]
				py := p[1]
				ph := p[2]
				if ph > 0 {
					d := absInt(px-x) + absInt(py-y)
					if ch < 0 {
						ch = d + ph
						//debug(" estimating center -> height ch=%d\n", ch)
					} else if ch != d+ph {
						//debug(" estimating center failed -> height ch:%d != %d\n", ch, d+ph)
						continue CY //推定やり直し
					}
				}
			}
			debug("estimate center height:OK ch=%d\n", ch)

			//h=0の座標との確認
			if points, ok := pointMap[0]; ok {
				for _, p := range points {
					px := p[0]
					py := p[1]
					d := absInt(px-x) + absInt(py-y)
					if ch > d { //h=0の座標の定義から矛盾
						continue CY
					}
				}
			}

			//問題なし。
			cx = x
			cy = y
			break CX
		}
	}
	return []int{cx, cy, ch}
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

//** DEBUG **/
const DEBUG_ENABLE = false

func debug(format string, a ...interface{}) (n int, err error) {
	if DEBUG_ENABLE {
		return fmt.Fprintf(os.Stdout, format, a...)
	} else {
		return 0, nil
	}
}

func absInt(a int) int {
	if a >= 0 {
		return a
	} else {
		return -a
	}
}

//模範解答を写経
package main

import "fmt"

const MOD = 1e9 + 7

var h, w, k int //h:あみだくじの横線の本数 w:あみだくじの縦線の本数 k:あみだくじを1からスタートしたときの目的の箇所
var dp [][]int

func main() {
	fmt.Scan(&h, &w, &k)
	//あみだくじ縦1本線の時は、k==1以外は答え無し
	if w == 1 {
		if k == 1 {
			fmt.Println(1)
		} else {
			fmt.Println(0)
		}
		return
	}

	//(h+1,w)の形の配列(行列？）を作成する
	//dp[i][j] -> i番目の横線を通過した後に、j番目の縦線にいる数
	dp = make([][]int, h+1)
	for i := range dp {
		dp[i] = make([]int, w)
	}
	//0番目の横線を通過(スタート)時に、0番目の縦線には必ず1つデータがあるはず
	dp[0][0] = 1

	for i := 0; i < h; i++ {
		for j := 0; j < w; j++ {
			//bit表現
			//k0=0,k1=01,k2=10,k3=11
			//k0:1本も横線なし
			//k1:1本横線あり
			//k2:1本横線あり
			//k3:2本となりあう横線あり
			for k := 0; k < 1<<uint64(w-1); k++ {
				//i番目の横線がある場合の数
				//2^(w-1)個の場合の数がある隣り合う
				//2つの線がつながっていないか調べる
				ok := true
				for l := 0; l < w-2; l++ {
					//l:0~w-2, l+1:1~w-1
					if ((k>>uint64(l))&1 == 1) && ((k>>uint64(l+1))&1 == 1) {
						//隣り合うときは無視
						ok = false
						break
					}
				}
				//ここまできたらkの値だけを見ると、i番目の高さの横線の1パターンが決まる
				if ok {
					//左方向に横線があるとき
					//j番目の縦線は1以上
					if j >= 1 && ((k >> uint64(j-1) & 1) == 1) {
						dp[i+1][j-1] += dp[i][j]
						dp[i+1][j-1] %= MOD
					} else if j <= w-2 && ((k>>uint64(j))&1 == 1) { //右方向に横線があるとき
						dp[i+1][j+1] += dp[i][j]
						dp[i+1][j+1] %= MOD
					} else {
						//横線に行かないとき
						dp[i+1][j] += dp[i][j]
						dp[i+1][j] %= MOD
					}

				}
			}
		}
	}

	fmt.Printf("%d\n", dp[h][k-1])
	return
}

// 連鎖行列式で掛け算の回数を小さくするには
// O(N^3)
#include <iostream>
#include <algorithm>

using namespace std;

static const int N = 100;

int main(int argc, char const *argv[])
{
    int n; //行列の数
    int p[N+1]; //行列の要素数を表す　M_i = p[i-1] x p[i]の行列 (i=1からカウント)

    //m[i][j] = M_i M_(i+1) ... M_j をかけた時の最小となる掛け算の数の計算 dp
    //このことからi<jをみたさないときは計算に含めないようにしたい
    int m[N+1][N+1]; 

    cin >> n;
    for(int i=1; i<=n; i++){
        cin >> p[i-1] >> p[i];
    }

    m[0][0] = 0;
    for(int i=1; i<=n; i++){
        m[i][i] = 0;
    }

    //掛け算に含む行列数を2からnまでふやす
    //l=2のときは、M_1 M_2, M_2 M_3, ... を計算
    //l=3のときは、M_1 M_2 M_3, M_2 M_3 M_4を計
    for(int l=2; l<=n; l++){
        for(int i=1; i<=n-1; i++){//
            int j = i+l-1;
            m[i][j] = (1 << 21); //初期値として大きな数値をおいているだけ　なんでもいい
            for(int k=i; k<=j-1; k++){//k=i+1では？ kをどんどん動かす
                m[i][j] = min(m[i][j], m[i][k] + m[k+1][j] + p[i-1]*p[k] * p[j]);
                //M_i M_(i+1) ... M_k と M_(k+1)...M_jと それらの行列掛け算
            }
        }
    }

    cout << m[1][n] << endl;

    return 0;
}

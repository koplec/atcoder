#include <iostream>
using namespace std;

//入力
long long mod = 1000000007;
long long N, K, B;
//  1 <= K <= 9
//  1 <= N <= 10^18
//  2 <= B <= 1000

long long C[11];//K個しかないはずで0はいらないから11は多すぎじゃない？

//その他の変数
// N<=10000, B<=30の制限から配列の形の大きさが決まる
// 10009 x 33 は適当にしているの？？？
long long dp[10009][33];

//

int main(int argc, char const *argv[])
{
    //入力
    cin >> N >> B >> K;
    for(int i=1; i<=K; i++) cin >> C[i];

    //動的計画法
    //0桁目で余りが0になる数字の数
    //どういう意味だろう？
    //0 / B = 0 ... 0だから0がある
    dp[0][0] = 1;
    //dp[0][i!=0] = 0になるのも注意
    
    //dpの初期化いらない？
    for (int i = 0; i < N; i++){
        for (int j = 0; j < B; j++){
            for(int k=1; k <=K ; k++){
                //i=0の一桁目の時
                //dp[1][next] += dp[0][j]
                int next = (10*j + C[k]) % B; //iがどんな値でも（つまり何桁目でも nextは同じ値になる）
                dp[i+1][next] += dp[i][j];
                dp[i+1][next] %= mod;
            }
        }
    }

    //output
    cout << dp[N][0] << endl;


    return 0;
}

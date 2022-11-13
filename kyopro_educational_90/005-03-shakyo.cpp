#include <iostream>
using namespace std;

/**
 * @brief 累乗（a^b)をmで割ったときの余りを求めている？
 * 
 * https://tacos.hatenadiary.jp/entry/2020/06/04/001512
 * https://qiita.com/drken/items/3b4fdf0a78e7a138cd9a#4-%E7%B4%AF%E4%B9%97-an
 * 
 * @param a 
 * @param b 
 * @param m 
 * @return long long 
 */
long long modpow(long long a, long long b , long long m){
    long long p = 1, q = a;
    for ( int i=0; i<63; i++){
        if((b & (1LL < i)) != 0){ //bに2^iが含まれるか 
            p *= q;
            q %= m;
        }
        q *= q;
        q %= m;
    }   
    return p;
}

const long long mod = 1000000007;

// input 
// 1 <= K <= 0
// 1 <= N <= 10^18
// 2 <= B <= 1000
long long N, B, K;
long long C[11];

// その他の変数
long long power10[64];
long long DP[64][1009];
long long Answer[64][1009];

int main(int argc, char const *argv[])
{
    //Step 1. input 
    cin >>N >> B >> K;
    for(int i=1; i<=K ; i++) cin >> C[i];

    //Step 2. pre calc
    //2^0から2^62まで計算する
    for (int i=0; i<=62; i++){
        power10[i] = modpow(10LL, (1LL<< i), B);
    }   

    //Step 3. calc dp[0][i]
    for(int i=1; i<=K; i++){
        DP[0][C[i]%B] += 1;
    }

    //Step 4. dp[1][i], dp[2][i], ..., dp[2^n][i]を求める
    for(int i=0; i<62; i++){
        for(int j=0; j<B; j++){
            for(int k=0; k<B; k++){
                int nex = (j * power10[i] + k ) % B;
                DP[i+1][nex] += DP[i][j] * DP[i][k];
                DP[i+1][nex] %= mod;
            }
        }
    }

    //Step5 繰り返し二乗法により、dp[N][i]を求める
    Answer[0][0] = 1;
    for(int i=0; i<62; i++){
        if((N & (1LL << i)) != 0LL){
            for(int j=0; j<B; j++){
                for(int k=0; k<B; k++){
                    int nex = (j * power10[i] + k ) % B;
                    Answer[i+1][nex] += Answer[i][j] * DP[i][k];
                    Answer[i+1][nex] %= mod;
                }
            }
        }else{
            for(int j=0; j<B; j++) Answer[i+1][j] = Answer[i][j];
        }
    }

    //Step6 output 
    cout << Answer[62][0] << endl;

    return 0;
}

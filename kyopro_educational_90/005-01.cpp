#include <iostream>
#include <vector>
#include <set>

using ll = long long;

using namespace std;

int main(int argc, char const *argv[])
{
    //N桁の数のうちBの倍数はいくつか
    //10^9 + 7で求めた余りを求めよ

    //N ~ 10^8まで大きくなる
    //B ~ 1000
    //1 <= K <= 9
    int N, B, K;
    cin >> N >> B >> K;

    vector<int> c;
    for(int i=0; i<K; i++){
        int a;
        cin >> a;
        c.push_back(a);
    }

    vector<vector<int>> dp;
    //0桁目
    vector<int> mod0;
    for(int j=0; j<B; j++){
        mod0.push_back(0);
    }
    dp.push_back(mod0);
    //1桁目
    vector<int> mod1; 
    for(int j=0; j<B; j++){
        mod1.push_back(0);
    }
    ////1桁目の余りを計算する
    for(int i=0; i<c.size(); i++){
        int rem = c.at(i) % B;
        mod1.at(rem)++; //余りがremである数をカウント
    }
    dp.push_back(mod1);

    //2桁目以降
    for(int i=2; i<=N; i++){
        vector<int> mod;
        vector<int> pre = dp.at(i-1);
        //初期化
        for(int j=0; j<B; j++){
            mod.push_back(0);
        }
        
        for(int j=0; j<B; j++){
            for(int idx = 0; idx<c.size(); idx++){
                int next = (10*j + c.at(idx) ) % B;
                mod.at(next) += pre.at(j); 
                mod.at(next) %= 1000000007;
                //これ必要なのか？最後に計算してもいいと思うけど、そしたら答が合わない
            }
        }
        dp.push_back(mod);
    }

    //N桁目で、余りが0の値を出す
    cout << dp.at(N).at(0)  << endl;
}

#include <iostream>
#include <vector>

using ll = long long;

using namespace std;

/**
 * @brief N桁の数をvector<int>cから生成する
 * K個の要素からなるcを見ながら、N桁の数を精製しないといけない
 * K^Nの場合の数がある
 * 
 * @param c 
 * @param N 
 * @return ll 
 */
vector<ll> genNum(vector<int> c, int N){
    vector<ll> ret;
    if(N==1){
        for(int i=0; i<c.size(); i++){
            ret.push_back(c.at(i));
        }
        return ret;
    }
    vector<ll> ret1 = genNum(c, N-1);
    for(auto num : ret1){
        for(int i=0; i<c.size(); i++){
            ret.push_back(num*10+ c.at(i));
        }
    }

    return ret;
}

int countFilter(vector<int> c, int N, int B){
    int count = 0;
    if(N==1){
        for(int i=0; i<c.size(); i++){
            if(c.at(i) % B == 0){
                count++;
            }
        }
        return count;
    }
    vector<ll> ret1 = genNum(c, N-1);
    for(auto num : ret1){
        for(int i=0; i<c.size(); i++){
            ll a = num*10+ c.at(i);
            if(a % B == 0){
                count++;
            }
        }
    }
    return count;
}

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

    // naive implementation
    //1. N桁の数を生成
    //2. Bで割れるか試して、カウント
    //3. 答を10^9+7でわって余りを出す 
    // int count = 0;
    // vector<ll> nums = genNum(c, N);
    // for(auto l : nums){
    //     // cout << l << endl;
    //     if(l % B == 0) count++;
    // }
    int count = countFilter(c, N, B);
    cout << count % 1000000008 << endl;
    return 0;
}

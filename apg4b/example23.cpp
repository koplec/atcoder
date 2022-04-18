#include <bits/stdc++.h>
using namespace std;

int main(int argc, char const *argv[])
{
    int N, K;
    cin >> N >> K;
    vector<int> A(N);
    for (int i=0; i<N; i++){
        cin >> A.at(i);
    }

    bool ans = false;
    for(int tmp = 0; tmp < (1 << 20); tmp++){
        bitset<20> s(tmp);

        //ビット列の1のビットに対応する整数を選んだとみなして総和を求める
        int sum = 0;
        for(int i=0; i<N; i++){
            if(s.test(i)){
                sum += A.at(i);
            }
        }
        if(sum == K){
            ans = true;
        }
    }

    if(ans){
        cout << "YES" << endl;
    }else{
        cout << "NO" << endl;
    }


    return 0;
}

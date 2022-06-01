#include <iostream>
using namespace std;

using ll = long long;

ll N, K, L;
ll A[1<<18];

//大きさM以上の大きさでようかんを切り分ける
//ようかんの数がK個以上だったらtrue
bool solve(ll M){
    ll cnt = 0, pre = 0; //A[0] = 0 = 左端と思う
    for(int i=1; i<=N; i++){
        if(A[i] - pre >= M && L - A[i] >= M){
            cnt += 1;
            pre = A[i];
        }
    }
    //cnt　ようかんの数
    if(cnt >= K) {
        return true;
    }
    return false;
}

int main(){
    //Step #1 
    cin >> N >> L;
    cin >> K;
    for(int i=1; i<=N ; i++){
        cin >> A[i];
    }

    //Step #2 答で二分探索  
    ll left = 0; //-1
    ll right = L; //L+1 なぜ
    while(right - left > 1){
        ll mid = left + (right - left) / 2;

        //solve(mid)=false
        //ようかんの数が少なかった
        //もう少し小さく切らないと次のmidを小さくする
        if(solve(mid) == false) right = mid;
        //ようかんの数が多かった、もう少し大きく切るので、left=midで大きくする
        else left = mid;
    }
    cout << left << endl;
    return 0;

}
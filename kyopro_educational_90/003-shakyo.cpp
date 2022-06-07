#include <iostream>
#include <vector>
#include <queue>
using namespace std;

//入力
int N; //3 <= N <= 100000
int A[1<<18], B[1<<18]; //2^18 = 262144

//graph
const int INF = (1<<29); //(2^18)^2 ~ 2^36?
vector<int> G[1<<18]; //vectorの配列 i番目にはi番からのneighborsが入る
int dist[1<<18];

void getdist(int start){
    //幅優先探索（BFS)により、最短距離を計算
    for(int i=1; i <= N; i++) dist[i] = INF; //初期化

    queue<int> Q;
    Q.push(start);
    dist[start] = 0;

    while(!Q.empty()){
        int pos = Q.front();
        Q.pop();
        for(int to : G[pos]){//posからの行き先を確認
            if(dist[to] == INF){//INFのときはまだ距離を測っていない //最短距離　最長距離は求めない

                dist[to] = dist[pos] + 1;
                Q.push(to);
            }
        }
    }
}

int main(){
    //Step #1. input
    cin >> N;
    for(int i=1; i<=N-1 ; i++){
        cin >> A[i] >> B[i];
        G[A[i]].push_back(B[i]);
        G[B[i]].push_back(A[i]);
    }

    //Step #2 頂点1からの最短距離を求める
    //maxid1: 頂点1からもっとも離れている（最短距離が長い）頂点
    getdist(1);
    int maxn1 = -1, maxid1 = -1;
    for(int i=1; i<=N; i++){
        if(maxn1 < dist[i]){
            maxn1 = dist[i];
            maxid1 = i;
        }
    }

    //Step #3 頂点maxid1からの最短距離を求める
    getdist(maxid1);
    int maxn2 = -1;
    for (int i = 1; i <= N; i++)
    {
        maxn2 = max(maxn2, dist[i]);
    }

    //Step #4 output 
    //1本線を結ぶ
    cout << maxn2 + 1 << endl;
    return 0;
    
}
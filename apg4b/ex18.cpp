#include <bits/stdc++.h>
using namespace std;

int main()
{
    int N, M;
    cin >> N >> M;
    vector<int> A(M), B(M);
    for (int i = 0; i < M; i++)
    {
        cin >> A.at(i) >> B.at(i);
    }

    // ここにプログラムを追記
    // (ここで"試合結果の表"の2次元配列を宣言)
    // NxN
    vector<vector<char>> games(N, vector<char>(N));
    //初期化
    for(int i=0; i<N; i++){
        for(int j=0; j<N; j++){
            games.at(i).at(j) = '-';
        }
    }

    //試合確認
    for(int i=0; i<M; i++){
        int win = A.at(i)-1;
        int lose = B.at(i)-1;
        games.at(win).at(lose) = 'o';
        games.at(lose).at(win) = 'x';
    }

    //print
    for(int i=0; i<N; i++){
        for(int j=0; j<N; j++){
            cout << games.at(i).at(j);
            if( j!=N-1){
                cout << ' ';
            }
        }
        cout << endl;
    }


}
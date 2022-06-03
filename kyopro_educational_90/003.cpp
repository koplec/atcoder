#include <iostream>
#include <vector>
#include <cassert>

using namespace std;


void printD(vector<vector<int>> D){
    for(int i=1; i<D.size(); i++){
        vector<int> a = D[i];
        for(int j=1; j<a.size(); j++){
            cout << a[j] << " ";
        }
        cout << "\n";
    }
}

int main(){
    int N;
    cin >> N;

    vector<vector<int>> D(N+1, vector<int>(N+1));
    vector<vector<bool>> CHECK(N+1, vector<bool>(N+1));

    for(int i=1; i<=N; i++){
        for(int j=1; j<=N; j++){
            D[i][j] = -1;
            CHECK[i][j] = false;
        }    
    }

    int a, b;
    for(int i=1; i<=N-1; i++){
        cin >> a >> b;
        D[a][b] = 1;
        D[b][a] = 1;
    }

    for(int i=1; i<=N; i++){
        //つながっているところを探す
        for(int j=1; j<=N; j++){
            if(i == j) continue;
            assert(i != j);
            if(D[i][j] == 1){
                for(int k=1; k<=N; k++){
                    if(j == k || k == i) continue;
                    if(D[j][k] == 1){
                        D[i][k] = D[i][j] + D[j][k];
                    }
                }
            }
        }
    }
    printD(D);

    return 0;
}
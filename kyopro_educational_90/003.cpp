#include <iostream>
#include <vector>
#include <cassert>
#include <map>
#include <set>

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

    map<int, set<int>> neighbors;

    int a, b;
    for(int i=1; i<=N-1; i++){
        cin >> a >> b;
        
        if(neighbors.count(a)){
            neighbors[a].insert(b);
        }else{
            set<int> nexts;
            nexts.insert(b);
            neighbors[a] = nexts;
        }
        
        if(neighbors.count(b)){
            neighbors[b].insert(a);
        }else{
            set<int> nexts;
            nexts.insert(a);
            neighbors[b] = nexts;
        }
    }

    vector<vector<int>> D(N+1, vector<int>(N+1));
    vector<vector<bool>> CHECK(N+1, vector<bool>(N+1));
    for(int i=1; i<=N; i++){
        for(int j=1; j<=N; j++){
            D[i][j] = -1;
            CHECK[i][j] = false;
        }    
    }


    for(int i=1; i<=N; i++){
        //つながっているところを探す
        set<int> nexts = neighbors[i];
        for(const int &next : nexts){
            
        }
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
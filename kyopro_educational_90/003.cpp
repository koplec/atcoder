#include <iostream>
#include <vector>
#include <cassert>
#include <map>
#include <set>

using namespace std;


void printD(vector<vector<int>> D){
    cout << "D size:" << D.size() << endl;
    cout << "-------" << endl;
    for(int i=1; i<D.size(); i++){
        vector<int> a = D[i];
        for(int j=1; j<a.size(); j++){
            cout << a[j] << " ";
        }
        cout << "\n";
    }
}

map<int, int> measure(int start, map<int, set<int>> neighbors, set<int> passed){
    set<int> nexts = neighbors[start];
    map<int, int> ret;
    ret[start] = 0;
    passed.insert(start);
    for(int next : nexts ){
        if(passed.count(next)) continue;
        map<int, int> nextRet = measure(next, neighbors, passed);
        for(auto it : nextRet){
            int point = it.first;
            int d = it.second + 1;
            if(ret.count(point)){
                if(ret[point] < d){
                    ret[point] = d;
                }
            }else{
                ret[point] = d;
            }
        }
    }
    return ret;
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

    //つながっているところを探す
    for(int start=1; start<=N; start++){
        set<int> passed;
        map<int, int> ret = measure(start, neighbors, passed);
        for(auto it : ret){
            int point = it.first;
            int d = it.second;
            D[start][point] = d;
        }
    }
    // printD(D);

    //どこをつなげばいいかを考える
    int imax, jmax;
    int max = -1;
    for(int i=1; i<=N; i++){
        for(int j=1; j<=N; j++){
            if(D[i][j] > max){
                imax = i;
                jmax = j;
                max = D[i][j];
            }
        }
    }
    cout << max + 1 << endl;
    return 0;
}
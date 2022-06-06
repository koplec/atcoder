// 直径は最短距離計算を2回やる
// TLE 再帰がダメ？
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

/**
 * @brief startから各点に到達する点を計算
 * 
 * @param start 
 * @param neighbors 地図に対応した各点がどこにつながっているかを示した
 * @param passed すでに訪れた点
 * @return map<int, int> 
 */
map<int, int> measure(int start, map<int, set<int>> &neighbors, set<int> passed){
    // passedを値渡しにすることで、複数のnext経由の経路を独立に計算する
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


    //つながっているところを探す
    int max = -1;
    
    int maxPoint = -1; //最大長になる点
    int start = 1; //スタート
    
    set<int> passed;
    map<int, int> ret = measure(start, neighbors, passed);
    for(auto it : ret){
        int point = it.first;
        int d = it.second;
        // D[start][point] = d;
        if(max < d){
            maxPoint = point;
            max = d;
        }
    }

    //2回目の探索
    //最大長になる点から探す
    map<int, int> ret2 = measure(maxPoint, neighbors, passed);
    max = -1;
    for(auto it : ret2){
        int point = it.first;
        int d = it.second;
        // D[start][point] = d;
        if(max < d){
            max = d;
        }
    }
    // printD(D);

    cout << max + 1 << endl;
    return 0;
}
#include <bits/stdc++.h>
using namespace std;

//昇順
bool compare_by_b(pair<int, int> a, pair<int, int> b){
    if(a.second != b.second){
        return a.second < b.second;
    }else{
        return a.first < b.first;
    }
}

int main(){
    //input
    int N; 
    cin >> N;
    vector<pair<int, int>> pairs(N);
    for(int i=0; i<N; i++){
        int a, b;
        cin >> a >> b;
        pairs.at(i) = make_pair(a,b);
    }

    //sort
    sort(pairs.begin(), pairs.end(), compare_by_b);
    for(int i=0; i<pairs.size(); i++){
        auto p = pairs.at(i);
        cout << p.first << " " << p.second << endl;
    }
}
#include <bits/stdc++.h>
using namespace std;

int main(){
    vector<int> data(5);
    for(int i=0; i<5; i++){
        cin >> data.at(i);
    }

    for(int i=0; i<data.size() -1; i++){
        int a = data.at(i);
        int b = data.at(i+1);
        if(a == b){
            cout << "YES" << endl;
            return(0);
        }
    }
    cout << "NO" << endl;
    return(0);
 }
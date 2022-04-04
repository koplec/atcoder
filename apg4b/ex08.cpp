#include <bits/stdc++.h>
using namespace std;

int main (){
    int p;
    string text;
    int price;
    int N;

    cin >> p;

    //pattern 1 
    if (p == 1){
        cin >> price;
    }
    //pattern 2 
    if (p == 2){
        cin >> text >> price;
    }

    cin >> N;

    if( p == 2){
        cout << text << "!" << endl;
    }
    cout << price * N << endl;
}
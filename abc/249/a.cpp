#include <iostream>
using namespace std;


int dist(int walkSec, int walkSpeed, int restSec, int totalSec){
    int walkCount = totalSec / (walkSec + restSec);
    int remainSec = totalSec % (walkSec + restSec);
    if(remainSec <= walkSec){
        return walkSpeed * (walkSec*walkCount + remainSec);
    }else{
        return walkSpeed * (walkSec*walkCount + walkSec);
    }
}

int main(){
    int A, B, C, D, E, F, X;
    
    cin >> A >> B  >> C >> D >> E >> F >> X;

    //高橋
    int taka = dist(A, B, C, X);
    int aoki = dist(D, E, F, X);
    
    // cout << "taka:" << taka << endl;
    // cout << "aoki:" << aoki << endl;
    if(taka > aoki){
        cout << "Takahashi" << endl;
        return 0;
    }
    if(taka < aoki){
        cout << "Aoki" << endl;
        return 0;
    }
    cout << "Draw" << endl;
}
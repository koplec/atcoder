#include <iostream>
#include <vector>
using namespace std;

void outputVector(vector<int> &a){
    for(int i=0; i<a.size(); i++){
        cout << a.at(i);
        if(i<a.size()-1) cout << " ";
    }
    cout << endl;
}

// stable-sort
void bubbleSort(vector<int> &a){
    int n = a.size();
    int flag = 1;
    while(flag){ //交換停止するまで頑張る
        flag = 0; //一度でも交換したら、flag = 1になる
        for(int j=n-1; j>=1; j--){ //データが良くてもループは回る
            //a[j-1] < a[j]を満たすようにflip 
            //配列の右のほうから浮かんでくる
            if(a.at(j) < a.at(j-1)){  
                int v = a.at(j);
                a.at(j) = a.at(j-1);
                a.at(j-1) = v;
                flag = 1;
            }
        }
        outputVector(a);
    }
}

int main(){
    int N;
    cin >> N;
    vector<int> A(N);

    for(int i=0; i<N; i++){
        cin >> A.at(i);
    }

    outputVector(A);
    bubbleSort(A);
}
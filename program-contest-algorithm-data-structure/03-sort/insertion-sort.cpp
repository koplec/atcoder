#include <iostream>
#include <vector>

using namespace std;

void outputVector(vector<int> &a){
    for(int i=0; i<a.size(); i++){
        cout << a.at(i) << " ";
    }
    cout << endl;
}

//綺麗に並んでいたら、高速になる可能性がある
void insertionSort(vector<int> &a){
    for(int i=1; i<a.size(); i++){
        int v = a[i];
        int j = i-1;
        //0-i-1まではsort済と仮定
        while(j>=0 && a[j] > v){
            a[j+1] = a[j];
            j--;
        }
        //a[j] <= vのはずなのでその隣に置く
        a[j+1] = v;
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
    insertionSort(A);
}
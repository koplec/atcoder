#include <iostream>
using namespace std;

/**
 * @brief selectionsortじっそおう
 * 左側はソートしていると仮定して、最小値を探して、i番目に入れる
 * 0～i-1までは、ソートされており、かつ最小値になっている
 * 
 * @param A  intの配列
 * @param N  intに入っている配列の要素数
 * @return int  swaps下回数
 */
int selectionSort(int A[], int N){//データが良くてもO(N^2)くらいになる
    int sw = 0;
    for(int i=0; i<N; i++){
        int minj = i;
        for(int j=i; j<N; j++){
            if(A[j] < A[minj]) minj = j;
        }
        if(i != minj){
            swap(A[i], A[minj]);
            sw++;
        }
    }
    return sw;
}

int main(){
    int N, A[100];
    cin >> N;

    for(int i=0; i<N; i++) cin >> A[i];

    int sw = selectionSort(A, N);
    for(int i=0; i<N; i++){
        if(i) cout << " ";
        cout << A[i];
    }
    cout << endl;
    cout << sw << endl;


}
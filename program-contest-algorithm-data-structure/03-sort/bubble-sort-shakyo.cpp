#include <iostream>
using namespace std;

int bubbleSort(int A[], int N){
    int sw = 0; //交換回数　列の乱れを示す
    bool flag = 1;
    for(int i=0; flag; i++){
        flag = 0;
        for(int j=N-1; j >= i+1; j--){//i番目よりも手前まではソートされていると仮定
            if(A[j] < A[j-1]){
                swap(A[j], A[j-1]);
                flag = 1;
                sw++;
            }

        }
    }
    return sw;
}

int main(int argc, char const *argv[])
{
    int A[100], N, sw;
    cin >> N;

    for(int i=0; i<N; i++) cin >> A[i];

    sw = bubbleSort(A, N);

    for(int i=0; i<N; i++){
        if(i) cout << " ";
        cout << A[i];
    }
    cout << endl;
    cout << sw  << endl;

    return 0;
}

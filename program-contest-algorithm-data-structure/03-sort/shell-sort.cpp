#include <iostream>
using namespace std;

int cnt;

//小さな値が、飛び飛びで、左に移動していく
void insertionSort(int A[], int n, int g){
    cout << "insertionSort g=" << g << endl;
    for(int i=g; i<n; i++){
        int v = A[i];
        int j = i - g; //gずつ下にさかのぼる
        while(j>=0 && A[j] > v){
            A[j+g] = A[j];//g上のところにA[j]を移動させる
            j = j -g;
            cnt++;
        }
        //一つ手前がwhile文の条件式が最後に成立したところ
        A[j + g] = v;
    }
}

void print(int A[], int N){
    for(int i=0; i<N; i++){
        if(i > 0) cout << " ";
        cout << A[i];
    }
    cout << endl;
}

void shellSort(int A[], int n){
    cnt = 0;
    
    int G[100]; //m <= 100
    int tmp = n-1;
    int m=0;
    while(tmp > 1){
        G[m] = tmp;
        tmp = tmp/2;
        m++;
    }
    G[m] = 1;
    cout << m+1 << endl;
    print(G, m+1);
    for(int i=0; i<=m; i++){
        insertionSort(A, n, G[i]);
    }
}

int main(int argc, char const *argv[])
{
    int N, A[1000000];
    cin >> N;
    for(int i=0; i<N; i++){
        cin >> A[i];
    }
    shellSort(A, N);
    print(A, N);

    cout << cnt << endl;
    return 0;
}

#include <iostream>
#include <cstdio>
#include <algorithm>
#include <cmath>
#include <vector>
using namespace std;

long long cnt;
int l;
int A[1000000];
int n;
vector<int> G;

//間隔gを指定した挿入ソート
void insertionSort(int A[], int n, int g){
    for(int i=g; i<n; i++){
        int v = A[i];
        int j=i-g;
        while(j >= 0 && A[j] > v){ //大雑把に言うと、j <= iはソート済みと思うのが,insertion sortの特徴（i=0から始めるから）
            A[j + g] = A[j];
            j -= g;
            cnt++;
        }
        A[j+g] = v;
    }
}

void shellSort(int A[], int n){
    //数列G={1,4,13,40,121,364,1093,...}を生成
    for(int h=1;;){
        if(h>n){//Gは間隔を指定するから要素数より大きな間隔は意味がない
            break;
        }
        G.push_back(h);
        h = 3*h+1;
    }

    for(int i=G.size()-1; i>=0; i--){
        insertionSort(A, n, G[i]); //Gは数が大きいほうから指定
    }
}

int main(int argc, char const *argv[])
{
    cin >> n;
    //より速い入力scanf関数を利用
    for(int i=0; i<n; i++){
        scanf("%d", &A[i]);
    }
    cnt = 0;

    shellSort(A, n);

    cout << G.size() << endl;
    for(int i=G.size()-1; i>=0; i--){
        printf("%d", G[i]);
        if(i) printf(" ");
    }
    printf("\n");
    printf("%d\n", cnt);
    for(int i=0; i<n; i++) printf("%d\n", A[i]);
    return 0;
}
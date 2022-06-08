#include <iostream>
using namespace std;


int main(int argc, char const *argv[])
{
    int H, W;
    cin >> H >> W;

    int A[H+1][W+1];
    int B[H+1][W+1];
    for(int i=1; i<=H; i++){
        for(int j=1; j<=W; j++){
            cin >> A[i][j];
        }
    }

    int ROWSUM[H+1]; //横方向の足し算
    int COLSUM[W+1]; //縦方向の足し算
    //initial
    for(int i=0; i<H+1; i++){
        ROWSUM[i] = 0;
    }
    for(int j=0; j<W+1; j++){
        COLSUM[j] = 0;
    }

    for(int i=1; i<=H; i++){
        for (int j = 1; j <= W; j++)
        {
            ROWSUM[i] += A[i][j];
            COLSUM[j] += A[i][j];
        }
    }

    for (int i = 1; i <= H; i++){
        for (int j = 1; j <= W; j++){
            B[i][j] = ROWSUM[i] + COLSUM[j] - A[i][j];
        }
    }

    for (int i = 1; i <= H; i++){
        for (int j = 1; j <= W; j++){
            cout << B[i][j];
            if(j < W){
                cout << " ";
            }else{
                cout << endl;
            }
        }
    }

    return 0;
}

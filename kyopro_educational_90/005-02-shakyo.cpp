#include <iostream>
using namespace std;

const long long mod = 1000000007;
const int MAX_N = 33;

struct Matrix {
    int sz; //sz x sz 行列
    long long x[MAX_N][MAX_N];
};

//個々の計算オーダはO(B^3)
Matrix multiply(Matrix A, Matrix B){
    Matrix C;
    C.sz = A.sz;

    //初期化
    for(int i=0; i<C.sz; i++){
        for(int j=0; j<C.sz; j++) C.x[i][j] = 0; 
    }
    //行列の積
    for(int i=0; i<A.sz; i++){
        for( int j=0; j<A.sz; j++){
            for(int k=0; k<A.sz; k++){
                C.x[i][j] += A.x[i][k] * B.x[k][j];
                C.x[i][j] %= mod;
            }
        }
    }
    return C;
}

//O(logT)
Matrix powers(Matrix A, long long T){
    //AのT乗を求める
    Matrix E[64], F;
    E[0] = A;
    for(int i=1; i<64; i++){
        E[i] = multiply(E[i-1], E[i-1]);
    }

    // 単位行列
    F.sz = E[0].sz;
    for(int i=0; i<F.sz; i++){
        for(int j=0; j<F.sz; j++){
            if(i==j) F.x[i][j] = 1;
            if(i!=j) F.x[i][j] = 0;
        }
    }

    for(int i=62; i>=0; i--){
        //例えばT=7だったら
        //A4 * A2 * A1になるように掛け算している
        if((T & (1LL << i)) != 0LL){
            F = multiply(F, E[i]);
        }
    }
    return F;
}

//入力
long long N, B, K;
long long C[11];

int main(int argc, char const *argv[])
{
    //入力
    cin >> N >> B >> K;
    for(int i=1; i<=K; i++) cin >> C[i];

    //行列を求める
    Matrix A;
    A.sz = B;
    //B x Bの行列
    //Bで割ったときのあまりは0~B-1なので
    for(int i=0; i<B; i++){
        for(int j=0; j<B; j++) A.x[i][j] = 0;
    }
    for(int i=0; i<B; i++){//あまり
        for(int j=1; j<=K; j++){
            int nex = (10*i + C[j])%B;
            A.x[i][nex] += 1;
        }
    }

    //行列の累乗を求める
    Matrix Z = powers(A, N);

    //答を求める
    long long Answer = Z.x[0][0];
    cout << Answer << endl;
    return 0;
}

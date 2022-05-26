// 最長共通部分文字列
// ２つの文字列を与えたとき共通する文字列の長さが最大になるのはどれくらいか
// 例えば、abcとadcだったら、2
// logest common subsequence
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

static const int N = 1000;
int lcs(string X, string Y){
    int c[N+1][N+1];
    int m = X.size();
    int n = Y.size();
    int maxl = 0;

    X = ' ' + X; //X[0]に空白を挟む
    Y = ' ' + Y;
    c[0][0] = 0;
    for(int i=1; i<=m; i++) c[i][0] = 0;//Xの1文字目とYの０文字目のcls = 0
    for(int j=1; j<=n; j++) c[0][j] = 0;

    for(int i=1; i<=m; i++){//上で0をいれたのはここでi=1, j=1から始めたかったから
        for(int j=1; j<=n; j++){
            if(X[i] == Y[j]){//X[i]とY[j]が同じ文字なら clsは１増える
                c[i][j] = c[i-1][j-1] + 1;
            }else {//
                c[i][j] = max(c[i-1][j], c[i][j-1]);
            }
            maxl = max(maxl, c[i][j]);
        }
    }

    return maxl;
}

int main(int argc, char const *argv[])
{
    string s1, s2;
    int n; cin >> n;
    for(int i=0; i<n; i++){
        cin >> s1 >> s2;
        // cout << s1 << endl;
        // cout << s2 << endl;
        cout << lcs(s1, s2) << endl;
    }
    return 0;
}

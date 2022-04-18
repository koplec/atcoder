#include <bits/stdc++.h>
using namespace std;

int main(int argc, char const *argv[])
{
    int A, B, C;
    cin >> A >> B >> C;

    int M, m;
    M = max(A, max(B, C));
    m = min(A, min(B, C));


    cout << M - m << endl;

    return 0;
}
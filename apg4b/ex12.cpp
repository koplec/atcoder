#include <bits/stdc++.h>
using namespace std;

int main(int argc, char const *argv[])
{
    string S;
    cin >> S;
    int ret = 1;//1文字目は0
    for(int i=1; i<S.size(); i=i+2){
        char op = S.at(i);
        if(op == '+'){
            ret += 1;
        }else{
            ret -= 1;
        }
    }
    cout << ret << endl;
    return 0;
}

#include <bits/stdc++.h>
using namespace std;

int main(){
    int N, A;
    int result;
    cin >> N >> A;

    result = A;
    for(int i=0; i<N; i++){
        char op;
        int B;
        cin >> op >> B;
        if(op == '+'){
            result += B;
        }else if(op == '-'){
            result -= B;
        }else if(op == '*'){
            result *= B;
        }else if(op == '/' && B != 0){
            result /= B;
        }else{
            cout << "error" << endl;
            break;
        }
        cout << (i+1) << ":" << result << endl;
    }

}
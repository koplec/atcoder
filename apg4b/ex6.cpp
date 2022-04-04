#include <bits/stdc++.h>
// GNUが開発するC++の標準ライブラリの実装であるlibstdc++のプリコンパイル済みヘッダを生成するためのソースファイル
// CおよびC++の標準ライブラリに含まれるヘッダがすべてインクルードされており、
// このことから「#include <bits/stdc++.h>と書くとすべての標準ライブラリを一度にインクルードできる
using namespace std;
 
int main() {
  int A, B;
  string op;
  cin >> A >> op >> B;
 
  if (op == "+") {
    cout << A + B << endl;
  }
  if (op == "-"){
      cout << A - B << endl;
  }
  if (op == "*"){
      cout << A * B << endl;
  }
  if (op == "/"){
    if ( B == 0){
        cout << "error" << endl;
    }else{
        cout << A / B << endl;
    }
  }
  if (op == "?"){
      cout << "error" << endl;
  }
  if (op == "="){
      cout << "error" << endl;
  }
  if (op == "!"){
      cout << "error" << endl;
  }
}
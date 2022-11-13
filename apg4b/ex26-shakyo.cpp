// ex26.cppの模範解答の写経
#include <bits/stdc++.h>
using namespace std;

// 問題文の形式でvec値を出力
void print_vec(vector<int> vec){
    cout << "[ ";
    for(int i=0; i<vec.size(); i++){
        cout << vec.at(i) << " ";
    }
    cout << "]" << endl;
}

// 変数名を読み取りイコールを読み飛ばす
string read_name(){
    string name, equal;
    cin >> name >> equal;
    return name;
}

// int式の項を1つ読み取る
// 数字ならその値を返し、そうでないなら変数として解釈し変数の値を返す
int read_int(map<string, int> &var_int){
    string val;
    cin >> val;

    //最初の文字が数字かどうかで数字か変数化を判定
    return isdigit(val.at(0)) ? stoi(val) : var_int.at(val);
}

// int式全体を読み取って計算する
int calc_int(map<string, int> &var_int){
    string symbol = ""; //演算子を受け取る変数
    int result = 0;

    // 式の終わりである";"が出てくるまで読み取る
    while(symbol != ";"){
        //項を1つ読む
        int val = read_int(var_int);
        if(symbol == ""){//式の最初
            result = val;
        }
        //足し算
        if(symbol == "+"){
            result += val;
        }
        //引き算
        if(symbol == "-"){
            result -= val;
        }

        //symbolには"+" or "-" or ";"が入る
        cin >> symbol;
    }
    return result;
}

// vec値を読み取る
// 最初の"["は読み取ってあること前提
// var_int intの変数を保持するmap
// 文字であらわされるvec値は読まない
vector<int> read_vec_val(map<string, int> &var_int){
    vector<int> result;
    string symbol = "";

    //vec値の終わりの"]"まで読む
    while(symbol != "]"){
        int val = read_int(var_int);
        result.push_back(val);

        //symbolには、"," or "]"が入力される
        cin >> symbol;
    }
    return result;
}

// vec式の項を1つ読み取る
// vec値ならその値を返して、そうでないなら変数として解釈して変数の値を返す
vector<int> read_vec(map<string, int> &var_int, map<string, vector<int>> &var_vec){
    string val;
    cin >> val;

    //"["か同課で、vec値が変数化を判定
    return val == "["? read_vec_val(var_int) : var_vec.at(val);
}

// vec式全体を読み取って計算する
vector<int> calc_vec(map<string, int> &var_int, map<string, vector<int>> &var_vec){
    string symbol; //演算子を受け取る変数
    vector<int> result;

    while(symbol != ";"){
        //項を1つ読む
        vector<int> vec = read_vec(var_int, var_vec);

        //記号が入力されていない（式の最初の項）
        if(symbol == ""){
            result = vec;
        }
        if(symbol == "+"){
            for(int i=0; i<result.size(); i++){
                result.at(i) += vec.at(i);
            }
        }
        if(symbol == "-"){
            for(int i=0; i<result.size(); i++){
                result.at(i) -= vec.at(i);
            }
        }

        cin >> symbol;
    }
    return result;

}

int main(){
    //命令の行数を取得
    int N;
    cin >> N;

    //変数管理map
    map<string, int> var_int;
    map<string, vector<int>> var_vec;

    for(int i=0; i<N; i++){
        string s;
        cin >> s;

        if (s == "int"){
            string name = read_name();
            var_int[name] = calc_int(var_int);
        }

        if (s == "vec"){
            string name = read_name();
            var_vec[name]= calc_vec(var_int, var_vec);
        }

        if ( s == "print_int"){
            cout << calc_int(var_int) << endl;
        }

        if(s == "print_vec"){
            print_vec(calc_vec(var_int, var_vec));
        }
    }
}
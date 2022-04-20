#include <bits/stdc++.h>
using namespace std;

bool isNumber(const string &str){
    for(char const &c: str){
        if(isdigit(c) == 0) return false;
    }
    return true;
}

int read_int_term(map<string, int> &int_vars){
    string numStr;
    int num;
    cin >> numStr;
    if(isNumber(numStr)){
        num = stoi(numStr);
    }else{
        num = int_vars[numStr];
    }
    return num;
}

int read_int_eq(map<string, int> &int_vars){
    int ret = 0;
    string str;

    //第1項
    ret = read_int_term(int_vars);
    
    while(true){
        cin >> str;
        if(str == ";"){
            break;
        }
        if(str == "+" || str == "-"){
            int num = read_int_term(int_vars);

            if(str == "+"){
                ret += num;
            }else if(str == "-"){
                ret -= num;
            }
            continue;
        }
    }
    return ret;
}


vector<int> read_vec_term(map<string, int> &int_vars, map<string, vector<int>> &vec_vars){
    string first;
    std::cin >> first;
    if(first != "["){//最初が文字だったらそのまま返す
        return vec_vars[first];
    }
    //最初が[のときは、続けて読んでいく
    vector<int> ret(0);
    string str;
    while(true){
        int num = read_int_term(int_vars);
        ret.push_back(num);
        cin >> str;
        if(str == "]"){
            break;
        }
        if(str == ","){
            continue;
        }
    }
    return ret;
}


vector<int> read_vec_eq(map<string, int> &int_vars, map<string, vector<int>> &vec_vars){
    vector<int> ret = read_vec_term(int_vars, vec_vars);
    while(true){
        string str;
        cin >> str;
        if(str == ";"){
            break;
        }else if(str == "+"){
            vector<int> tmp = read_vec_term(int_vars, vec_vars);
            for(int i=0; i<tmp.size(); i++){
                ret.at(i) += tmp.at(i);
            }
            continue;
        }else if(str == "-"){
            vector<int> tmp = read_vec_term(int_vars, vec_vars);
            for(int i=0; i<tmp.size(); i++){
                ret.at(i) -= tmp.at(i);
            }
            continue;
        }
    }
    return ret;
}
int main(){
    int N;
    cin >> N;

    map<string, int> int_vars;
    map<string, vector<int>> vec_vars;

    for(int i=0; i<N; i++){
        string first;
        cin >> first;
        if(first == "int"){
            string var, equal;
            cin >> var;
            int_vars[var] = 0;
            
            cin >> equal;
            assert(equal == "=");
            int_vars[var] = read_int_eq(int_vars);
        }else if(first == "print_int"){
            int num = read_int_eq(int_vars);
            cout << num << endl;
        }else if(first == "vec"){
            string var, equal;
            cin >> var;
            
            cin >> equal;
            assert(equal == "=");
            vec_vars[var] = read_vec_eq(int_vars, vec_vars);
        }else if(first == "print_vec"){
            vector<int> vec = read_vec_eq(int_vars, vec_vars);
            // cout << "DEBUG : " << vec.size() << endl;
            cout << "[ ";
            for(int j=0; j<vec.size(); j++){
                cout << to_string(vec.at(j)) + " ";
            }
            cout << "]" << endl;
        }
    }
    // for(auto int_var : int_vars){
    //     string var_name = int_var.first;
    //     int var_value = int_var.second;
    //     cout << var_name << " = "  << var_value << endl;
    // }
    
}
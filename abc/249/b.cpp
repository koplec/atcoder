#include <iostream>
#include <set>
using namespace std;

int main(){
    string S;
    cin >> S;

    set<char> charSet;
    bool hasLower = false;
    bool hasUpper = false;
    for(int i=0; i<S.length(); i++){
        char c = S.at(i);
        if('a' <= c && c <= 'z'){
            hasLower = true;
        }
        if('A' <= c && c <= 'Z'){
            hasUpper = true;
        }
        if(charSet.count(c) > 0){
            cout << "No";
            return 0;
        }
        charSet.insert(c);
    } 
    if(hasLower && hasUpper){
        cout << "Yes";
    }else{
        cout << "No";
    }
    return 0;
}
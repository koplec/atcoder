#include "iostream"
#include "set"
#include "map"
#include "vector"
#include "algorithm"

using namespace std;

map<int, set<string>> parenSets;

set<string> getParenSet(int n){
    if(parenSets.count(n)){
        return parenSets[n];
    }
    set<string> pset;
    if(n==1){
        pset.insert("()");
    }else{
        set<string> pre = getParenSet(n-1);
        for (const string &str : pre){
            pset.insert("(" + str + ")");
        }
        for(int i=1; i<n; i++){
            int j = n-i;
            set<string> seti = getParenSet(i);
            set<string> setj = getParenSet(j);
            for(const string &stri : seti){
                for(const string &strj : setj){
                    pset.insert(stri + strj);
                }
            }
        }    
    }
    parenSets[n] = pset;
    return pset;
}

int main(int argc, char const *argv[])
{
    int N;
    cin >> N;
    if(N % 2 == 0){
        set<string> pset = getParenSet(N/2);
        vector<string> vec(pset.begin(), pset.end());
        sort(vec.begin(), vec.end());
        for(const string &str : pset){
            cout << str << endl;
        }
    }else{
        cout << "" << endl;
    }

    return 0;
}

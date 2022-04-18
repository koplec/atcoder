#include <bits/stdc++.h>
using namespace std;

int main(int argc, char const *argv[])
{
    int N;
    cin >> N;
    map<int, int> freq;
    for(int i=0; i<N; i++){
        int a;
        cin >> a;
        if(freq.count(a)){
            freq[a]++;
        }else{
            freq[a] = 1;
        }
    }
    int max = -1;
    int maxNum = -1;
    for(auto t: freq){
        int num = t.first;
        int count = t.second;
        if(max < count){
            max = count;
            maxNum = num;
        }
    }
    cout << maxNum << " " << max << endl;

    return 0;
}

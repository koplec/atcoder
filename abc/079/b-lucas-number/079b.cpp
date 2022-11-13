#include <bits/stdc++.h>
using namespace std;



int64_t lucas(int n, vector<int64_t> &lucas_cache){
    int64_t l_n = lucas_cache.at(n);
    if(l_n != 0){
        return l_n;
    }
    int64_t l_a = lucas(n-1, lucas_cache);
    int64_t l_b = lucas(n-2, lucas_cache);
    l_n = l_a + l_b;
    lucas_cache.at(n) = l_n;
    return l_n;
}

uint64_t lucas2(int N){
    uint64_t L_0 = 2, L_1 = 1, L_2;
    if(N==0) return L_0;
    if(N==1) return L_1;

    //O(N)
    for(int i=2; i<=N; i++){
        L_2 = L_1 + L_0;
        L_0 = L_1;
        L_1 = L_2;
    }
    return L_2;
}

int main(int argc, char const *argv[])
{
    int N, lucas_cache_size;
    cin >> N;
    if(N<2){
        lucas_cache_size = 2;
    }else{
        lucas_cache_size = N+1;
    }
    vector<int64_t> lucas_cache(lucas_cache_size);
    lucas_cache.at(0) = 2LL;
    lucas_cache.at(1) = 1LL;
    cout << lucas(N, lucas_cache) << endl;
    return 0;
}

#include <stdio.h>
#include <vector>
#include <iostream>
#include <map>
#include <algorithm>
#include <cassert>

using namespace std;


int count(map<int, int> numCount, vector<int> nums){
    //dpを準備
    //numsを順番に並べる
    //dp[i][j]：i番目の数字まで確定して、集合のサイズがjである場合の数
    //0<=i<=max(a), 0<=j<=3
    //dp[i+1][j] を考えると、
    //i+1を追加するときは、dp[i][j-1] * (i+1の個数)増える
    //i+1を追加しないときは、dp[i][j]
    vector<vector<int>> dp;
    //初期化
    for(vector<int>::size_type i=0; i<nums.size(); i++){
        vector<int> set;
        for(int j=0; j<=3; j++){
            set.push_back(0);
        }
        dp.push_back(set);
    }
    //集合のサイズが1である場合の数はdp[i][1]は、i番目までの数字のそれぞれの個数の和になる
    for(vector<int>::size_type i=0; i<nums.size(); i++){
        int num = nums[i];
        int numC = numCount[num];
        if(i == 0){
            dp[i][1] = numC;
        }else{
            dp[i][1] = dp[i-1][1] + numC;
        }
    }
    //集合のサイズが2以上の数の計算
    for(vector<int>::size_type i=1; i<nums.size(); i++){
        int num = nums[i];
        int numC = numCount[num];
        for(int j=2; j<=3; j++){
            dp[i][j] = dp[i-1][j-1]*numC + dp[i-1][j];
        }
    }

    return dp[nums.size()-1][3];
}

void assertCount(string title, vector<int> A, int expected){
    map<int, int> numCount;
    vector<int> nums;
    for (int i = 0; i < A.size(); i++)
    {
        int a = A.at(i);
        if(numCount.count(a))
        {
            numCount[a]++;
        }
        else
        {
            numCount[a] = 1;
            nums.push_back(a);
        }
    }
    int cnt = count(numCount, nums);
    if(cnt != expected){
        cout << "ERROR!! "  << title << " failed cnt:" <<cnt << ", expected:" << expected << endl;
    }
}


int main()
{
    vector<int> a0 {1, 2, 3};
    assertCount("A0", a0, 1);

    vector<int> a1 {3, 1, 4, 1};
    assertCount("A1", a1, 2);

    vector<int> a2 {99999, 99998, 99997, 99996, 99995, 99994, 99993, 99992, 99991,99990};
    assertCount("A2", a2, 120);
    
    vector<int> a3 {3,1,4,1,5,9,2,6,5,3,5,8,9,7,9};
    assertCount("A3", a3, 355);
    
    vector<int> b0 {1, 1, 1};
    assertCount("B0", b0, 0);
    
    vector<int> b1 {1, 2, 2};
    assertCount("B1", b1, 0);
    
    vector<int> b2 {1, 1, 1, 1, 1, 1, 1, 1, 1};
    assertCount("B2", b2, 0);

    vector<int> b3 {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3};
    assertCount("B3", b3, 10);

    vector<int> b4 {1, 2, 3, 4, 5};
    assertCount("B4", b4, 10);

    vector<int> b5 {1, 2, 3, 4, 5, 5};
    assertCount("B5", b5, 4 + 2*6);

    vector<int> b6 {1, 2, 3, 3, 4, 5};
    assertCount("B6", b6, 4 + 2*6);

    vector<int> b7 {1, 2, 2,  3, 4, 5};
    assertCount("B7", b7, 4 + 2*6);

    return 0;
    //本番用
    // int N;
    // scanf("%d", &N);

    // //map
    // map<int, int> numCount;
    // vector<int> nums;
    // for (int i = 0; i < N; i++)
    // {
    //     int a;
    //     cin >> a;
    //     if (numCount.count(a))
    //     {
    //         numCount[a]++;
    //     }
    //     else
    //     {
    //         numCount[a] = 1;
    //         nums.push_back(a);
    //     }
    // }
    // //numsを昇順でsort
    // sort(nums.begin(), nums.end());

    // int ret = count(numCount, nums);
    // cout << ret << endl;

    // return 0;
}
#include <stdio.h>
#include <vector>
#include <iostream>
#include <map>
#include <algorithm>

using namespace std;

int countComb(map<int, int> numCount, int n)
{
    if (n <= 2)
    {
        int countSum = 0;
        int countSum2 = 0;
        for (auto t : numCount)
        {
            int c = t.second;
            countSum += c;
            countSum2 += c * c;
        }

        if (n == 1)
        {
            return countSum;
        }
        if (n == 2)
        {
            return countSum * countSum - countSum2;
        }
    }

    // n==3
    if(numCount.size()<=2){
        return 0;
    }


    auto target = numCount.begin();

    int targetNum = target->first;
    int targetCount = target->second;

    int count = 0;
    map<int, int> tmpMap; // targetを除いたmap作成
    for (auto t : numCount)
    {
        if (t.first != targetNum)
        {
            tmpMap[t.first] = t.second;
        }
    }
    count = targetCount * countComb(tmpMap, 2) + countComb(tmpMap, 3);
    return count;
}

int main()
{
    int N;
    scanf("%d", &N);

    //map
    map<int, int> numCount;
    vector<int> nums;
    for (int i = 0; i < N; i++)
    {
        int a;
        cin >> a;
        if (numCount.count(a))
        {
            numCount[a]++;
        }
        else
        {
            numCount[a] = 1;
            nums.push_back(a);
        }
    }
    //numsを昇順でsort
    sort(nums.begin(), nums.end());

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

    cout << dp[nums.size()-1][3] << endl;

    return 0;
}
#include <stdio.h>
#include <vector>
#include <iostream>
#include <map>

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
    std::vector<int> A(N);
    for (int i = 0; i < N; i++)
    {
        std::cin >> A.at(i);
    }

    //方針
    map<int, int> numCount;
    for (int i = 0; i < N; i++)
    {
        int a = A.at(i);
        if (numCount.count(a))
        {
            numCount[a]++;
        }
        else
        {
            numCount[a] = 1;
        }
    }

    int count = countComb(numCount, 3);

    cout << count << endl;

    return 0;
}
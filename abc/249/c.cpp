// 英小文字のみからなる N 個の文字列が与えられます。
// S1,...,SN から文字列を好きな個数選ぶことを考えます。
// ※Siに同じ文字は2個以上現れない
// このとき、「選んだ文字列の中でちょうど K 個の文字列に登場する英小文字」
// の種類数としてあり得る最大値を求めてください。

#include <iostream>
#include <vector>
#include <map>
#include <functional>
#include <cassert>
using namespace std;
/**
 * okumura-combination-sampleを元にして、
 * 与えられた配列サイズからcombinationの全ての組み合わせをループする物を作る
 */

unsigned int nextcomb(unsigned int x)
{
    unsigned int smallest, ripple, new_smallest, ones;
    smallest = x & -x;
    ripple = x + smallest;
    new_smallest = ripple & -ripple;
    ones = ((new_smallest / smallest) >> 1) - 1;

    return ripple | ones;
}

unsigned int firstcomb(int k)
{
    return (1U << k) - 1U;
}

/**
 */
vector<unsigned int> comb2vec(unsigned int c)
{
    vector<unsigned int> ret;
    unsigned int r = c / 2, m = c % 2;
    unsigned int index = 0;
    while (r > 0)
    {
        if (m != 0)
        {
            ret.push_back(index);
        }
        unsigned int oldr = r;
        r = oldr / 2;
        m = oldr % 2;
        index++;
    }
    assert(r == 0);
    if (m != 0)
    {
        ret.push_back(index);
    }
    return ret;
}

void foreach_comb(int n, int k, std::function<void(vector<unsigned int>)> fn)
{
    unsigned int first_c = firstcomb(k);
    unsigned int full_one = firstcomb(n);

    unsigned int c = first_c;
    std::vector<unsigned int> c_vec = comb2vec(c);
    while (!(c & ~full_one))
    {
        //処理
        c_vec = comb2vec(c);
        fn(c_vec);

        //次の値
        c = nextcomb(c);
    }
}

int main(int argc, char const *argv[])
{
    int N, K;
    cin >> N >> K;
    vector<string> sentences(N);
    for (int i = 0; i < sentences.size(); i++)
    {
        cin >> sentences.at(i);
    }

    int maxJustKNum = -1;
    int *maxJustKNumPtr = &maxJustKNum;

    //任意の個数の文字列を選ぶ
    // K個の文字列から選ばないといけないのでKからNまでカウントする
    // k個選んだことにする
    for (int k = K; k <= N; k++)
    {
        foreach_comb(N, k, [=](vector<unsigned int> cvec){
            //k個選んだ
            //k個の文字列から一文字ごとの登場回数を数える
            map<char, int> charCount;
            for(int i=0; i<k; i++){
               string str = sentences.at(cvec.at(i));
                for(int j=0; j<(int)str.size(); j++){
                    char ch = str[j];
                    if(charCount.count(ch)){
                        charCount[ch]++;
                    }else{
                        charCount[ch] = 1;
                    }
                }
            }
            //charCountの種類ごとの数がちょうどKになっている文字の数を数える
            int justKNum = 0;
            for(auto t: charCount){
                // char ch = t.first;
                char num = t.second;
                if(num == K){
                    justKNum++;
                }
            }
            if(justKNum > *maxJustKNumPtr ){
                *maxJustKNumPtr = justKNum;
            }
        });
    }

    cout << *maxJustKNumPtr;
    return 0;
}

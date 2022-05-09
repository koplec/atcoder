#include <functional>
#include <vector>
#include <iostream>
#include <cassert>

using namespace std;
/**
 * okumura-combination-sampleを元にして、
 * 与えられた配列サイズからcombinationの全ての組み合わせをループする物を作る
 * 
 * 
 */ 

unsigned int nextcomb(unsigned int x){
    unsigned int smallest, ripple, new_smallest, ones;
    smallest = x & -x;
    ripple = x + smallest;
    new_smallest = ripple & -ripple;
    ones = ((new_smallest / smallest) >> 1) - 1;
    
    return ripple | ones;
}

unsigned int firstcomb(int k){
    return (1U << k) - 1U;
}

/**
 * @brief　
 * 
 * @param c 
 * @return int* 
 */
vector<unsigned int> comb2vec(unsigned int c){
    vector<unsigned int> ret;
    unsigned int r = c / 2;
    unsigned int m = c % 2;
    unsigned int index = 0;
    while(r > 0){
        if(m != 0){
            ret.push_back(index);
        }
        unsigned int oldr = r;
        r = oldr / 2;
        m = oldr % 2;
        index++;
    }
    assert(r == 0);
    if(m != 0){
        ret.push_back(index);
    }
    return ret;
}
void print_combvec(vector<unsigned int> cvec){
    cout << "[ ";
    for(std::size_t i =0; i<cvec.size(); i++){
        cout << cvec.at(i) << " ";
    }
    cout << " ] " << endl;
}

void foreach_comb(int n, int k){
    unsigned int first_c = firstcomb(k);
    unsigned int full_one = firstcomb(n);

    unsigned int c = first_c;
    vector<unsigned int> c_vec = comb2vec(c);
    while(! (c& ~full_one)){
        //処理
        c_vec = comb2vec(c);
        print_combvec(c_vec);

        //次の値
        c = nextcomb(c);
    }
}

int main(int argc, char const *argv[])
{
    foreach_comb(3, 2);
    return 0;
}

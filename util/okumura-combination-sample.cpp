#include <iostream>
using namespace std;

int N = 3;

/**
 * @brief 
 * combinationをすべて列挙する
 * まずcombinationをbit表現する
 * 例えば、8C3をbit表現したとき、combinationの一つは
 * 0000 0111とあらわすことができる。
 * これは0番目1番目2番目が選ばれた場合である。
 * 
 * 次にこの0000 0111にnextsetという演算を行うことで
 * 0000 1011を出力する（これは0番2番3番が選ばれた場合）
 * 
 * この演算は、1をどんどん左にずらしていくことに対応する
 * 
 * これを何度も繰り返して、1 0001 0001のように一番左に一つで1が現れるようになると、すべてのcombinationを
 * 列挙したことになる
 * 
 * M. Beeler, R. W. Gosper, R. Schroeppelによる方法
 * 
 * bit表現したcombination xを与えると次のcombinationが得られる
 * 
 * @param x 
 * @return unsigned int 
 */
unsigned int nextcomb(unsigned int x){
    unsigned int smallest, ripple, new_smallest, ones;

    //-x : xのbit反転したものに1を加えたもの （2の補数）
    //2の補数とのAND演算は、一番下の1が残る演算になる

    //smallest
    // xのうち、bit値が1であるbitのうち一番桁が低いところだけ1で他は0のbitが得られる
    smallest = x & -x;

    //ripple 
    // xのうち、bit値が1であるbitのうち一番桁が低いものから連続のbitをsamllestと足すことで、
    // 繰り上がりが発生し、0の値が1になるところが出てくる
    ripple = x + smallest;

    //new_smallest
    // rippleのsmallest
    new_smallest = ripple & -ripple;

    //ones
    // 1の集まり
    // xの最下位連続1の数-1だけonesが生成される 0000111 みたいな
    ones = ((new_smallest / smallest) >> 1) - 1;
    
    // xの上位と右寄せの111の集まりになる
    return ripple | ones;
}
/**
 * @brief nextcombで使う最初の組み合わせの一つを生成する
 * 
 * @param k 
 * @return unsigned int 
 * ※ unsigned int 4バイト = 32bit 場合の数N=32までいける？
 */
unsigned int firstcomb(int k){
    return (1U << k) - 1U;
}

void printcomb(unsigned int x){
    for(int i=0; i<=N; i++){
        // cout << "a " << i << endl;
        if(x & 1){
            cout <<  i << ", ";
        }
        x >>= 1;
        // cout << "x: " << x << endl;
    }
    cout << endl;
}


int main(int argc, char const *argv[]){
    cout << "N=" << N << endl;
    int k = 2;
    
    // 100 - 001 = 011 = 0 0000 0011
    unsigned int c = firstcomb(k);
    // cout << "firstcomb c=" << c << endl;
    // printcomb(c);
    // printbin(c);

    //0000 1111 1111
    cout << "firstcomb(N):";
    printcomb(firstcomb(N));
    cout << "firstcomb(N) as usigned int: " << firstcomb(N) << endl;

    //1111 1111 0000 0000 ※~演算はbit NOT
    cout << "~firstcomb(N):";
    printcomb(~firstcomb(N));
    cout << "~firstcomb(N) as usigned int: " << ~firstcomb(N) << endl;
    
    cout << firstcomb(N) << endl;
    // cout << "B:" << c << endl;
    
    int i=1;

    //~:NOT演算子
    //firstcomb  000011111111のように1がN個並んだbinary
    //~firstcomb 111100000000のようなbit反転
    //cの値はだんだん左に1がよってきて、firstcombの1がある領域に1が現れる
    //そうするとc & ~firstcomb(N) が0でなくなる
    while(! (c & ~firstcomb(N))){  //!は0でないときという意味
        cout << i << ":";
        printcomb(c);
        
        cout << "c=" << c << endl;
        c = nextcomb(c);
        cout << "nextcomb(c)=" << c << endl;
        cout << "& op:" << (c & ~firstcomb(N)) << endl;
        i++;
    }
    return 0;
}

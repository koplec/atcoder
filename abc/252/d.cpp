#include <stdio.h>
#include <vector>
#include <iostream>

const int MAX = 200000;

int N;
int A[MAX];
int count;
void iter(int index, const int A[], std::vector<int> numVec){
    if(numVec.size() == 3){
        int a = numVec.at(0);
        int b = numVec.at(1);
        int c = numVec.at(2);
        if(a != b && b != c && c != a){
            count++;
            return;
        }else{
            return;
        }
    }
    if(numVec.size() == 2){
        int a = numVec.at(0);
        int b = numVec.at(1);
        if(a == b){
            return;
        }
    }
    if(index >= N){
        return;
    }

    //
    iter(index+1, A, numVec);
    numVec.push_back(A[index]);
    iter(index+1, A, numVec);
}

int main(){
    scanf("%d", &N);
    for(int i=0; i<N; i++) scanf("%d", &A[i]);

    std::vector<int> numVec;

    iter(0, A, numVec);
    std::cout << count <<std::endl;
    return 0;

}
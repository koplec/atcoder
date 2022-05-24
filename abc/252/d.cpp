#include <stdio.h>
#include <vector>
#include <iostream>

int count;
void iter(int index, int N, std::vector<int>& A, std::vector<int> numVec){
    if(index >= N){
        return;
    }

    if(numVec.size() == 2){
        int a = numVec.at(0);
        int b = numVec.at(1);
        if(a == b){
            return;
        }
    }
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


    //
    iter(index+1, N, A, numVec);
    numVec.push_back(A[index]);
    iter(index+1, N, A, numVec);
}

int main(){
    int N;
    scanf("%d", &N);
    std::vector<int> A(N);
    for(int i=0; i<N; i++){
        std::cin >> A.at(i);
    }

    std::vector<int> numVec;

    iter(0,N, A, numVec);
    std::cout << count <<std::endl;
    return 0;
}
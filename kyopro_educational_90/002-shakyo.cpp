// 小さい制約は全探索を考える
// bit全探索 O(2^N x N) N <= 20程度なら十分計算できると考える
 #include <iostream>
 #include <string>
 using namespace std;

 bool hantei(string S){
     int dep = 0;
     for(int i=0; i<S.size(); i++){
         if(S[i] == '(') dep += 1;
         if(S[i] == ')') dep -= 1;
         if(dep < 0) return false;
     }
     if(dep == 0) return true;
     return false;
 }

 int main(){
     int N;
     cin >> N;
     for(int i=0; i < (1<<N); i++){
         // 0000 -> ((((
         string candidate = "";

         for(int j=N-1; j >=0; j--){
             //(i & (1 << j))==0というのは、iのjビット目(2^jの位)が0であるための条件
             if((i & (1 << j)) == 0){
                 candidate += "(";
             }else{//値が1 
                 candidate += ")";
             }
         }
         bool I = hantei(candidate);
         if(I) cout << candidate << endl;
     }
 }
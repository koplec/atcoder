// songuno1さんの回答写経
// 構造体を単純に引数に入れたら、値渡しでコピーされる。渡元の構造体は元のまま
// (1+1)^N = NC0 + NC1 + ... + NCNを再帰であらわした形がすごくかっこいい

#include <stdio.h>
#include <vector>

const int MAX = 20;
const int Alp = 26;

// alphabetの数だけの配列の構造体を持っておく
struct counter {
    int c[Alp];
};

int N, M, Ans;
char d[MAX][100]; //文字列を入れておく最大16個だからちょっと多めか？
counter Bnk;


void dfs(int in, counter C){
    int i, Val;

    // 再帰の終了条件
    // 最初にdfsを何回も呼ばれるのでここが呼ばれそう
    if(in == N){
        for(i=Val=0; i<Alp; i++){
            // justKの確認
            if(C.c[i] == M) Val++;
        }
        if(Ans < Val) Ans = Val;
        return;
    }

    //コピー渡しだから、渡した先でCが変わっても、こちらのCは元のまま
    dfs(in + 1, C);
        
    // d[in] inは固定なのでin番目の文字列を見ている
    // d[in][i]でNULL文字まで見るという意味
    // C.c[d[in][i]-'a']で文字'a'が0番目でC.cの文字を一つずつ数えている
    for(i=0; d[in][i]; i++){
        C.c[d[in][i]-'a']++;
    }

    dfs(in + 1, C);
}
void copyTest(counter C){
    int prev = C.c[3];
    C.c[3]++;
    int after = C.c[3];
    printf("%d -> %d\n", prev, after);
}
int main(){
    int i;
 
	scanf("%d%d", &N, &M);
	for (i = 0; i < N; i++) scanf("%s", d[i]);
 
	dfs(0, Bnk);
 
	printf("%d", Ans);
 
	// return 0;
    // counter C; 
    // C.c[3] = 10;
    // printf("A main C.c[3]=%d\n", C.c[3]);
    // copyTest(C);
    // printf("B main C.c[3]=%d\n", C.c[3]);
    
}
N, M, Q = map(int, input().split())

# グラフG
G = [[] for i in range(N)]
# print(G)

for i in range(M):
    u, v = map(int , input().split())

    # 頂点番号を0始まりにする
    u -= 1
    v -= 1 

    G[u].append(v)
    G[v].append(u)

# print(G)

# 初期状態の各頂点の色を入力
col = list(map(int, input().split()))

for i in range(Q):
    # extended iterableのマーク* 
    t, x, *y = map(int , input().split())
    # 頂点番号を0始まりにする
    x -= 1

    print(col[x])

    if t == 1:
        for v in G[x]:
            col[v] = col[x]
    else:
        col[x] = y[0]
        
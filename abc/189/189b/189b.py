N, X = map(int, input().split())
alcohol = 0
for i in range(N):
    V, P = map(int, input().split())
    # 小数計算は避ける
    alcohol += V*P

# 許容量を超えた
    if alcohol > 100*X:
        print(i+1)
        exit()

print(-1)

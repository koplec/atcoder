# pythonのmapはiteratorを返す forで受け取るとか
N, X = map(int, input().split())
# listに入れたら、iteratorをいい感じにlistに変換する
A = list(map(int, input().split()))


ans = []

for i in range(N):
    if A[i] != X:
        ans.append(A[i])

print(*ans)
import itertools

N, K = map(int, input().split())
time = []
# print("N:", N)
# print("K:", K)
for i in range(N):
    T = list(map(int, input().split()))
    time.append(T)
# print("time:", time)
ans = 0

# 1からNまでの順列の列挙
for root in itertools.permutations(range(1, N)):
    print("root:", root)
    now_time = 0
    now_time += time[0][root[0]]
    now_city = root[0]

    for i in range(1, N-1):
        to_city = root[i]
        now_time += time[now_city][to_city]
        # print("now_city:", now_city)
        # print("to_city:", to_city)
        now_city = to_city

    # print("now_city2:", now_city)
    now_time += time[now_city][0]
    if now_time == K:
        ans += 1

print(ans)

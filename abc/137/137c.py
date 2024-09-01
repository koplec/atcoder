from collections import defaultdict

N = int(input())

num = defaultdict(int)
for i in range(N):
    s = "".join(sorted(input()))

    num[s] += 1

result = 0
for s in num:
    n = num[s]
    result += n*(n-1) // 2

print(result)
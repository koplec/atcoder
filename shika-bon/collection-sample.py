from collections import defaultdict

a = ["cat", "cow", "dog", "lion", "zebra", "cow"]

num = defaultdict(int)

for s in a:
    num[s] += 1

for key in num:
    print(key, num[key])
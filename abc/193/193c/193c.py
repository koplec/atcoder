N = int(input())
able_num = set()

for a in range (2, 10**5+10):
    for b in range (2, 1000):
        if a**b <= N:
            able_num.add(a**b)
        else:
            break

print(N-len(able_num))
M = 101 

N = int(input())

exist = [0] * M

for i in range(N):
    d = int(input())

    exist[d] = 1

print(sum(exist))
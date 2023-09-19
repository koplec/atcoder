N = int(input())
A = list(map(int, input().split()))
B = list(map(int, input().split()))

#内積の和
prod = 0
for i in range(N):
    prod += A[i]*B[i]

if prod == 0:
    print("Yes")
else:
    print("No")
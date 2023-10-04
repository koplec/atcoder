# 凡人緑本より写経
def Divisor_List(N):
    divisor = []
    i = 1
    while i*i <= N:  # 2乗して無駄なループにならないようにする
        if N % i == 0:
            divisor.append(i)
            if i != N/i:
                divisor.append(int(N/i))
        i += 1
    divisor.sort()
    return divisor


N = int(input())
ans = Divisor_List(N)
for x in ans:
    print(x)

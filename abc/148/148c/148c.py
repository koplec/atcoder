# 最小公倍数問題
# 最小公倍数は、least common multiple
# 最大公約数で、積を割るだけ
import math


def lcm(x, y):
    return (x*y)//math.gcd(x, y)


A, B = map(int, input().split())
print(lcm(A, B))

def g1(x):
    x = str(x)
    x = list(x)
    x.sort(reverse=True)
    x="".join(x)
    return x

def g2(x):
    x = str(x)
    x = list(x)
    x.sort(reverse=False)
    x="".join(x)
    return x

def f(x):
    return g1(x) - g2(x)

N, K = map(int, input().split())

a = N

for i in range(K):
    a = f(a)

print(a)
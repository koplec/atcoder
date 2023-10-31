N = str(int)

amari1 = False  # 余り1となる桁が存在する
amari2 = False  # 余り2となる桁が存在する
amari_all = N % 3  # Nを3で割った余り

for i in range(len(N)):
    keta_num = N[i]
    keta_num = int(keta_num)
    if keta_num % 3 == 1:
        amari1 = True
    if keta_num % 3 == 2:
        amari2 = True

if amari_all == 0:
    print(0)
if amari_all == 1:
    if amari1 == True:
        if len(N) <= 1:
            print(-1)
        else:
            print(1)
    else:  # amari_2 === True!
        if len(N) <= 2:
            print(-1)
        else:
            print(2)
if amari_all == 2:
    if amari1 == True:
        if len(N) <= 2:
            print(-1)
        else:
            print(2)
    else:  # amari_2 === True!
        if len(N) <= 1:
            print(-1)
        else:
            print(1)

S = "AAABBBBBAACDD"
N = len(S)
i = 0
while i < N:
    # 初めてS[j] != S[i]となるところを探す
    j = i
    while j < N and S[j] == S[i]:
        j += 1

    print(S[i], j-i)

    i = j
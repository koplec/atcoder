def judge_ten(x):
    x = str(x)
    if "7" in x:
        return True
    else:
        return False


def judge_eight(x):
    s = ""
    # 8進数表記の作成
    while x > 0:
        # 先頭にどんどんつけていくのでよい
        s = str(x % 8) + s
        # xを8で割った時の商
        x //= 8
    if "7" in s:
        return True
    else:
        return False


N = int(input())

ans = 0

for i in range(1, N+1):
    if judge_ten(i) == False and judge_eight(i) == False:
        ans += 1

print(ans)

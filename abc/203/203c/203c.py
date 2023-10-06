N, K = map(int, input().split())

friends = []
for i in range(N):
    A, B = map(int, input().split())
    friends.append([A, B])

friends.sort()

now_village = 0

# まずK円分進む
now_village += K

# 進んだ村の間に友達がいるか確認する
# いたら、友達からお金をもらう
# お金をもらった分先に進むことができる
for i in range(N):
    friend_village = friends[i][0]
    friend_money = friends[i][1]

    if friend_village < now_village:
        now_village += friend_money
    else:
        break

print(now_village)

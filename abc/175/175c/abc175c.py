
def calculate_min_abs_coord(X, K, D):
   X = abs(X) #Xを正にする、負でも正でも論旨は同じ
   if X - K*D > 0:
    return abs(X-K*D)
   else: #K回移動する途中で0に到達できるとき
    move_count = K - X//D #0に到達する直前の座標まで来た時の残りの移動回数
    jump_before = X - D*(X//D) #上記の時の座標位置　0を飛び越える直前(0含む)
    jump_after = jump_before - D #上記からさらに１回移動したときの座標位置 0を飛び越えた後
    if move_count % 2 == 0: #残りの移動回数が偶数
        return abs(jump_before)
    else:
        return abs(jump_after)

if __name__ == '__main__':
    X, K, D = map(int, input().split())
    print(calculate_min_abs_coord(X, K, D))

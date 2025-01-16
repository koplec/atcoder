N: int =int(input())
S: str =input()
Q: int = int(input())

S = "0" + S
S = list(S)

flip = False #True:入替状態, False:通常状態

for i in range(Q):
    T, A, B = map(int, input().split())
    if T == 1:
        if flip == False:
            S[A], S[B] = S[B], S[A]
        else:
            if A <= N:
                A += N
            else:
                A -= N
            
            if B <= N:
                B += N
            else:
                B -= N

            S[A], S[B] = S[B], S[A]
    # T = 2
    else:
        flip = not flip

S_left = S[1:N+1]
S_right = S[N+1:]   
if flip:
    S = S_right + S_left
else:
    S = S_left + S_right
print("".join(S))
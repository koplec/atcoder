

def compute_result(N, A):
    MOD = 10**9 + 7
    A_sum = sum(A)
    ans = 0

    for i in range(N):
        A_sum -= A[i]
        ans += A[i]*A_sum 
        ans %= MOD
    return ans

if __name__ == '__main__':
    N = int(input())
    A = list(map(int, input().split()))
    ans = compute_result(N, A)
    print(ans)
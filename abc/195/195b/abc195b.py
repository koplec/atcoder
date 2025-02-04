from multiprocessing import Value
from typing import NoReturn

from exceptiongroup import catch

def solve(A:int, B:int, W:int) -> tuple[int, int] | NoReturn:
    min_ans = 10**15
    max_ans = -10**15

    W_g = 1000*W

    for X in range(1, 10**6+10):
        if A*X <= W_g <= B*X :
            min_ans = min(min_ans, X)
            max_ans = max(max_ans, X)
    
    if min_ans == 10**15:
        raise ValueError("UNSATISFIABLE")
    
    return (min_ans, max_ans)

if __name__ == "__main__":
    A, B, W = map(int, input().split())
    try:
        ans = solve(A, B, W)
        print(ans[0], ans[1])
    except ValueError as e:
        print(e)

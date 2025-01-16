
class Solver:
    def __init__(self, N, S):
        self.N = N 
        self.S = "0" + S
        self.S = list(self.S)
        self.flip = False #True:入替状態, False:通常状態

    def query(self, T, A, B):
        if T == 1:
            if self.flip == False:
                self.S[A], self.S[B] = self.S[B], self.S[A]
            else:
                if A <= self.N:
                    A += self.N
                else:
                    A -= self.N
                
                if B <= self.N:
                    B += self.N
                else:
                    B -= self.N

                self.S[A], self.S[B] = self.S[B], self.S[A]
        else:
            self.flip = not self.flip

    def answer(self):
        S_left = self.S[1:self.N+1]
        S_right = self.S[self.N+1:]   
        if self.flip:
            self.S = S_right + S_left
        else:
            self.S = S_left + S_right
        return "".join(self.S)

if __name__ == "__main__":
    N: int =int(input())
    S: str =input()
    Q: int = int(input())


    solver = Solver(N, S)
    for i in range(Q):
        T, A, B = map(int, input().split())
        solver.query(T, A, B)
    print(solver.answer())

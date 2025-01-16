import pytest
from abc199c import Solver

def test_with_example1():
    solver = Solver(N=2, S="FLIP")
    Q = 2

    solver.query(2, 0, 0)
    solver.query(1, 1, 4)

    expected = "LPFI"
    assert expected == solver.answer()


def test_with_example2():
    solver = Solver(N=2, S="FLIP")
    Q = 6

    solver.query(1, 1, 3)
    solver.query(2, 0, 0)
    solver.query(1, 1, 2)
    solver.query(1, 2, 3)
    solver.query(2, 0, 0)
    solver.query(1, 1, 4)

    expected = "ILPF"
    assert expected == solver.answer()
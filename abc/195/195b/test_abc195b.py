import pytest
from abc195b import solve

def test_with_example1():
    A = 100
    B = 200
    W = 2
    expected = (10, 20)
    assert expected == solve(A, B, W)

def test_with_example2():
    A = 120
    B = 150
    W = 2
    expected = (14, 16)
    assert expected == solve(A, B, W)

def test_with_example3():
    A = 300
    B = 333
    W = 1
    with pytest.raises(ValueError) as e:
        solve(A, B, W)
    message = "UNSATISFIABLE"
    assert message == str(e.value)
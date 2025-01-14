import pytest 
from abc175c import calculate_min_abs_coord

def test_with_example1():
    assert 2 == calculate_min_abs_coord(6, 2, 4)

def test_with_example2():
    a = calculate_min_abs_coord(7, 4, 3)
    assert 1 == a

def test_with_example3():
    assert 8 == calculate_min_abs_coord(10, 1, 2)

def test_with_example4():
    assert 1000000000000000 == calculate_min_abs_coord(1000000000000000, 1000000000000000, 1000000000000000)
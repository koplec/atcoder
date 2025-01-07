import pytest
from abc117c import compute_result

def test_with_example1():
    a = compute_result(3, [1,2,3])
    assert 11 == a

def test_with_example2():
    a = compute_result(4, [141421356,17320508,22360679,244949])
    assert a == 437235829
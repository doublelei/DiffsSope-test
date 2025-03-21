"""
Python test file for edge cases.

This file contains examples of Python edge cases like
lambdas and other anonymous functions to test DiffScope's
ability to detect changes in these constructs.
"""

from functools import partial
import operator

# Simple lambda functions
lambda_sum = lambda x, y: x + y
lambda_multiply = lambda x, y: x * y

# Lambda with default parameters
lambda_with_default = lambda x, y=10: x + y

# Lambda assigned to variable with docstring
lambda_with_docstring = lambda x, y: x ** y
lambda_with_docstring.__doc__ = "Returns x raised to the power of y"


def function_with_lambda_arg(func, x, y):
    """
    Execute a function that takes two parameters.
    
    Args:
        func: A function that takes two parameters
        x: First parameter
        y: Second parameter
        
    Returns:
        Result of func(x, y)
    """
    return func(x, y)


# Function with internal lambda
def create_multiplier(factor):
    """
    Create a function that multiplies by a specific factor.
    
    Args:
        factor: The multiplication factor
        
    Returns:
        A function that multiplies its argument by factor
    """
    return lambda x: x * factor


# Function using map with lambda
def square_all(numbers):
    """
    Square all numbers in a list.
    
    Args:
        numbers: List of numbers
        
    Returns:
        List of squared numbers
    """
    return list(map(lambda x: x**2, numbers))


# Function using filter with lambda
def filter_positive(numbers):
    """
    Filter positive numbers from a list.
    
    Args:
        numbers: List of numbers
        
    Returns:
        List of positive numbers
    """
    return list(filter(lambda x: x > 0, numbers))


# Function using sorted with lambda
def sort_by_second_item(pairs):
    """
    Sort pairs by their second item.
    
    Args:
        pairs: List of tuples/lists with at least 2 items
        
    Returns:
        Sorted list of pairs
    """
    return sorted(pairs, key=lambda pair: pair[1])


# Partial functions
add_five = partial(operator.add, 5)
multiply_by_ten = partial(operator.mul, 10)


# Function returning multiple lambdas
def get_math_funcs():
    """
    Return basic math functions as lambdas.
    
    Returns:
        Tuple of (add, subtract, multiply, divide) functions
    """
    return (
        lambda a, b: a + b,
        lambda a, b: a - b,
        lambda a, b: a * b,
        lambda a, b: a / b if b != 0 else None
    )


if __name__ == "__main__":
    # Test lambdas
    assert lambda_sum(5, 3) == 8
    assert lambda_multiply(5, 3) == 15
    
    # Test function with lambda arg
    assert function_with_lambda_arg(lambda x, y: x - y, 10, 7) == 3
    
    # Test lambda generator
    double = create_multiplier(2)
    assert double(5) == 10
    
    # Test map, filter, and sorted
    assert square_all([1, 2, 3, 4]) == [1, 4, 9, 16]
    assert filter_positive([-2, 0, 3, -1, 5]) == [3, 5]
    assert sort_by_second_item([(1, 'b'), (2, 'a'), (3, 'c')]) == [(2, 'a'), (1, 'b'), (3, 'c')]
    
    # Test partials
    assert add_five(10) == 15
    assert multiply_by_ten(7) == 70
    
    # Test multiple lambdas
    add, subtract, multiply, divide = get_math_funcs()
    assert add(5, 3) == 8
    assert subtract(5, 3) == 2
    assert multiply(5, 3) == 15
    assert divide(15, 3) == 5

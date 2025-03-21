"""
Python test file for function signature changes.

This file contains functions that will have their signatures modified in various ways
to test DiffScope's ability to detect signature-level changes.
"""


def function_for_param_addition(a, b, c=0, d=None, **kwargs):
    """
    This function will have parameters added in a later commit.
    
    Args:
        a: First parameter
        b: Second parameter
        c: Third parameter (added)
        d: Fourth parameter (added)
        **kwargs: Additional keyword arguments (added)
        
    Returns:
        Sum of parameters and count of kwargs
    """
    result = a + b
    if c:
        result += c
    
    # Count the kwargs
    kwargs_count = len(kwargs)
    
    return result + kwargs_count


def function_for_param_removal(a, b):
    """
    This function will have parameters removed in a later commit.
    
    Args:
        a: First parameter
        b: Second parameter
        
    Returns:
        Sum of remaining parameters
    """
    # The c and d parameters have been removed
    return a + b


def function_for_param_rename(first, second):
    """
    A function designed to test parameter renames.
    
    Parameters:
    first (int): First parameter (renamed from a)
    second (int): Second parameter (renamed from b)
    
    Returns:
    int: Sum of the parameters
    """
    return first + second


def function_for_default_param_change(a, b=20, c=30):
    """
    A function designed to test default parameter value changes.
    
    Parameters:
    a (int): First parameter (no default)
    b (int): Second parameter (default changed from 10 to 20)
    c (int): Third parameter (default changed from 5 to 30)
    
    Returns:
    int: Sum of all parameters
    """
    return a + b + c


def function_with_type_annotations(a: int, b: str) -> str:
    """
    This function has type annotations that will be modified.
    
    Args:
        a: An integer
        b: A string
        
    Returns:
        A string with the integer repeated by specified amount
    """
    return b * a


def function_with_args_kwargs(*args, **kwargs):
    """
    This function uses *args and **kwargs and will be modified.
    
    Args:
        *args: Positional arguments
        **kwargs: Keyword arguments
        
    Returns:
        Dictionary containing args and kwargs
    """
    return {
        "args": args,
        "kwargs": kwargs
    }


def function_with_multiple_signature_changes(a, b, c=None):
    """
    This function will undergo multiple signature changes at once.
    
    Args:
        a: First parameter
        b: Second parameter
        c: Optional third parameter
        
    Returns:
        Dictionary containing parameter values
    """
    result = {
        "a": a,
        "b": b
    }
    
    if c is not None:
        result["c"] = c
        
    return result 
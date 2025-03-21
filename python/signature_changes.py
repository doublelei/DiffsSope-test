"""
Python test file for function signature changes.

This file contains functions that will have their signatures modified in various ways
to test DiffScope's ability to detect signature-level changes.
"""


def function_for_param_addition(a, b):
    """
    This function will have parameters added in a later commit.
    
    Args:
        a: First parameter
        b: Second parameter
        
    Returns:
        Sum of parameters
    """
    return a + b


def function_for_param_removal(a, b, c, d):
    """
    This function will have parameters removed in a later commit.
    
    Args:
        a: First parameter
        b: Second parameter
        c: Third parameter (will be removed)
        d: Fourth parameter (will be removed)
        
    Returns:
        Sum of all parameters
    """
    return a + b + c + d


def function_for_param_rename(first_num, second_num):
    """
    This function will have parameters renamed in a later commit.
    
    Args:
        first_num: First number parameter (will be renamed)
        second_num: Second number parameter (will be renamed)
        
    Returns:
        Product of parameters
    """
    return first_num * second_num


def function_for_default_param_change(name, greeting="Hello", punctuation="!"):
    """
    This function will have default parameter values changed in a later commit.
    
    Args:
        name: The name to greet
        greeting: The greeting to use (default: "Hello")
        punctuation: The punctuation to use (default: "!")
        
    Returns:
        A formatted greeting string
    """
    return f"{greeting}, {name}{punctuation}"


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
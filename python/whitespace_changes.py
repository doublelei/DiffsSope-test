"""
Python test file for whitespace-only function changes.

This file contains functions with various indentation and whitespace styles
to test DiffScope's ability to detect or ignore whitespace-only changes.
"""


def function_with_normal_whitespace(a, b, c):
    """
    A function with normal whitespace that will have whitespace changes later.
    
    Args:
        a: First parameter
        b: Second parameter
        c: Third parameter
        
    Returns:
        Sum of all parameters
    """
    result = a + b
    result += c
    return result


def function_with_compact_whitespace(a,b,c):
    """A function with compact whitespace that will have whitespace changes later.
    
    Args:
        a: First parameter
        b: Second parameter
        c: Third parameter
        
    Returns:
        Product of all parameters
    """
    return a*b*c


def function_with_excessive_whitespace(a,    b,     c):
    """
    A function with excessive whitespace between parameters.
    
    Args:
        a: First parameter
        b: Second parameter
        c: Third parameter
        
    Returns:
        String representation of parameters
    """
    result  =  str(a)  +  "  "  +  str(b)  +  "  "  +  str(c)
    return   result


def function_with_unusual_indentation(a, b):
    """
    A function with unusual indentation that will be changed later.
    
    Args:
        a: First parameter
        b: Second parameter
        
    Returns:
        Dictionary of parameter values
    """
    if a > b:
            result = {"larger": a, "smaller": b}
    else:
       result = {"larger": b, "smaller": a}
    return result 
"""
Python test file for function docstring changes.

This file contains functions whose docstrings will be modified
to test DiffScope's ability to detect docstring-level changes.
"""

def function_with_simple_docstring():
    """
    A simple function with a basic docstring.
    
    This docstring will be modified to test detection of simple
    docstring changes without changing function signature or body.
    """
    return "Hello, world!"


def function_with_complex_docstring(a, b, c=None):
    """
    A function with a more complex docstring.
    
    This docstring contains parameter descriptions and return value
    information that will be modified in a later commit.
    
    Args:
        a: First parameter
        b: Second parameter
        c: Optional third parameter
    
    Returns:
        A dictionary containing the parameter values
    
    Raises:
        ValueError: If parameters don't meet requirements
    """
    if a < 0 or b < 0:
        raise ValueError("Parameters must be non-negative")
    
    result = {
        "a": a,
        "b": b
    }
    
    if c is not None:
        result["c"] = c
        
    return result


def function_with_epydoc_docstring(param1, param2):
    """
    A function with epydoc-style docstring.
    
    @param param1: The first parameter
    @type param1: int
    @param param2: The second parameter
    @type param2: str
    @return: A formatted string
    @rtype: str
    """
    return f"{param1}: {param2}"


def function_with_numpy_docstring(x, y):
    """
    A function with NumPy-style docstring.
    
    Parameters
    ----------
    x : int
        The x value
    y : int
        The y value
        
    Returns
    -------
    int
        The sum of x and y
    """
    return x + y


def function_with_google_docstring(data, scale=1.0):
    """
    A function with Google-style docstring.
    
    Args:
        data (list): List of numeric values to process
        scale (float, optional): Scaling factor. Defaults to 1.0.
        
    Returns:
        list: Scaled data values
        
    Examples:
        >>> function_with_google_docstring([1, 2, 3], 2.0)
        [2.0, 4.0, 6.0]
    """
    return [item * scale for item in data]


def function_with_minimal_docstring():
    """Basic docstring with minimal content."""
    return 42

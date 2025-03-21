"""
Python test file for function docstring changes.

This file contains functions whose docstrings have been modified
to test DiffScope's ability to detect docstring-level changes.
Now updated with more comprehensive information.
"""

def function_with_simple_docstring():
    """
    A simple function with a modified basic docstring.
    
    This docstring has been updated to test DiffScope's detection 
    of simple docstring changes without changing function signature or body.
    The content has been altered but the function remains the same.
    """
    return "Hello, world!"


def function_with_complex_docstring(a, b, c=None):
    """
    A function with a more detailed complex docstring.
    
    This docstring has been updated with enhanced parameter descriptions
    and more comprehensive return value information.
    
    Args:
        a (int): First parameter - must be a positive integer
        b (int): Second parameter - must be a positive integer
        c (Any, optional): Optional third parameter. Defaults to None.
    
    Returns:
        dict: A dictionary containing the parameter values with the
        following keys:
            - 'a': Value of parameter a
            - 'b': Value of parameter b
            - 'c': Value of parameter c (if provided)
    
    Raises:
        ValueError: If parameters a or b are negative
        TypeError: If parameters are of incorrect type
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
    An updated function with epydoc-style docstring.
    
    @param param1: The first parameter (updated description)
    @type param1: int or float
    @param param2: The second parameter (updated description)
    @type param2: str or None
    @return: A formatted string with colon separator
    @rtype: str
    @raises TypeError: If param2 is not a string
    """
    return f"{param1}: {param2}"


def function_with_numpy_docstring(x, y):
    """
    A function with updated NumPy-style docstring.
    
    Parameters
    ----------
    x : int or float
        The x value (horizontal coordinate)
    y : int or float
        The y value (vertical coordinate)
        
    Returns
    -------
    float
        The sum of x and y coordinates
        
    Notes
    -----
    This function performs simple addition but demonstrates
    NumPy-style docstrings.
    """
    return x + y


def function_with_google_docstring(data, scale=1.0):
    """
    An enhanced function with Google-style docstring.
    
    This docstring demonstrates Google-style formatting with
    more detailed sections and examples.
    
    Args:
        data (list[float]): List of numeric values to process
        scale (float, optional): Scaling factor to apply to each value. 
            Defaults to 1.0.
        
    Returns:
        list[float]: List containing scaled data values
        
    Raises:
        TypeError: If data is not a list or scale is not a number
        
    Examples:
        >>> function_with_google_docstring([1, 2, 3], 2.0)
        [2.0, 4.0, 6.0]
        
        >>> function_with_google_docstring([0.5, 1.5], 10)
        [5.0, 15.0]
    """
    return [item * scale for item in data]


def function_with_minimal_docstring():
    """Enhanced docstring that was previously minimal."""
    return 42

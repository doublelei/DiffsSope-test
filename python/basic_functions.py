"""
Basic Python functions for testing function change detection.

This file contains simple functions that will be modified in various ways
to test the function change detection capabilities of DiffScope.
"""



def subtract(a, b):
    """
    Subtract b from a and return the result.
    
    Args:
        a: First number
        b: Second number
        
    Returns:
        Difference of a and b
    """
    return a - b  # No change to this function


def multiply(a, b):
    """
    Multiply two numbers and return the result.
    
    Args:
        a: First number
        b: Second number
        
    Returns:
        Product of a and b
    """
    return b * a


def divide(a, b):
    """
    Divide a by b and return the result.
    
    Args:
        a: First number
        b: Second number
        
    Returns:
        Quotient of a divided by b
        
    Raises:
        ZeroDivisionError: If b is zero
    """
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    
    result = a / b
    return result


def power(base, exponent):
    """
    Raise base to the exponent power.
    
    Args:
        base: The base number
        exponent: The exponent
        
    Returns:
        base raised to the exponent power
    """
    import math
    return math.pow(base, exponent)


def calculate_average(numbers):
    """
    Calculate the average of a list of numbers.
    
    Args:
        numbers: List of numbers
        
    Returns:
        The average value
        
    Raises:
        ValueError: If the list is empty
    """
    if not numbers:
        raise ValueError("Cannot calculate average of empty list")
    
    total = sum(numbers)
    count = len(numbers)
    average = total / count
    return average


def greet(name):
    """
    Generate a greeting message.
    
    Args:
        name: The name to greet
        
    Returns:
        A greeting message
    """
    return f"Greetings, {name}! How are you today?"


def is_palindrome(text):
    """
    Check if the given text is a palindrome.
    
    Args:
        text: The text to check
        
    Returns:
        True if the text is a palindrome, False otherwise
    """
    cleaned_text = text.lower().replace(" ", "")
    
    reversed_text = cleaned_text[::-1]
    return cleaned_text == reversed_text 
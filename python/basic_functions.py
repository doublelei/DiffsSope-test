"""
Basic Python functions for testing function change detection.

This file contains simple functions that will be modified in various ways
to test the function change detection capabilities of DiffScope.
"""


def add(a, b):
    """
    Add two numbers and return the result.
    
    Args:
        a: First number
        b: Second number
        
    Returns:
        Sum of a and b
    """
    return a + b


def subtract(a, b):
    """
    Subtract b from a and return the result.
    
    Args:
        a: First number
        b: Second number
        
    Returns:
        Difference of a and b
    """
    return a - b


def multiply(a, b):
    """
    Multiply two numbers and return the result.
    
    Args:
        a: First number
        b: Second number
        
    Returns:
        Product of a and b
    """
    return a * b


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
    return a / b


def power(base, exponent):
    """
    Raise base to the exponent power.
    
    Args:
        base: The base number
        exponent: The exponent
        
    Returns:
        base raised to the exponent power
    """
    return base ** exponent


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
    return sum(numbers) / len(numbers)


def greet(name):
    """
    Generate a greeting message.
    
    Args:
        name: The name to greet
        
    Returns:
        A greeting message
    """
    return f"Hello, {name}!"


def is_palindrome(text):
    """
    Check if the given text is a palindrome.
    
    Args:
        text: The text to check
        
    Returns:
        True if the text is a palindrome, False otherwise
    """
    # Remove spaces and convert to lowercase
    text = text.lower().replace(" ", "")
    return text == text[::-1] 
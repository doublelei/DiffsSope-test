"""
Utility functions for DiffScope test repository.
This file is used to test file addition functionality.
"""

import time
import os
import math


def calculate_factorial(n):
    """
    Calculate the factorial of a number.
    
    Args:
        n (int): The number to calculate factorial for
        
    Returns:
        int: The factorial result
    """
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)


def is_prime(num):
    """
    Check if a number is prime.
    
    Args:
        num (int): The number to check
        
    Returns:
        bool: True if prime, False otherwise
    """
    if num <= 1:
        return False
    if num <= 3:
        return True
    
    if num % 2 == 0 or num % 3 == 0:
        return False
    
    i = 5
    while i * i <= num:
        if num % i == 0 or num % (i + 2) == 0:
            return False
        i += 6
    
    return True


def get_timestamp():
    """
    Get the current timestamp.
    
    Returns:
        float: Current timestamp
    """
    return time.time()


def file_exists(filepath):
    """
    Check if a file exists.
    
    Args:
        filepath (str): Path to the file
        
    Returns:
        bool: True if file exists, False otherwise
    """
    return os.path.exists(filepath)


def celsius_to_fahrenheit(celsius):
    """
    Convert Celsius to Fahrenheit.
    
    Args:
        celsius (float): Temperature in Celsius
        
    Returns:
        float: Temperature in Fahrenheit
    """
    return (celsius * 9/5) + 32 
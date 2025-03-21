"""
Python test file for function rename tests.

This file contains functions that will be renamed in various ways
to test DiffScope's ability to detect function renames.
"""

def new_name_simple_function(x, y):
    """
    A simple function with a basic implementation that will be renamed.
    
    Args:
        x: First parameter
        y: Second parameter
        
    Returns:
        Sum of the parameters
    """
    return x + y


def renamed_function_with_body_changes(a, b, c=0):
    """
    A function that will be renamed and have its body modified.
    
    Args:
        a: First parameter
        b: Second parameter
        c: Optional third parameter, defaults to 0
        
    Returns:
        Sum of parameters with additional processing
    """
    result = a + b  # Start with base result
    
    # Apply optional parameter with additional logic
    if c != 0:
        result += c * 2  # Changed multiplication factor
        
    return result  # Return the final result


def enhanced_data_processor(data, min_threshold=0.5, max_threshold=1.0, config=None):
    """
    A complex function that will be renamed and have signature changes.
    
    Args:
        data: Input data to process
        min_threshold: Minimum threshold for filtering, defaults to 0.5
        max_threshold: Maximum threshold for filtering, defaults to 1.0
        config: Optional configuration dictionary
        
    Returns:
        Processed data
    """
    result = []
    
    for item in data:
        if min_threshold <= item <= max_threshold:
            result.append(item * 2)
            if config and config.get('logging'):
                config['logger'].info(f"Processed item: {item}")
                
    return result


def helper_function_old():
    """
    A helper function that will be renamed.
    
    Returns:
        A helpful message
    """
    return "I am a helper function"


def utility_function_original(text):
    """
    A utility function that will be renamed.
    
    Args:
        text: Text to process
        
    Returns:
        Processed text
    """
    return text.strip().lower()

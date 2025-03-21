"""
This file will be renamed to demonstrate file rename functionality.
"""

def will_be_renamed_function(a, b):
    """
    A simple function that will be part of file rename test.
    
    Args:
        a (int): First number
        b (int): Second number
        
    Returns:
        int: Sum of a and b
    """
    return a + b


def another_function():
    """
    Another function in the file that will be renamed.
    
    Returns:
        str: A simple message
    """
    return "This file will be renamed later"


class TestClass:
    """A test class in a file that will be renamed."""
    
    def __init__(self, name):
        self.name = name
        
    def get_name(self):
        """Get the name attribute."""
        return self.name
        
    def set_name(self, new_name):
        """Set the name attribute."""
        self.name = new_name 
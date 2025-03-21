"""
Python test file for nested functions.

This file contains examples of nested function definitions
and closures to test DiffScope's ability to detect changes
in nested function structures.
"""

def outer_function_simple(x):
    """
    A simple outer function with a nested function.
    
    Args:
        x: Input value
        
    Returns:
        Result of inner function
    """
    def inner_function(y):
        """Inner function that adds x and y."""
        return x + y
    
    return inner_function(10)


def create_counter():
    """
    Create a counter with increment, decrement, and get methods.
    
    Returns:
        A dictionary containing counter methods
    """
    count = 0
    
    def increment():
        """Increment counter by 1."""
        nonlocal count
        count += 1
        return count
    
    def decrement():
        """Decrement counter by 1."""
        nonlocal count
        count -= 1
        return count
    
    def get_count():
        """Get current counter value."""
        return count
    
    def reset():
        """Reset counter to 0."""
        nonlocal count
        count = 0
        return count
    
    return {
        "increment": increment,
        "decrement": decrement,
        "get_count": get_count,
        "reset": reset
    }


def create_adder(x):
    """
    Create a function that adds x to its argument.
    
    Args:
        x: Value to add
        
    Returns:
        A function that adds x to its argument
    """
    def adder(y):
        """Add x to y."""
        return x + y
    
    return adder


def create_multiplier(x):
    """
    Create a function that multiplies its argument by x.
    
    Args:
        x: Multiplication factor
        
    Returns:
        A function that multiplies its argument by x
    """
    def multiplier(y):
        """Multiply y by x."""
        return x * y
    
    return multiplier


def create_power_function(exponent):
    """
    Create a function that raises its argument to the given exponent.
    
    Args:
        exponent: The exponent to use
        
    Returns:
        A function that raises its argument to the given exponent
    """
    def power_function(base):
        """Raise base to exponent."""
        return base ** exponent
    
    return power_function


def create_sequence_processor():
    """
    Create a collection of sequence processing functions.
    
    Returns:
        A dictionary containing sequence processing functions
    """
    def map_sequence(sequence, func):
        """
        Apply func to each element of the sequence.
        
        Args:
            sequence: Input sequence
            func: Function to apply
            
        Returns:
            List containing func applied to each element
        """
        return [func(item) for item in sequence]
    
    def filter_sequence(sequence, predicate):
        """
        Filter sequence by predicate.
        
        Args:
            sequence: Input sequence
            predicate: Function that returns True/False
            
        Returns:
            List containing elements for which predicate is True
        """
        return [item for item in sequence if predicate(item)]
    
    def reduce_sequence(sequence, func, initial=None):
        """
        Reduce sequence using func and initial value.
        
        Args:
            sequence: Input sequence
            func: Binary function to apply cumulatively
            initial: Initial value (default: None)
            
        Returns:
            Accumulated result
        """
        result = initial
        for item in sequence:
            if result is None:
                result = item
            else:
                result = func(result, item)
        return result
    
    return {
        "map": map_sequence,
        "filter": filter_sequence,
        "reduce": reduce_sequence
    }


def function_with_multiple_levels():
    """
    A function with multiple levels of nested functions.
    
    Returns:
        A function that creates nested functions
    """
    def level1(x):
        """First level nested function."""
        def level2(y):
            """Second level nested function."""
            def level3(z):
                """Third level nested function."""
                return x + y + z
            return level3
        return level2
    return level1


if __name__ == "__main__":
    # Test simple nested function
    assert outer_function_simple(5) == 15
    
    # Test counter
    counter = create_counter()
    assert counter["get_count"]() == 0
    counter["increment"]()
    counter["increment"]()
    assert counter["get_count"]() == 2
    counter["decrement"]()
    assert counter["get_count"]() == 1
    counter["reset"]()
    assert counter["get_count"]() == 0
    
    # Test adder and multiplier
    add_five = create_adder(5)
    assert add_five(10) == 15
    
    double = create_multiplier(2)
    assert double(7) == 14
    
    # Test power function
    square = create_power_function(2)
    cube = create_power_function(3)
    assert square(4) == 16
    assert cube(2) == 8
    
    # Test sequence processor
    seq_proc = create_sequence_processor()
    numbers = [1, 2, 3, 4, 5]
    assert seq_proc["map"](numbers, lambda x: x * 2) == [2, 4, 6, 8, 10]
    assert seq_proc["filter"](numbers, lambda x: x % 2 == 0) == [2, 4]
    assert seq_proc["reduce"](numbers, lambda x, y: x + y) == 15
    
    # Test multiple levels
    level1_func = function_with_multiple_levels()
    level2_func = level1_func(10)
    level3_func = level2_func(20)
    assert level3_func(30) == 60

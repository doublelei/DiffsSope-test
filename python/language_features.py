"""
Python test file for language-specific features.

This file contains examples of Python-specific language features
like decorators, generators, context managers, descriptors, and
property accessors to test DiffScope's ability to detect changes
in these language constructs.
"""

import functools
import time
import logging
from typing import List, Dict, Any, Callable, Generator, Optional


# ----- Decorators -----

def log_execution(func):
    """
    Decorator that logs function execution.
    
    Args:
        func: The function to decorate
        
    Returns:
        Decorated function that logs execution
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Executing {func.__name__} with args: {args}, kwargs: {kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned: {result}")
        return result
    return wrapper


def timer_decorator(func):
    """
    Decorator that times function execution.
    
    Args:
        func: The function to decorate
        
    Returns:
        Decorated function that times execution
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start_time:.4f} seconds to run")
        return result
    return wrapper


def memoize(func):
    """
    Decorator that caches function results.
    
    Args:
        func: The function to decorate
        
    Returns:
        Decorated function with caching
    """
    cache = {}
    
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # Convert kwargs to frozenset for hashability
        key = (args, frozenset(kwargs.items()))
        if key not in cache:
            cache[key] = func(*args, **kwargs)
        return cache[key]
    
    return wrapper


def decorator_with_arguments(prefix="", suffix=""):
    """
    Decorator factory that creates decorators with arguments.
    
    Args:
        prefix: Prefix to add to function result
        suffix: Suffix to add to function result
        
    Returns:
        Decorator that adds prefix and suffix to function result
    """
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            result = func(*args, **kwargs)
            if isinstance(result, str):
                return f"{prefix}{result}{suffix}"
            return result
        return wrapper
    return decorator


class ClassDecorator:
    """Class-based decorator example."""
    
    def __init__(self, func):
        """Store the function to decorate."""
        self.func = func
        functools.update_wrapper(self, func)
    
    def __call__(self, *args, **kwargs):
        """Call the decorated function with uppercase result if string."""
        result = self.func(*args, **kwargs)
        if isinstance(result, str):
            return result.upper()
        return result


# ----- Generator Functions -----

def fibonacci_generator(n: int) -> Generator[int, None, None]:
    """
    Generate first n Fibonacci numbers.
    
    Args:
        n: Number of Fibonacci numbers to generate
        
    Yields:
        Next Fibonacci number
    """
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b


def infinite_counter(start: int = 0, step: int = 1) -> Generator[int, None, None]:
    """
    Generate an infinite sequence of numbers.
    
    Args:
        start: Starting value
        step: Step size
        
    Yields:
        Next number in the sequence
    """
    value = start
    while True:
        yield value
        value += step


def read_file_lazy(filename: str, chunk_size: int = 1024) -> Generator[str, None, None]:
    """
    Lazily read a file in chunks.
    
    Args:
        filename: Name of file to read
        chunk_size: Size of chunks to read
        
    Yields:
        Next chunk of the file
    """
    with open(filename, 'r') as file:
        while True:
            data = file.read(chunk_size)
            if not data:
                break
            yield data


# ----- Context Managers -----

class Timer:
    """Context manager for timing a block of code."""
    
    def __enter__(self):
        """Start the timer."""
        self.start = time.time()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Stop the timer and print the elapsed time."""
        self.end = time.time()
        self.elapsed = self.end - self.start
        print(f"Elapsed time: {self.elapsed:.4f} seconds")


class LoggingContextManager:
    """Context manager for logging entry and exit from a code block."""
    
    def __init__(self, logger, level=logging.INFO, entry_message="", exit_message=""):
        """Initialize with logger and messages."""
        self.logger = logger
        self.level = level
        self.entry_message = entry_message
        self.exit_message = exit_message
    
    def __enter__(self):
        """Log entry message."""
        if self.entry_message:
            self.logger.log(self.level, self.entry_message)
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Log exit message and any exception."""
        if exc_type is not None:
            self.logger.error(f"Exception occurred: {exc_val}")
        if self.exit_message:
            self.logger.log(self.level, self.exit_message)


# ----- Descriptors -----

class TypedProperty:
    """Descriptor that enforces type checking."""
    
    def __init__(self, name, property_type):
        """Initialize with property name and type."""
        self.name = f"_{name}"
        self.property_type = property_type
    
    def __get__(self, instance, owner):
        """Get the property value."""
        if instance is None:
            return self
        return getattr(instance, self.name)
    
    def __set__(self, instance, value):
        """Set the property value with type checking."""
        if not isinstance(value, self.property_type):
            raise TypeError(f"Expected {self.property_type}, got {type(value)}")
        setattr(instance, self.name, value)


class RangeProperty:
    """Descriptor that enforces a range for numeric values."""
    
    def __init__(self, name, min_value=None, max_value=None):
        """Initialize with property name and range."""
        self.name = f"_{name}"
        self.min_value = min_value
        self.max_value = max_value
    
    def __get__(self, instance, owner):
        """Get the property value."""
        if instance is None:
            return self
        return getattr(instance, self.name)
    
    def __set__(self, instance, value):
        """Set the property value with range checking."""
        if self.min_value is not None and value < self.min_value:
            raise ValueError(f"Value must be >= {self.min_value}")
        if self.max_value is not None and value > self.max_value:
            raise ValueError(f"Value must be <= {self.max_value}")
        setattr(instance, self.name, value)


# ----- Classes with Properties -----

class Person:
    """Class with property accessors."""
    
    def __init__(self, name, age):
        """Initialize with name and age."""
        self._name = name
        self._age = age
    
    @property
    def name(self):
        """Get the person's name."""
        return self._name
    
    @name.setter
    def name(self, value):
        """Set the person's name with validation."""
        if not value:
            raise ValueError("Name cannot be empty")
        self._name = value
    
    @property
    def age(self):
        """Get the person's age."""
        return self._age
    
    @age.setter
    def age(self, value):
        """Set the person's age with validation."""
        if value < 0:
            raise ValueError("Age cannot be negative")
        self._age = value
    
    @property
    def is_adult(self):
        """Check if the person is an adult."""
        return self._age >= 18


class TypedObject:
    """Class with typed properties using descriptors."""
    
    name = TypedProperty("name", str)
    age = TypedProperty("age", int)
    scores = TypedProperty("scores", list)


class Temperature:
    """Class with temperature conversion properties."""
    
    def __init__(self, celsius=0):
        """Initialize with temperature in Celsius."""
        self._celsius = celsius
    
    @property
    def celsius(self):
        """Get the temperature in Celsius."""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        """Set the temperature in Celsius."""
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """Get the temperature in Fahrenheit."""
        return (self._celsius * 9/5) + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        """Set the temperature from Fahrenheit."""
        self._celsius = (value - 32) * 5/9
    
    @property
    def kelvin(self):
        """Get the temperature in Kelvin."""
        return self._celsius + 273.15
    
    @kelvin.setter
    def kelvin(self, value):
        """Set the temperature from Kelvin."""
        self._celsius = value - 273.15


# ----- Usage Examples -----

@log_execution
def example_decorated_function(x, y):
    """Example function with a decorator."""
    return x + y


@timer_decorator
def slow_function(n):
    """Slow function to demonstrate timer decorator."""
    time.sleep(n)
    return n ** 2


@memoize
def factorial(n):
    """Calculate factorial with memoization."""
    if n <= 1:
        return 1
    return n * factorial(n-1)


@decorator_with_arguments(prefix="<", suffix=">")
def format_string(s):
    """Format a string with prefix and suffix."""
    return s


@ClassDecorator
def lowercase_function(s):
    """Function that returns lowercase string."""
    return s.lower()


if __name__ == "__main__":
    # Test decorators
    example_decorated_function(5, 3)
    slow_function(0.1)
    print(f"Factorial of 5: {factorial(5)}")
    print(f"Formatted string: {format_string('hello')}")
    print(f"Uppercase result: {lowercase_function('hello world')}")
    
    # Test generators
    print("Fibonacci sequence:")
    for num in fibonacci_generator(10):
        print(num, end=" ")
    print()
    
    counter = infinite_counter(start=5, step=2)
    print("Infinite counter (first 5 values):")
    for _ in range(5):
        print(next(counter), end=" ")
    print()
    
    # Test context managers
    with Timer() as timer:
        time.sleep(0.1)
    print(f"Timer measured: {timer.elapsed:.4f} seconds")
    
    # Test property accessors
    person = Person("Alice", 25)
    print(f"{person.name} is {person.age} years old")
    print(f"Is {person.name} an adult? {person.is_adult}")
    
    person.age = 16
    print(f"After age change, is {person.name} an adult? {person.is_adult}")
    
    # Test typed object
    typed_obj = TypedObject()
    typed_obj.name = "Bob"
    typed_obj.age = 30
    typed_obj.scores = [85, 90, 95]
    
    # Test temperature conversions
    temp = Temperature(25)
    print(f"{temp.celsius}°C = {temp.fahrenheit}°F = {temp.kelvin}K")
    
    temp.fahrenheit = 68
    print(f"{temp.celsius}°C = {temp.fahrenheit}°F = {temp.kelvin}K")

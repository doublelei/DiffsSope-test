"""
Complex Python functions for testing more advanced function change detection.

This file contains more complex functions that will be modified in various ways
to test the function change detection capabilities of DiffScope.
"""

import re
from typing import List, Dict, Optional, Tuple, Any
import math
import datetime


def fibonacci(n: int) -> List[int]:
    """
    Generate a Fibonacci sequence up to n terms.
    
    Args:
        n: Number of terms to generate
        
    Returns:
        List containing the Fibonacci sequence
    """
    sequence = [0, 1]
    
    if n <= 0:
        return []
    if n == 1:
        return [0]
    
    while len(sequence) < n:
        next_value = sequence[-1] + sequence[-2]
        sequence.append(next_value)
    
    return sequence


def parse_date(date_string: str) -> Optional[datetime.datetime]:
    """
    Parse a date string in various formats.
    
    Args:
        date_string: String representation of date
        
    Returns:
        Datetime object or None if parsing fails
    """
    formats = [
        "%Y-%m-%d",
        "%d/%m/%Y",
        "%m/%d/%Y",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%dT%H:%M:%S",
    ]
    
    for fmt in formats:
        try:
            return datetime.datetime.strptime(date_string, fmt)
        except ValueError:
            continue
    
    return None


def extract_emails(text: str) -> List[str]:
    """
    Extract all email addresses from a text.
    
    Args:
        text: Text to search for emails
        
    Returns:
        List of email addresses found
    """
    pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    emails = re.findall(pattern, text)
    return emails


class DataProcessor:
    """Class for processing data with multiple methods."""
    
    def __init__(self, data: List[Dict]):
        """Initialize with data."""
        self.data = data
        self.processed = False
    
    def filter_data(self, key: str, value: Any) -> List[Dict]:
        """
        Filter data items by key-value pair.
        
        Args:
            key: The key to filter on
            value: The value to match
            
        Returns:
            Filtered list of dictionaries
        """
        return [item for item in self.data if item.get(key) == value]
    
    def sort_data(self, key: str, reverse: bool = False) -> List[Dict]:
        """
        Sort data by a specific key.
        
        Args:
            key: The key to sort by
            reverse: Whether to sort in reverse order
            
        Returns:
            Sorted list of dictionaries
        """
        return sorted(self.data, key=lambda x: x.get(key), reverse=reverse)
    
    def aggregate_data(self, group_by: str, aggregate_field: str) -> Dict[Any, List]:
        """
        Group data by a field and aggregate another field.
        
        Args:
            group_by: Field to group by
            aggregate_field: Field to aggregate
            
        Returns:
            Dictionary with groups as keys and lists of aggregated values
        """
        result = {}
        
        for item in self.data:
            key = item.get(group_by)
            value = item.get(aggregate_field)
            
            if key not in result:
                result[key] = []
            
            if value is not None:
                result[key].append(value)
        
        return result
    
    def process(self) -> None:
        """Process the data and mark as processed."""
        # Perform some processing
        self.processed = True


def calculate_statistics(numbers: List[float]) -> Dict[str, float]:
    """
    Calculate various statistics for a list of numbers.
    
    Args:
        numbers: List of numbers
        
    Returns:
        Dictionary containing statistics (mean, median, std_dev, min, max)
    """
    if not numbers:
        return {
            "mean": 0,
            "median": 0,
            "std_dev": 0,
            "min": 0,
            "max": 0,
        }
    
    # Calculate mean
    mean = sum(numbers) / len(numbers)
    
    # Calculate median
    sorted_numbers = sorted(numbers)
    n = len(sorted_numbers)
    if n % 2 == 0:
        median = (sorted_numbers[n//2 - 1] + sorted_numbers[n//2]) / 2
    else:
        median = sorted_numbers[n//2]
    
    # Calculate standard deviation
    variance = sum((x - mean) ** 2 for x in numbers) / len(numbers)
    std_dev = math.sqrt(variance)
    
    return {
        "mean": mean,
        "median": median,
        "std_dev": std_dev,
        "min": min(numbers),
        "max": max(numbers),
    } 
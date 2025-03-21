"""
Complex Python functions for testing more advanced function change detection.

This file contains more complex functions that will be modified in various ways
to test the function change detection capabilities of DiffScope.
"""

import re
from typing import List, Dict, Optional, Tuple, Any, Set, Union
import math
import datetime
import logging


def fibonacci(n: int) -> List[int]:
    """
    Generate a Fibonacci sequence up to n terms.
    
    Args:
        n: Number of terms to generate
        
    Returns:
        List containing the Fibonacci sequence
    """
    # Added more efficient implementation with memoization
    memo = {0: 0, 1: 1}
    
    def fib_memo(k: int) -> int:
        if k not in memo:
            memo[k] = fib_memo(k-1) + fib_memo(k-2)
        return memo[k]
    
    if n <= 0:
        return []
    if n == 1:
        return [0]
    
    return [fib_memo(i) for i in range(n)]


def parse_date(date_string: str) -> Optional[datetime.datetime]:
    """
    Parse a date string in various formats.
    
    Args:
        date_string: String representation of date
        
    Returns:
        Datetime object or None if parsing fails
    """
    # Added more formats and error logging
    formats = [
        "%Y-%m-%d",
        "%d/%m/%Y",
        "%m/%d/%Y",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%dT%H:%M:%S",
        "%d-%b-%Y",
        "%Y/%m/%d",
        "%B %d, %Y",
        "%d %B %Y",
    ]
    
    # Add logging for parsing attempts
    logger = logging.getLogger(__name__)
    
    for fmt in formats:
        try:
            return datetime.datetime.strptime(date_string, fmt)
        except ValueError:
            logger.debug(f"Failed to parse {date_string} with format {fmt}")
            continue
    
    logger.warning(f"Could not parse date from string: {date_string}")
    return None


def extract_emails(text: str) -> List[str]:
    """
    Extract all email addresses from a text.
    
    Args:
        text: Text to search for emails
        
    Returns:
        List of email addresses found
    """
    # Improved regex pattern and added deduplication
    pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    emails = re.findall(pattern, text)
    
    # Remove duplicates while preserving order
    unique_emails = []
    seen = set()
    
    for email in emails:
        if email.lower() not in seen:
            seen.add(email.lower())
            unique_emails.append(email)
    
    return unique_emails


class DataProcessor:
    """Class for processing data with multiple methods."""
    
    def __init__(self, data: List[Dict], case_sensitive: bool = False):
        """
        Initialize with data.
        
        Args:
            data: List of dictionaries to process
            case_sensitive: Whether string comparisons should be case-sensitive
        """
        self.data = data
        self.processed = False
        self.case_sensitive = case_sensitive
        self.processed_data = None
        self.processing_time = None
    
    def filter_data(self, key: str, value: Any) -> List[Dict]:
        """
        Filter data items by key-value pair.
        
        Args:
            key: The key to filter on
            value: The value to match
            
        Returns:
            Filtered list of dictionaries
        """
        # Added handling for case sensitivity and special value handling
        result = []
        
        for item in self.data:
            if key not in item:
                continue
                
            item_value = item.get(key)
            
            # Handle string comparison with case sensitivity option
            if isinstance(item_value, str) and isinstance(value, str) and not self.case_sensitive:
                if item_value.lower() == value.lower():
                    result.append(item)
            # Handle list/set membership tests
            elif isinstance(value, (list, set)) and item_value in value:
                result.append(item)
            # Normal equality check
            elif item_value == value:
                result.append(item)
                
        return result
    
    def sort_data(self, key: str, reverse: bool = False) -> List[Dict]:
        """
        Sort data by a specific key.
        
        Args:
            key: The key to sort by
            reverse: Whether to sort in reverse order
            
        Returns:
            Sorted list of dictionaries
        """
        # Added handling for missing keys
        def get_sort_key(item):
            # Return a default value for missing keys
            return item.get(key, None)
            
        return sorted(self.data, key=get_sort_key, reverse=reverse)
    
    def aggregate_data(self, group_by: str, aggregate_field: str, agg_function: str = 'list') -> Dict[Any, Union[List, float]]:
        """
        Group data by a field and aggregate another field.
        
        Args:
            group_by: Field to group by
            aggregate_field: Field to aggregate
            agg_function: Type of aggregation ('list', 'sum', 'avg', 'min', 'max')
            
        Returns:
            Dictionary with groups as keys and aggregated values
        """
        # Added multiple aggregation functions
        result = {}
        
        for item in self.data:
            key = item.get(group_by)
            value = item.get(aggregate_field)
            
            if key not in result:
                result[key] = []
            
            if value is not None:
                result[key].append(value)
        
        # Apply aggregation function if not 'list'
        if agg_function != 'list':
            for key, values in result.items():
                if not values:
                    result[key] = None
                elif agg_function == 'sum':
                    result[key] = sum(values)
                elif agg_function == 'avg':
                    result[key] = sum(values) / len(values)
                elif agg_function == 'min':
                    result[key] = min(values)
                elif agg_function == 'max':
                    result[key] = max(values)
        
        return result
    
    def process(self) -> None:
        """Process the data and mark as processed."""
        # Added processing logic and timing
        start_time = datetime.datetime.now()
        
        # Perform some processing - e.g., removing duplicates
        seen = set()
        self.processed_data = []
        
        for item in self.data:
            # Convert dict to a hashable tuple of items
            item_tuple = tuple(sorted(item.items()))
            if item_tuple not in seen:
                seen.add(item_tuple)
                self.processed_data.append(item)
                
        self.processed = True
        self.processing_time = (datetime.datetime.now() - start_time).total_seconds()


def calculate_statistics(numbers: List[float]) -> Dict[str, float]:
    """
    Calculate various statistics for a list of numbers.
    
    Args:
        numbers: List of numbers
        
    Returns:
        Dictionary containing statistics (mean, median, std_dev, min, max)
    """
    # Added more robust implementation with more statistics
    if not numbers:
        return {
            "mean": 0,
            "median": 0,
            "std_dev": 0,
            "min": 0,
            "max": 0,
            "count": 0,
            "sum": 0,
            "range": 0,
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
    
    # Calculate additional statistics
    min_val = min(numbers)
    max_val = max(numbers)
    value_range = max_val - min_val
    
    return {
        "mean": mean,
        "median": median,
        "std_dev": std_dev,
        "min": min_val,
        "max": max_val,
        "count": len(numbers),
        "sum": sum(numbers),
        "range": value_range,
    } 
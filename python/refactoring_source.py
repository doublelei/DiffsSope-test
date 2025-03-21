"""
Python test file for cross-file refactoring source.

This file contains functions that will be moved to another file
to test DiffScope's ability to detect cross-file refactorings.
"""

import math
import re
from typing import List, Dict, Any, Optional


def process_data(data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Process a list of data dictionaries and compute statistics.
    
    Args:
        data: List of dictionaries containing data to process
        
    Returns:
        Dictionary with computed statistics
    """
    if not data:
        return {"count": 0, "has_data": False}
    
    # Extract numeric values from each item
    numeric_values = []
    for item in data:
        for key, value in item.items():
            if isinstance(value, (int, float)) and not isinstance(value, bool):
                numeric_values.append(value)
    
    # Compute statistics
    result = {
        "count": len(data),
        "has_data": len(data) > 0,
        "keys_found": set().union(*(d.keys() for d in data)),
    }
    
    if numeric_values:
        result["numeric_stats"] = {
            "min": min(numeric_values),
            "max": max(numeric_values),
            "mean": sum(numeric_values) / len(numeric_values),
            "median": sorted(numeric_values)[len(numeric_values) // 2] if len(numeric_values) % 2 != 0 else
                     (sorted(numeric_values)[len(numeric_values) // 2 - 1] + sorted(numeric_values)[len(numeric_values) // 2]) / 2,
            "sum": sum(numeric_values),
            "count": len(numeric_values)
        }
    
    return result


def parse_complex_string(text: str) -> Dict[str, Any]:
    """
    Parse a complex string into structured data.
    
    The string is expected to contain key-value pairs in the format:
    key1=value1; key2="quoted value"; key3=123
    
    Args:
        text: String to parse
        
    Returns:
        Dictionary with parsed key-value pairs
    """
    if not text:
        return {}
    
    # Split by semicolons, but respect quoted values
    pairs = re.findall(r'([^;=]+)=(?:"([^"]*)"|([^;]*))', text)
    
    result = {}
    for key, quoted_val, unquoted_val in pairs:
        key = key.strip()
        value = quoted_val if quoted_val else unquoted_val.strip()
        
        # Try to convert to numeric if possible
        try:
            if '.' in value:
                value = float(value)
            else:
                value = int(value)
        except ValueError:
            pass
        
        result[key] = value
    
    return result


def transform_data_structure(data: Dict[str, Any], mapping: Dict[str, str]) -> Dict[str, Any]:
    """
    Transform a data structure based on a key mapping.
    
    Args:
        data: Data structure to transform
        mapping: Dictionary mapping old keys to new keys
        
    Returns:
        Transformed data structure
    """
    result = {}
    
    for old_key, new_key in mapping.items():
        if old_key in data:
            result[new_key] = data[old_key]
    
    # Include any keys not in the mapping
    for key, value in data.items():
        if key not in mapping:
            result[key] = value
    
    return result


if __name__ == "__main__":
    # Test process_data
    test_data = [
        {"name": "Item 1", "value": 10, "active": True},
        {"name": "Item 2", "value": 20, "active": False},
        {"name": "Item 3", "value": 30, "active": True}
    ]
    stats = process_data(test_data)
    print("Data statistics:", stats)
    
    # Test parse_complex_string
    test_string = 'name="Complex Item"; value=42; active=true; tags="python,test,example"'
    parsed = parse_complex_string(test_string)
    print("Parsed string:", parsed)
    
    # Test transform_data_structure
    test_mapping = {"name": "title", "value": "amount", "active": "is_active"}
    transformed = transform_data_structure(test_data[0], test_mapping)
    print("Transformed data:", transformed) 
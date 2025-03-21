"""
Python test file for cross-file refactoring destination.

This file contains modified versions of functions moved from refactoring_source.py
to test DiffScope's ability to detect cross-file refactorings.
"""

import math
import re
import statistics
from typing import List, Dict, Any, Optional, Union, Tuple


def process_data_enhanced(data: List[Dict[str, Any]], include_advanced_stats: bool = False) -> Dict[str, Any]:
    """
    Process a list of data dictionaries and compute statistics with enhanced features.
    
    Args:
        data: List of dictionaries containing data to process
        include_advanced_stats: Whether to include advanced statistical calculations
        
    Returns:
        Dictionary with computed statistics
    """
    if not data:
        return {"count": 0, "has_data": False, "error": None}
    
    try:
        # Extract numeric values from each item
        numeric_values = []
        text_values = []
        boolean_values = []
        
        for item in data:
            for key, value in item.items():
                if isinstance(value, (int, float)) and not isinstance(value, bool):
                    numeric_values.append(value)
                elif isinstance(value, str):
                    text_values.append(value)
                elif isinstance(value, bool):
                    boolean_values.append(value)
        
        # Compute statistics
        result = {
            "count": len(data),
            "has_data": len(data) > 0,
            "keys_found": set().union(*(d.keys() for d in data)),
            "value_types": {
                "numeric": len(numeric_values),
                "text": len(text_values),
                "boolean": len(boolean_values)
            }
        }
        
        if numeric_values:
            result["numeric_stats"] = {
                "min": min(numeric_values),
                "max": max(numeric_values),
                "mean": sum(numeric_values) / len(numeric_values),
                "median": statistics.median(numeric_values),
                "sum": sum(numeric_values),
                "count": len(numeric_values)
            }
            
            if include_advanced_stats and len(numeric_values) > 1:
                result["numeric_stats"].update({
                    "stddev": statistics.stdev(numeric_values),
                    "variance": statistics.variance(numeric_values),
                    "quartiles": {
                        "q1": statistics.quantiles(numeric_values, n=4)[0],
                        "q2": statistics.quantiles(numeric_values, n=4)[1],
                        "q3": statistics.quantiles(numeric_values, n=4)[2]
                    }
                })
        
        if boolean_values:
            result["boolean_stats"] = {
                "true_count": sum(1 for v in boolean_values if v),
                "false_count": sum(1 for v in boolean_values if not v),
                "true_percentage": sum(1 for v in boolean_values if v) / len(boolean_values) * 100
            }
        
        return result
    
    except Exception as e:
        return {
            "count": len(data),
            "has_data": len(data) > 0,
            "error": str(e)
        }


def transform_data_structure(
    data: Union[Dict[str, Any], List[Dict[str, Any]]],
    mapping: Dict[str, str],
    recursive: bool = False,
    filter_keys: Optional[List[str]] = None
) -> Union[Dict[str, Any], List[Dict[str, Any]]]:
    """
    Transform a data structure based on a key mapping with enhanced options.
    
    Args:
        data: Data structure to transform (dictionary or list of dictionaries)
        mapping: Dictionary mapping old keys to new keys
        recursive: Whether to apply transformation recursively to nested structures
        filter_keys: Optional list of keys to include in the output (applied after mapping)
        
    Returns:
        Transformed data structure
    """
    # Handle the case of list of dictionaries
    if isinstance(data, list):
        return [transform_data_structure(item, mapping, recursive, filter_keys) 
                for item in data if isinstance(item, dict)]
    
    # Now data is guaranteed to be a dictionary
    result = {}
    
    for old_key, new_key in mapping.items():
        if old_key in data:
            value = data[old_key]
            
            # Apply recursive transformation if needed
            if recursive and isinstance(value, dict):
                value = transform_data_structure(value, mapping, recursive, filter_keys)
            elif recursive and isinstance(value, list):
                value = transform_data_structure(value, mapping, recursive, filter_keys)
                
            result[new_key] = value
    
    # Include any keys not in the mapping
    for key, value in data.items():
        if key not in mapping:
            # Apply recursive transformation if needed
            if recursive and isinstance(value, dict):
                value = transform_data_structure(value, mapping, recursive, filter_keys)
            elif recursive and isinstance(value, list):
                value = transform_data_structure(value, mapping, recursive, filter_keys)
                
            result[key] = value
    
    # Filter keys if specified
    if filter_keys:
        result = {k: v for k, v in result.items() if k in filter_keys}
    
    return result


def parse_structured_data(text: str, format_type: str = "key_value") -> Dict[str, Any]:
    """
    Parse structured data from string with support for multiple formats.
    
    Args:
        text: String to parse
        format_type: Format type to parse ("key_value", "json", "csv", etc.)
        
    Returns:
        Dictionary with parsed data
    """
    if not text:
        return {}
    
    if format_type == "key_value":
        # Split by semicolons, but respect quoted values
        pairs = re.findall(r'([^;=]+)=(?:"([^"]*)"|([^;]*))', text)
        
        result = {}
        for key, quoted_val, unquoted_val in pairs:
            key = key.strip()
            value = quoted_val if quoted_val else unquoted_val.strip()
            
            # Try to convert to appropriate type
            try:
                if value.lower() == 'true':
                    value = True
                elif value.lower() == 'false':
                    value = False
                elif '.' in value and value.replace('.', '').isdigit():
                    value = float(value)
                elif value.isdigit():
                    value = int(value)
            except (ValueError, AttributeError):
                pass
            
            result[key] = value
        
        return result
    elif format_type == "json":
        import json
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            return {"error": "Invalid JSON"}
    else:
        return {"error": f"Unsupported format: {format_type}"}


def extract_metric_data(data: Dict[str, Any], metric_paths: List[str]) -> Dict[str, Any]:
    """
    Extract specific metrics from a complex data structure.
    
    Args:
        data: Complex data structure
        metric_paths: List of dot-notation paths to extract (e.g., "user.profile.age")
        
    Returns:
        Dictionary with extracted metrics
    """
    result = {}
    
    for path in metric_paths:
        parts = path.split('.')
        current = data
        
        try:
            for part in parts:
                current = current[part]
            
            result[path] = current
        except (KeyError, TypeError):
            result[path] = None
    
    return result


if __name__ == "__main__":
    # Test process_data_enhanced
    test_data = [
        {"name": "Item 1", "value": 10, "active": True},
        {"name": "Item 2", "value": 20, "active": False},
        {"name": "Item 3", "value": 30, "active": True}
    ]
    stats = process_data_enhanced(test_data, include_advanced_stats=True)
    print("Enhanced data statistics:", stats)
    
    # Test parse_structured_data
    test_string = 'name="Complex Item"; value=42; active=true; tags="python,test,example"'
    parsed = parse_structured_data(test_string, format_type="key_value")
    print("Parsed structured data:", parsed)
    
    # Test transform_data_structure with enhanced options
    test_mapping = {"name": "title", "value": "amount", "active": "is_active"}
    transformed = transform_data_structure(test_data, test_mapping, recursive=True)
    print("Transformed data:", transformed)
    
    # Test extract_metric_data
    complex_data = {
        "user": {
            "profile": {
                "name": "Test User",
                "age": 30
            }
        },
        "metrics": {
            "visits": 10,
            "conversions": 2
        }
    }
    metrics = extract_metric_data(complex_data, ["user.profile.name", "metrics.visits"])
    print("Extracted metrics:", metrics) 
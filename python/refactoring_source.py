"""
Python test file for cross-file refactoring source.

This file has been refactored with functions moved to refactoring_destination.py
to test DiffScope's ability to detect cross-file refactorings.
"""

import math
import re
from typing import List, Dict, Any, Optional


if __name__ == "__main__":
    # Import the refactored functions from the destination file
    from refactoring_destination import process_data_enhanced, parse_structured_data, transform_data_structure
    
    # Test process_data
    test_data = [
        {"name": "Item 1", "value": 10, "active": True},
        {"name": "Item 2", "value": 20, "active": False},
        {"name": "Item 3", "value": 30, "active": True}
    ]
    stats = process_data_enhanced(test_data)
    print("Data statistics:", stats)
    
    # Test parse_complex_string
    test_string = 'name="Complex Item"; value=42; active=true; tags="python,test,example"'
    parsed = parse_structured_data(test_string, format_type="key_value")
    print("Parsed string:", parsed)
    
    # Test transform_data_structure
    test_mapping = {"name": "title", "value": "amount", "active": "is_active"}
    transformed = transform_data_structure(test_data[0], test_mapping)
    print("Transformed data:", transformed) 
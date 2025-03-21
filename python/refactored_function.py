"""
Python test file with a refactored version of the large function.

This file contains the refactored version of the large function from large_function.py,
broken down into smaller, more focused functions to test DiffScope's ability to detect
function extraction and composition.
"""

import os
import json
import csv
import math
import statistics
from typing import List, Dict, Any, Optional, Union, Tuple


def validate_inputs(input_path: str, config: Dict[str, Any]) -> Dict[str, Any]:
    """
    Validate input parameters.
    
    Args:
        input_path: Path to input file
        config: Configuration dictionary
        
    Returns:
        Dictionary with validation results
    """
    results = {
        "status": "success",
        "errors": []
    }
    
    if not os.path.exists(input_path):
        results["status"] = "error"
        results["errors"].append(f"Input file does not exist: {input_path}")
    
    if not isinstance(config, dict):
        results["status"] = "error"
        results["errors"].append("Configuration must be a dictionary")
    
    return results


def extract_config_options(config: Dict[str, Any]) -> Dict[str, Any]:
    """
    Extract configuration options from config dictionary.
    
    Args:
        config: Configuration dictionary
        
    Returns:
        Dictionary with extracted options
    """
    return {
        "column_mapping": config.get("column_mapping", {}),
        "filter_criteria": config.get("filter_criteria", {}),
        "aggregation_fields": config.get("aggregation_fields", []),
        "include_stats": config.get("include_statistics", True),
        "output_format": config.get("output_format", "json")
    }


def read_csv_file(file_path: str) -> Tuple[List[Dict[str, Any]], List[str]]:
    """
    Read and parse CSV file.
    
    Args:
        file_path: Path to CSV file
        
    Returns:
        Tuple of (data, warnings)
    """
    data = []
    warnings = []
    
    with open(file_path, 'r', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
            
    return data, warnings


def read_json_file(file_path: str) -> Tuple[List[Dict[str, Any]], List[str]]:
    """
    Read and parse JSON file.
    
    Args:
        file_path: Path to JSON file
        
    Returns:
        Tuple of (data, warnings)
    """
    with open(file_path, 'r') as jsonfile:
        data = json.load(jsonfile)
        
    # Ensure data is a list
    if not isinstance(data, list):
        data = [data]
        
    return data, []


def read_txt_file(file_path: str) -> Tuple[List[Dict[str, Any]], List[str]]:
    """
    Read and parse TXT file.
    
    Args:
        file_path: Path to TXT file
        
    Returns:
        Tuple of (data, warnings)
    """
    data = []
    warnings = []
    
    with open(file_path, 'r') as txtfile:
        lines = txtfile.readlines()
        header = lines[0].strip().split(',')
        for line in lines[1:]:
            values = line.strip().split(',')
            if len(values) == len(header):
                row = {header[i]: values[i] for i in range(len(header))}
                data.append(row)
            else:
                warnings.append(f"Skipped malformed line: {line.strip()}")
                
    return data, warnings


def read_input_file(input_path: str) -> Tuple[List[Dict[str, Any]], str, List[str]]:
    """
    Read and parse input file based on extension.
    
    Args:
        input_path: Path to input file
        
    Returns:
        Tuple of (data, file_type, warnings)
    """
    _, extension = os.path.splitext(input_path)
    extension = extension.lower()
    
    try:
        if extension == '.csv':
            data, warnings = read_csv_file(input_path)
            file_type = "csv"
        elif extension == '.json':
            data, warnings = read_json_file(input_path)
            file_type = "json"
        elif extension == '.txt':
            data, warnings = read_txt_file(input_path)
            file_type = "txt"
        else:
            raise ValueError(f"Unsupported file extension: {extension}")
            
        return data, file_type, warnings
    except Exception as e:
        raise IOError(f"Error reading input file: {str(e)}")


def apply_column_mapping(data: List[Dict[str, Any]], mapping: Dict[str, str]) -> List[Dict[str, Any]]:
    """
    Apply column mapping to data.
    
    Args:
        data: List of data dictionaries
        mapping: Dictionary mapping old keys to new keys
        
    Returns:
        List of mapped data dictionaries
    """
    if not mapping:
        return data
        
    mapped_data = []
    for item in data:
        mapped_item = {}
        for old_key, new_key in mapping.items():
            if old_key in item:
                mapped_item[new_key] = item[old_key]
        
        # Copy unmapped fields
        for k, v in item.items():
            if k not in mapping:
                mapped_item[k] = v
                
        mapped_data.append(mapped_item)
        
    return mapped_data


def convert_value_if_numeric(value: Any) -> Any:
    """
    Convert string value to numeric if possible.
    
    Args:
        value: Value to convert
        
    Returns:
        Converted value or original value
    """
    if not isinstance(value, str):
        return value
        
    try:
        if value.isdigit() or (value.replace('.', '', 1).isdigit() and value.count('.') <= 1):
            return float(value) if '.' in value else int(value)
    except ValueError:
        pass
        
    return value


def check_filter_criteria(item: Dict[str, Any], filter_criteria: Dict[str, Any]) -> bool:
    """
    Check if an item matches filter criteria.
    
    Args:
        item: Data item to check
        filter_criteria: Filter criteria dictionary
        
    Returns:
        True if item matches criteria, False otherwise
    """
    for field, criteria in filter_criteria.items():
        if field not in item:
            return False
            
        value = convert_value_if_numeric(item[field])
        
        # Apply different types of criteria
        if isinstance(criteria, dict):
            if "eq" in criteria and value != criteria["eq"]:
                return False
            if "ne" in criteria and value == criteria["ne"]:
                return False
            if "gt" in criteria and not (isinstance(value, (int, float)) and value > criteria["gt"]):
                return False
            if "lt" in criteria and not (isinstance(value, (int, float)) and value < criteria["lt"]):
                return False
            if "in" in criteria and value not in criteria["in"]:
                return False
            if "contains" in criteria and not (isinstance(value, str) and criteria["contains"] in value):
                return False
        else:
            # Simple equality check
            if value != criteria:
                return False
                
    return True


def apply_filtering(data: List[Dict[str, Any]], filter_criteria: Dict[str, Any]) -> Tuple[List[Dict[str, Any]], Dict[str, int]]:
    """
    Apply filtering to data.
    
    Args:
        data: List of data dictionaries
        filter_criteria: Filter criteria dictionary
        
    Returns:
        Tuple of (filtered_data, filter_stats)
    """
    if not filter_criteria:
        return data, {}
        
    filtered_data = []
    for item in data:
        if check_filter_criteria(item, filter_criteria):
            filtered_data.append(item)
            
    filter_stats = {
        "filtered_count": len(filtered_data),
        "original_count": len(data)
    }
    
    return filtered_data, filter_stats


def extract_numeric_values(data: List[Dict[str, Any]], field: str) -> List[float]:
    """
    Extract numeric values for a field from data.
    
    Args:
        data: List of data dictionaries
        field: Field to extract values from
        
    Returns:
        List of numeric values
    """
    numeric_values = []
    
    for item in data:
        if field in item:
            value = item[field]
            
            # Try to convert string to number
            if isinstance(value, str):
                try:
                    value = float(value) if '.' in value else int(value)
                except ValueError:
                    continue
                    
            if isinstance(value, (int, float)):
                numeric_values.append(value)
                
    return numeric_values


def calculate_field_statistics(numeric_values: List[float]) -> Dict[str, Any]:
    """
    Calculate statistics for numeric values.
    
    Args:
        numeric_values: List of numeric values
        
    Returns:
        Dictionary with calculated statistics
    """
    if not numeric_values:
        return {}
        
    stats = {
        "count": len(numeric_values),
        "sum": sum(numeric_values),
        "average": sum(numeric_values) / len(numeric_values),
        "min": min(numeric_values),
        "max": max(numeric_values),
    }
    
    # Add more statistics if more than one value
    if len(numeric_values) > 1:
        stats.update({
            "median": statistics.median(numeric_values),
            "stddev": statistics.stdev(numeric_values),
            "variance": statistics.variance(numeric_values)
        })
        
    return stats


def calculate_aggregations(data: List[Dict[str, Any]], aggregation_fields: List[str]) -> Dict[str, Dict[str, Any]]:
    """
    Calculate aggregations for specified fields.
    
    Args:
        data: List of data dictionaries
        aggregation_fields: List of fields to aggregate
        
    Returns:
        Dictionary with calculated aggregations
    """
    if not data or not aggregation_fields:
        return {}
        
    aggregated_data = {}
    
    for field in aggregation_fields:
        numeric_values = extract_numeric_values(data, field)
        
        if numeric_values:
            aggregated_data[field] = calculate_field_statistics(numeric_values)
            
    return aggregated_data


def compute_field_types(data: List[Dict[str, Any]]) -> Dict[str, Dict[str, Any]]:
    """
    Compute field types and counts.
    
    Args:
        data: List of data dictionaries
        
    Returns:
        Dictionary with field types information
    """
    field_types = {}
    
    for item in data:
        for key, value in item.items():
            if key not in field_types:
                field_types[key] = {"type": type(value).__name__, "count": 1}
            else:
                field_types[key]["count"] += 1
                
    return field_types


def compute_overall_statistics(data: List[Dict[str, Any]], include_stats: bool) -> Dict[str, Any]:
    """
    Compute overall statistics.
    
    Args:
        data: List of data dictionaries
        include_stats: Whether to include statistics
        
    Returns:
        Dictionary with computed statistics
    """
    if not include_stats or not data:
        return {}
        
    field_types = compute_field_types(data)
    
    return {
        "field_types": field_types,
        "record_count": len(data),
        "field_count": len(field_types)
    }


def write_output_file(output_path: str, output_data: Dict[str, Any], output_format: str) -> None:
    """
    Write output data to file.
    
    Args:
        output_path: Path to output file
        output_data: Data to write
        output_format: Output format
        
    Raises:
        ValueError: If output format is not supported
        IOError: If an error occurs writing the file
    """
    if output_format.lower() == "json":
        with open(output_path, 'w') as out_file:
            json.dump(output_data, out_file, indent=2)
    else:
        raise ValueError(f"Unsupported output format: {output_format}")


def process_and_analyze_data(
    input_path: str,
    output_path: str,
    config: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Process data from input file, analyze it, and write results to output file.
    
    This function coordinates the data processing pipeline using smaller,
    focused functions for each step of the process.
    
    Args:
        input_path: Path to input file (CSV, JSON, or TXT)
        output_path: Path to output file (JSON)
        config: Configuration dictionary with processing options
        
    Returns:
        Dictionary with processing results and metadata
    """
    results = {
        "status": "success",
        "input_file": input_path,
        "output_file": output_path,
        "records_processed": 0,
        "errors": [],
        "warnings": [],
        "statistics": {}
    }
    
    # Step 1: Validate inputs
    validation_results = validate_inputs(input_path, config)
    if validation_results["status"] == "error":
        results["status"] = "error"
        results["errors"].extend(validation_results["errors"])
        return results
    
    # Step 2: Extract configuration options
    options = extract_config_options(config)
    
    try:
        # Step 3: Read input file
        data, file_type, warnings = read_input_file(input_path)
        results["file_type"] = file_type
        results["warnings"].extend(warnings)
        
        # Step 4: Apply column mapping
        data = apply_column_mapping(data, options["column_mapping"])
        
        # Step 5: Apply filtering
        data, filter_stats = apply_filtering(data, options["filter_criteria"])
        results.update(filter_stats)
        
        # Step 6: Calculate aggregations
        aggregations = calculate_aggregations(data, options["aggregation_fields"])
        if aggregations:
            results["aggregations"] = aggregations
        
        # Step 7: Compute overall statistics
        statistics = compute_overall_statistics(data, options["include_stats"])
        results["statistics"] = statistics
        
        # Step 8: Prepare and write output
        output_data = {
            "metadata": results,
            "data": data
        }
        
        write_output_file(output_path, output_data, options["output_format"])
        
        results["records_processed"] = len(data)
        
    except ValueError as e:
        results["status"] = "error"
        results["errors"].append(str(e))
    except IOError as e:
        results["status"] = "error"
        results["errors"].append(str(e))
    except Exception as e:
        results["status"] = "error"
        results["errors"].append(f"Unexpected error: {str(e)}")
    
    return results


if __name__ == "__main__":
    # Test with sample data
    config = {
        "column_mapping": {"name": "full_name", "age": "years"},
        "filter_criteria": {"years": {"gt": 20}},
        "aggregation_fields": ["years", "score"],
        "include_statistics": True,
        "output_format": "json"
    }
    
    # Create a sample CSV file for testing
    sample_csv = "tests/sample_data.csv"
    with open(sample_csv, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["name", "age", "score", "active"])
        writer.writerow(["Alice", "25", "95", "true"])
        writer.writerow(["Bob", "30", "85", "true"])
        writer.writerow(["Charlie", "20", "75", "false"])
    
    output_json = "tests/output_data.json"
    results = process_and_analyze_data(sample_csv, output_json, config)
    print("Processing results:", json.dumps(results, indent=2))
    
    # Clean up test files
    os.remove(sample_csv)
    if os.path.exists(output_json):
        os.remove(output_json) 
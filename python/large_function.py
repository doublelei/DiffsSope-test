"""
Python test file with a large function.

This file contains a large function that will later be broken down
into smaller functions to test DiffScope's ability to detect
function extraction and composition.
"""

import os
import json
import csv
import math
import statistics
from typing import List, Dict, Any, Optional, Union, Tuple


def process_and_analyze_data(
    input_path: str,
    output_path: str,
    config: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Process data from input file, analyze it, and write results to output file.
    
    This function handles the entire data processing pipeline in one large function.
    It reads data from various file formats, performs analysis, generates statistics,
    handles errors, and writes the results to a specified output file.
    
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
    
    # Validate inputs
    if not os.path.exists(input_path):
        results["status"] = "error"
        results["errors"].append(f"Input file does not exist: {input_path}")
        return results
    
    if not isinstance(config, dict):
        results["status"] = "error"
        results["errors"].append("Configuration must be a dictionary")
        return results
    
    # Extract configuration options
    column_mapping = config.get("column_mapping", {})
    filter_criteria = config.get("filter_criteria", {})
    aggregation_fields = config.get("aggregation_fields", [])
    include_stats = config.get("include_statistics", True)
    output_format = config.get("output_format", "json")
    
    # Determine file type from extension
    _, extension = os.path.splitext(input_path)
    extension = extension.lower()
    
    # Read and parse the input file
    data = []
    try:
        if extension == '.csv':
            with open(input_path, 'r', newline='') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    data.append(row)
            results["file_type"] = "csv"
        elif extension == '.json':
            with open(input_path, 'r') as jsonfile:
                data = json.load(jsonfile)
            results["file_type"] = "json"
        elif extension == '.txt':
            with open(input_path, 'r') as txtfile:
                lines = txtfile.readlines()
                header = lines[0].strip().split(',')
                for line in lines[1:]:
                    values = line.strip().split(',')
                    if len(values) == len(header):
                        row = {header[i]: values[i] for i in range(len(header))}
                        data.append(row)
                    else:
                        results["warnings"].append(f"Skipped malformed line: {line.strip()}")
            results["file_type"] = "txt"
        else:
            results["status"] = "error"
            results["errors"].append(f"Unsupported file extension: {extension}")
            return results
    except Exception as e:
        results["status"] = "error"
        results["errors"].append(f"Error reading input file: {str(e)}")
        return results
    
    # Apply column mapping if provided
    if column_mapping:
        mapped_data = []
        for item in data:
            mapped_item = {}
            for old_key, new_key in column_mapping.items():
                if old_key in item:
                    mapped_item[new_key] = item[old_key]
                else:
                    # Copy unmapped fields
                    for k, v in item.items():
                        if k not in column_mapping:
                            mapped_item[k] = v
            mapped_data.append(mapped_item)
        data = mapped_data
    
    # Apply filtering if criteria provided
    if filter_criteria:
        filtered_data = []
        for item in data:
            include = True
            for field, criteria in filter_criteria.items():
                if field in item:
                    value = item[field]
                    
                    # Try to convert numeric strings to numbers for comparison
                    try:
                        if isinstance(value, str) and (value.isdigit() or 
                                                      (value.replace('.', '', 1).isdigit() and value.count('.') <= 1)):
                            value = float(value) if '.' in value else int(value)
                    except ValueError:
                        pass
                    
                    # Apply different types of criteria
                    if isinstance(criteria, dict):
                        if "eq" in criteria and value != criteria["eq"]:
                            include = False
                            break
                        if "ne" in criteria and value == criteria["ne"]:
                            include = False
                            break
                        if "gt" in criteria and not (isinstance(value, (int, float)) and value > criteria["gt"]):
                            include = False
                            break
                        if "lt" in criteria and not (isinstance(value, (int, float)) and value < criteria["lt"]):
                            include = False
                            break
                        if "in" in criteria and value not in criteria["in"]:
                            include = False
                            break
                        if "contains" in criteria and not (isinstance(value, str) and criteria["contains"] in value):
                            include = False
                            break
                    else:
                        # Simple equality check
                        if value != criteria:
                            include = False
                            break
            
            if include:
                filtered_data.append(item)
        
        results["filtered_count"] = len(filtered_data)
        results["original_count"] = len(data)
        data = filtered_data
    
    # Process numeric fields and calculate aggregations
    if data and aggregation_fields:
        aggregated_data = {}
        
        for field in aggregation_fields:
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
            
            if numeric_values:
                aggregated_data[field] = {
                    "count": len(numeric_values),
                    "sum": sum(numeric_values),
                    "average": sum(numeric_values) / len(numeric_values),
                    "min": min(numeric_values),
                    "max": max(numeric_values),
                }
                
                # Add more statistics if more than one value
                if len(numeric_values) > 1:
                    aggregated_data[field].update({
                        "median": statistics.median(numeric_values),
                        "stddev": statistics.stdev(numeric_values) if len(numeric_values) > 1 else 0,
                        "variance": statistics.variance(numeric_values) if len(numeric_values) > 1 else 0
                    })
        
        results["aggregations"] = aggregated_data
    
    # Compute overall statistics
    if include_stats and data:
        field_types = {}
        for item in data:
            for key, value in item.items():
                if key not in field_types:
                    field_types[key] = {"type": type(value).__name__, "count": 1}
                else:
                    field_types[key]["count"] += 1
        
        results["statistics"]["field_types"] = field_types
        results["statistics"]["record_count"] = len(data)
        results["statistics"]["field_count"] = len(field_types)
    
    # Prepare output
    output_data = {
        "metadata": results,
        "data": data
    }
    
    # Write to output file
    try:
        if output_format.lower() == "json":
            with open(output_path, 'w') as out_file:
                json.dump(output_data, out_file, indent=2)
        else:
            results["status"] = "error"
            results["errors"].append(f"Unsupported output format: {output_format}")
            return results
    except Exception as e:
        results["status"] = "error"
        results["errors"].append(f"Error writing output file: {str(e)}")
        return results
    
    results["records_processed"] = len(data)
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
/**
 * JavaScript test file with a large function.
 * 
 * This file contains a large function that will later be broken down
 * into smaller functions to test DiffScope's ability to detect
 * function extraction and composition.
 */

const fs = require('fs');
const path = require('path');

/**
 * Process data from input file, analyze it, and write results to output file.
 * 
 * This function handles the entire data processing pipeline in one large function.
 * It reads data from various file formats, performs analysis, generates statistics,
 * handles errors, and writes the results to a specified output file.
 * 
 * @param {string} inputPath - Path to input file (CSV, JSON, or TXT)
 * @param {string} outputPath - Path to output file (JSON)
 * @param {Object} config - Configuration dictionary with processing options
 * @returns {Object} Object with processing results and metadata
 */
function processAndAnalyzeData(inputPath, outputPath, config) {
  const results = {
    status: "success",
    inputFile: inputPath,
    outputFile: outputPath,
    recordsProcessed: 0,
    errors: [],
    warnings: [],
    statistics: {}
  };
  
  // Validate inputs
  if (!fs.existsSync(inputPath)) {
    results.status = "error";
    results.errors.push(`Input file does not exist: ${inputPath}`);
    return results;
  }
  
  if (typeof config !== 'object' || config === null) {
    results.status = "error";
    results.errors.push("Configuration must be an object");
    return results;
  }
  
  // Extract configuration options
  const columnMapping = config.columnMapping || {};
  const filterCriteria = config.filterCriteria || {};
  const aggregationFields = config.aggregationFields || [];
  const includeStats = config.includeStatistics !== undefined ? config.includeStatistics : true;
  const outputFormat = config.outputFormat || "json";
  
  // Determine file type from extension
  const extension = path.extname(inputPath).toLowerCase();
  
  // Read and parse the input file
  let data = [];
  try {
    if (extension === '.csv') {
      const fileContent = fs.readFileSync(inputPath, 'utf8');
      const lines = fileContent.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(header => header.trim());
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(value => value.trim());
        if (values.length === headers.length) {
          const row = {};
          for (let j = 0; j < headers.length; j++) {
            row[headers[j]] = values[j];
          }
          data.push(row);
        } else {
          results.warnings.push(`Skipped malformed line: ${lines[i]}`);
        }
      }
      results.fileType = "csv";
    } else if (extension === '.json') {
      const fileContent = fs.readFileSync(inputPath, 'utf8');
      data = JSON.parse(fileContent);
      results.fileType = "json";
    } else if (extension === '.txt') {
      const fileContent = fs.readFileSync(inputPath, 'utf8');
      const lines = fileContent.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(header => header.trim());
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(value => value.trim());
        if (values.length === headers.length) {
          const row = {};
          for (let j = 0; j < headers.length; j++) {
            row[headers[j]] = values[j];
          }
          data.push(row);
        } else {
          results.warnings.push(`Skipped malformed line: ${lines[i]}`);
        }
      }
      results.fileType = "txt";
    } else {
      results.status = "error";
      results.errors.push(`Unsupported file extension: ${extension}`);
      return results;
    }
  } catch (error) {
    results.status = "error";
    results.errors.push(`Error reading input file: ${error.message}`);
    return results;
  }
  
  // Ensure data is an array
  if (!Array.isArray(data)) {
    if (typeof data === 'object' && data !== null) {
      data = [data];
    } else {
      results.status = "error";
      results.errors.push("Data must be an array or object");
      return results;
    }
  }
  
  // Apply column mapping if provided
  if (Object.keys(columnMapping).length > 0) {
    const mappedData = [];
    for (const item of data) {
      const mappedItem = {};
      
      // Apply the mapping
      for (const [oldKey, newKey] of Object.entries(columnMapping)) {
        if (Object.prototype.hasOwnProperty.call(item, oldKey)) {
          mappedItem[newKey] = item[oldKey];
        }
      }
      
      // Copy unmapped fields
      for (const [key, value] of Object.entries(item)) {
        if (!Object.prototype.hasOwnProperty.call(columnMapping, key)) {
          mappedItem[key] = value;
        }
      }
      
      mappedData.push(mappedItem);
    }
    data = mappedData;
  }
  
  // Apply filtering if criteria provided
  if (Object.keys(filterCriteria).length > 0) {
    const filteredData = [];
    
    for (const item of data) {
      let include = true;
      
      for (const [field, criteria] of Object.entries(filterCriteria)) {
        if (Object.prototype.hasOwnProperty.call(item, field)) {
          let value = item[field];
          
          // Try to convert numeric strings to numbers for comparison
          if (typeof value === 'string') {
            if (!isNaN(value) && value.trim() !== '') {
              value = value.includes('.') ? parseFloat(value) : parseInt(value, 10);
            }
          }
          
          // Apply different types of criteria
          if (typeof criteria === 'object' && criteria !== null) {
            if (Object.prototype.hasOwnProperty.call(criteria, "eq") && value !== criteria.eq) {
              include = false;
              break;
            }
            if (Object.prototype.hasOwnProperty.call(criteria, "ne") && value === criteria.ne) {
              include = false;
              break;
            }
            if (Object.prototype.hasOwnProperty.call(criteria, "gt") && 
                !(typeof value === 'number' && value > criteria.gt)) {
              include = false;
              break;
            }
            if (Object.prototype.hasOwnProperty.call(criteria, "lt") && 
                !(typeof value === 'number' && value < criteria.lt)) {
              include = false;
              break;
            }
            if (Object.prototype.hasOwnProperty.call(criteria, "in") && 
                !Array.isArray(criteria.in) && !criteria.in.includes(value)) {
              include = false;
              break;
            }
            if (Object.prototype.hasOwnProperty.call(criteria, "contains") && 
                !(typeof value === 'string' && value.includes(criteria.contains))) {
              include = false;
              break;
            }
          } else {
            // Simple equality check
            if (value !== criteria) {
              include = false;
              break;
            }
          }
        } else {
          // Field not found
          include = false;
          break;
        }
      }
      
      if (include) {
        filteredData.push(item);
      }
    }
    
    results.filteredCount = filteredData.length;
    results.originalCount = data.length;
    data = filteredData;
  }
  
  // Process numeric fields and calculate aggregations
  if (data.length > 0 && aggregationFields.length > 0) {
    const aggregatedData = {};
    
    for (const field of aggregationFields) {
      const numericValues = [];
      
      for (const item of data) {
        if (Object.prototype.hasOwnProperty.call(item, field)) {
          let value = item[field];
          
          // Try to convert string to number
          if (typeof value === 'string') {
            if (!isNaN(value) && value.trim() !== '') {
              value = value.includes('.') ? parseFloat(value) : parseInt(value, 10);
            } else {
              continue;
            }
          }
          
          if (typeof value === 'number' && !isNaN(value)) {
            numericValues.push(value);
          }
        }
      }
      
      if (numericValues.length > 0) {
        const sum = numericValues.reduce((acc, val) => acc + val, 0);
        const avg = sum / numericValues.length;
        
        aggregatedData[field] = {
          count: numericValues.length,
          sum: sum,
          average: avg,
          min: Math.min(...numericValues),
          max: Math.max(...numericValues)
        };
        
        // Add more statistics if more than one value
        if (numericValues.length > 1) {
          // Sort for median calculation
          numericValues.sort((a, b) => a - b);
          const midIndex = Math.floor(numericValues.length / 2);
          const median = numericValues.length % 2 === 0
            ? (numericValues[midIndex - 1] + numericValues[midIndex]) / 2
            : numericValues[midIndex];
          
          // Calculate variance and standard deviation
          const variance = numericValues.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / numericValues.length;
          const stddev = Math.sqrt(variance);
          
          aggregatedData[field].median = median;
          aggregatedData[field].stddev = stddev;
          aggregatedData[field].variance = variance;
        }
      }
    }
    
    results.aggregations = aggregatedData;
  }
  
  // Compute overall statistics
  if (includeStats && data.length > 0) {
    const fieldTypes = {};
    for (const item of data) {
      for (const [key, value] of Object.entries(item)) {
        if (!Object.prototype.hasOwnProperty.call(fieldTypes, key)) {
          fieldTypes[key] = { type: typeof value, count: 1 };
        } else {
          fieldTypes[key].count += 1;
        }
      }
    }
    
    results.statistics.fieldTypes = fieldTypes;
    results.statistics.recordCount = data.length;
    results.statistics.fieldCount = Object.keys(fieldTypes).length;
  }
  
  // Prepare output
  const outputData = {
    metadata: results,
    data: data
  };
  
  // Write to output file
  try {
    if (outputFormat.toLowerCase() === "json") {
      fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
    } else {
      results.status = "error";
      results.errors.push(`Unsupported output format: ${outputFormat}`);
      return results;
    }
  } catch (error) {
    results.status = "error";
    results.errors.push(`Error writing output file: ${error.message}`);
    return results;
  }
  
  results.recordsProcessed = data.length;
  return results;
}

// Export the function
module.exports = {
  processAndAnalyzeData
};

// If running as a script
if (require.main === module) {
  // Test with sample data
  const config = {
    columnMapping: { name: "fullName", age: "years" },
    filterCriteria: { years: { gt: 20 } },
    aggregationFields: ["years", "score"],
    includeStatistics: true,
    outputFormat: "json"
  };
  
  // Create a sample CSV file for testing
  const sampleCsv = "tests/sample_data.csv";
  const csvContent = "name,age,score,active\nAlice,25,95,true\nBob,30,85,true\nCharlie,20,75,false";
  
  try {
    // Ensure directory exists
    const dir = path.dirname(sampleCsv);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(sampleCsv, csvContent);
    
    const outputJson = "tests/output_data.json";
    const results = processAndAnalyzeData(sampleCsv, outputJson, config);
    console.log("Processing results:", JSON.stringify(results, null, 2));
    
    // Clean up test files
    fs.unlinkSync(sampleCsv);
    if (fs.existsSync(outputJson)) {
      fs.unlinkSync(outputJson);
    }
  } catch (error) {
    console.error("Test error:", error);
  }
} 
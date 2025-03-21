/**
 * JavaScript test file with a large function that has been refactored.
 * 
 * This file demonstrates the refactoring of a large function into smaller, more focused functions
 * to test DiffScope's ability to detect function extraction and composition.
 */

const fs = require('fs');
const path = require('path');

/**
 * Validate input parameters.
 * @param {string} inputPath - Path to input file
 * @param {Object} config - Configuration object
 * @returns {Object} Validation results object
 */
function validateInputs(inputPath, config) {
  const results = {
    status: "success",
    errors: []
  };
  
  if (!fs.existsSync(inputPath)) {
    results.status = "error";
    results.errors.push(`Input file does not exist: ${inputPath}`);
  }
  
  if (typeof config !== 'object' || config === null) {
    results.status = "error";
    results.errors.push("Configuration must be an object");
  }
  
  return results;
}

/**
 * Extract configuration options from config object.
 * @param {Object} config - Configuration object
 * @returns {Object} Extracted options
 */
function extractConfigOptions(config) {
  return {
    columnMapping: config.columnMapping || {},
    filterCriteria: config.filterCriteria || {},
    aggregationFields: config.aggregationFields || [],
    includeStats: config.includeStatistics !== undefined ? config.includeStatistics : true,
    outputFormat: config.outputFormat || "json"
  };
}

/**
 * Read and parse CSV file.
 * @param {string} filePath - Path to CSV file
 * @returns {Array} Tuple of [data, warnings]
 */
function readCsvFile(filePath) {
  const data = [];
  const warnings = [];
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
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
      warnings.push(`Skipped malformed line: ${lines[i]}`);
    }
  }
  
  return [data, warnings];
}

/**
 * Read and parse JSON file.
 * @param {string} filePath - Path to JSON file
 * @returns {Array} Tuple of [data, warnings]
 */
function readJsonFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  let data = JSON.parse(fileContent);
  
  // Ensure data is an array
  if (!Array.isArray(data)) {
    data = [data];
  }
  
  return [data, []];
}

/**
 * Read and parse TXT file.
 * @param {string} filePath - Path to TXT file
 * @returns {Array} Tuple of [data, warnings]
 */
function readTxtFile(filePath) {
  const data = [];
  const warnings = [];
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
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
      warnings.push(`Skipped malformed line: ${lines[i]}`);
    }
  }
  
  return [data, warnings];
}

/**
 * Read and parse input file based on extension.
 * @param {string} inputPath - Path to input file
 * @returns {Array} Tuple of [data, fileType, warnings]
 */
function readInputFile(inputPath) {
  const extension = path.extname(inputPath).toLowerCase();
  
  try {
    let data, warnings, fileType;
    
    if (extension === '.csv') {
      [data, warnings] = readCsvFile(inputPath);
      fileType = "csv";
    } else if (extension === '.json') {
      [data, warnings] = readJsonFile(inputPath);
      fileType = "json";
    } else if (extension === '.txt') {
      [data, warnings] = readTxtFile(inputPath);
      fileType = "txt";
    } else {
      throw new Error(`Unsupported file extension: ${extension}`);
    }
    
    return [data, fileType, warnings];
  } catch (error) {
    throw new Error(`Error reading input file: ${error.message}`);
  }
}

/**
 * Apply column mapping to data.
 * @param {Array<Object>} data - List of data objects
 * @param {Object} mapping - Object mapping old keys to new keys
 * @returns {Array<Object>} List of mapped data objects
 */
function applyColumnMapping(data, mapping) {
  if (Object.keys(mapping).length === 0) {
    return data;
  }
  
  const mappedData = [];
  
  for (const item of data) {
    const mappedItem = {};
    
    // Apply the mapping
    for (const [oldKey, newKey] of Object.entries(mapping)) {
      if (Object.prototype.hasOwnProperty.call(item, oldKey)) {
        mappedItem[newKey] = item[oldKey];
      }
    }
    
    // Copy unmapped fields
    for (const [key, value] of Object.entries(item)) {
      if (!Object.prototype.hasOwnProperty.call(mapping, key)) {
        mappedItem[key] = value;
      }
    }
    
    mappedData.push(mappedItem);
  }
  
  return mappedData;
}

/**
 * Convert string value to numeric if possible.
 * @param {*} value - Value to convert
 * @returns {*} Converted value or original value
 */
function convertValueIfNumeric(value) {
  if (typeof value !== 'string') {
    return value;
  }
  
  if (!isNaN(value) && value.trim() !== '') {
    return value.includes('.') ? parseFloat(value) : parseInt(value, 10);
  }
  
  return value;
}

/**
 * Check if an item matches filter criteria.
 * @param {Object} item - Data item to check
 * @param {Object} filterCriteria - Filter criteria object
 * @returns {boolean} True if item matches criteria, false otherwise
 */
function checkFilterCriteria(item, filterCriteria) {
  for (const [field, criteria] of Object.entries(filterCriteria)) {
    if (!Object.prototype.hasOwnProperty.call(item, field)) {
      return false;
    }
    
    let value = convertValueIfNumeric(item[field]);
    
    // Apply different types of criteria
    if (typeof criteria === 'object' && criteria !== null) {
      if (Object.prototype.hasOwnProperty.call(criteria, "eq") && value !== criteria.eq) {
        return false;
      }
      if (Object.prototype.hasOwnProperty.call(criteria, "ne") && value === criteria.ne) {
        return false;
      }
      if (Object.prototype.hasOwnProperty.call(criteria, "gt") && 
          !(typeof value === 'number' && value > criteria.gt)) {
        return false;
      }
      if (Object.prototype.hasOwnProperty.call(criteria, "lt") && 
          !(typeof value === 'number' && value < criteria.lt)) {
        return false;
      }
      if (Object.prototype.hasOwnProperty.call(criteria, "in") && 
          !Array.isArray(criteria.in) && !criteria.in.includes(value)) {
        return false;
      }
      if (Object.prototype.hasOwnProperty.call(criteria, "contains") && 
          !(typeof value === 'string' && value.includes(criteria.contains))) {
        return false;
      }
    } else {
      // Simple equality check
      if (value !== criteria) {
        return false;
      }
    }
  }
  
  return true;
}

/**
 * Apply filtering to data.
 * @param {Array<Object>} data - List of data objects
 * @param {Object} filterCriteria - Filter criteria object
 * @returns {Array} Tuple of [filteredData, filterStats]
 */
function applyFiltering(data, filterCriteria) {
  if (Object.keys(filterCriteria).length === 0) {
    return [data, {}];
  }
  
  const filteredData = [];
  
  for (const item of data) {
    if (checkFilterCriteria(item, filterCriteria)) {
      filteredData.push(item);
    }
  }
  
  const filterStats = {
    filteredCount: filteredData.length,
    originalCount: data.length
  };
  
  return [filteredData, filterStats];
}

/**
 * Calculate statistics for numeric values.
 * @param {Array<number>} numericValues - List of numeric values
 * @returns {Object} Object with calculated statistics
 */
function calculateFieldStatistics(numericValues) {
  if (numericValues.length === 0) {
    return {};
  }
  
  const sum = numericValues.reduce((acc, val) => acc + val, 0);
  const avg = sum / numericValues.length;
  
  const stats = {
    count: numericValues.length,
    sum: sum,
    average: avg,
    min: Math.min(...numericValues),
    max: Math.max(...numericValues)
  };
  
  // Add more statistics if more than one value
  if (numericValues.length > 1) {
    // Sort for median calculation
    const sortedValues = [...numericValues].sort((a, b) => a - b);
    const midIndex = Math.floor(sortedValues.length / 2);
    const median = sortedValues.length % 2 === 0
      ? (sortedValues[midIndex - 1] + sortedValues[midIndex]) / 2
      : sortedValues[midIndex];
    
    // Calculate variance and standard deviation
    const variance = numericValues.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / numericValues.length;
    const stddev = Math.sqrt(variance);
    
    stats.median = median;
    stats.stddev = stddev;
    stats.variance = variance;
  }
  
  return stats;
}

/**
 * Extract numeric values for a field from data.
 * @param {Array<Object>} data - List of data objects
 * @param {string} field - Field to extract values from
 * @returns {Array<number>} List of numeric values
 */
function extractNumericValues(data, field) {
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
  
  return numericValues;
}

/**
 * Calculate aggregations for specified fields.
 * @param {Array<Object>} data - List of data objects
 * @param {Array<string>} aggregationFields - List of fields to aggregate
 * @returns {Object} Object with calculated aggregations
 */
function calculateAggregations(data, aggregationFields) {
  if (data.length === 0 || aggregationFields.length === 0) {
    return {};
  }
  
  const aggregatedData = {};
  
  for (const field of aggregationFields) {
    const numericValues = extractNumericValues(data, field);
    
    if (numericValues.length > 0) {
      aggregatedData[field] = calculateFieldStatistics(numericValues);
    }
  }
  
  return aggregatedData;
}

/**
 * Compute field types and counts.
 * @param {Array<Object>} data - List of data objects
 * @returns {Object} Object with field types information
 */
function computeFieldTypes(data) {
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
  
  return fieldTypes;
}

/**
 * Compute overall statistics.
 * @param {Array<Object>} data - List of data objects
 * @param {boolean} includeStats - Whether to include statistics
 * @returns {Object} Object with computed statistics
 */
function computeOverallStatistics(data, includeStats) {
  if (!includeStats || data.length === 0) {
    return {};
  }
  
  const fieldTypes = computeFieldTypes(data);
  
  return {
    fieldTypes: fieldTypes,
    recordCount: data.length,
    fieldCount: Object.keys(fieldTypes).length
  };
}

/**
 * Write output data to file.
 * @param {string} outputPath - Path to output file
 * @param {Object} outputData - Data to write
 * @param {string} outputFormat - Output format
 * @throws {Error} If output format is not supported or an error occurs
 */
function writeOutputFile(outputPath, outputData, outputFormat) {
  if (outputFormat.toLowerCase() === "json") {
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
  } else {
    throw new Error(`Unsupported output format: ${outputFormat}`);
  }
}

/**
 * Process data from input file, analyze it, and write results to output file.
 * 
 * This function has been refactored to coordinate the data processing pipeline using 
 * smaller, focused functions for each step of the process.
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
  
  // Step 1: Validate inputs
  const validationResults = validateInputs(inputPath, config);
  if (validationResults.status === "error") {
    results.status = "error";
    results.errors.push(...validationResults.errors);
    return results;
  }
  
  // Step 2: Extract configuration options
  const options = extractConfigOptions(config);
  
  try {
    // Step 3: Read input file
    const [data, fileType, warnings] = readInputFile(inputPath);
    results.fileType = fileType;
    results.warnings.push(...warnings);
    
    // Step 4: Apply column mapping
    const mappedData = applyColumnMapping(data, options.columnMapping);
    
    // Step 5: Apply filtering
    const [filteredData, filterStats] = applyFiltering(mappedData, options.filterCriteria);
    Object.assign(results, filterStats);
    
    // Step 6: Calculate aggregations
    const aggregations = calculateAggregations(filteredData, options.aggregationFields);
    if (Object.keys(aggregations).length > 0) {
      results.aggregations = aggregations;
    }
    
    // Step 7: Compute overall statistics
    const statistics = computeOverallStatistics(filteredData, options.includeStats);
    results.statistics = statistics;
    
    // Step 8: Prepare and write output
    const outputData = {
      metadata: results,
      data: filteredData
    };
    
    writeOutputFile(outputPath, outputData, options.outputFormat);
    
    results.recordsProcessed = filteredData.length;
    
  } catch (error) {
    results.status = "error";
    results.errors.push(error.message);
  }
  
  return results;
}

// Export the function
module.exports = {
  processAndAnalyzeData,
  validateInputs,
  extractConfigOptions,
  readInputFile,
  applyColumnMapping,
  applyFiltering,
  calculateAggregations,
  computeOverallStatistics,
  writeOutputFile
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
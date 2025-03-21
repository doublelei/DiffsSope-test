/**
 * JavaScript test file for cross-file refactoring destination.
 * 
 * This file contains modified versions of functions moved from refactoring_source.js
 * to test DiffScope's ability to detect cross-file refactorings.
 */

/**
 * Process a list of data objects and compute statistics with enhanced features.
 * @param {Array<Object>} data - List of objects containing data to process
 * @param {Object} [options] - Processing options
 * @param {boolean} [options.includeAdvancedStats=false] - Whether to include advanced statistical calculations
 * @param {Array<string>} [options.excludeKeys=[]] - Keys to exclude from analysis
 * @returns {Object} Object with computed statistics
 */
function processDataEnhanced(data, options = {}) {
  const { includeAdvancedStats = false, excludeKeys = [] } = options;
  
  if (!data || data.length === 0) {
    return { count: 0, hasData: false, error: null };
  }
  
  try {
    // Extract values by type from each item
    const numericValues = [];
    const textValues = [];
    const booleanValues = [];
    
    for (const item of data) {
      for (const [key, value] of Object.entries(item)) {
        if (excludeKeys.includes(key)) continue;
        
        if (typeof value === 'number' && !Number.isNaN(value)) {
          numericValues.push(value);
        } else if (typeof value === 'string') {
          textValues.push(value);
        } else if (typeof value === 'boolean') {
          booleanValues.push(value);
        }
      }
    }
    
    // Compute statistics
    const result = {
      count: data.length,
      hasData: data.length > 0,
      keysFound: [...new Set(data.flatMap(item => Object.keys(item)))],
      valueTypes: {
        numeric: numericValues.length,
        text: textValues.length,
        boolean: booleanValues.length
      }
    };
    
    if (numericValues.length > 0) {
      numericValues.sort((a, b) => a - b);
      const midpoint = Math.floor(numericValues.length / 2);
      const median = numericValues.length % 2 !== 0
        ? numericValues[midpoint]
        : (numericValues[midpoint - 1] + numericValues[midpoint]) / 2;
      
      const sum = numericValues.reduce((acc, val) => acc + val, 0);
      const mean = sum / numericValues.length;
      
      result.numericStats = {
        min: Math.min(...numericValues),
        max: Math.max(...numericValues),
        mean,
        median,
        sum,
        count: numericValues.length
      };
      
      if (includeAdvancedStats && numericValues.length > 1) {
        // Calculate variance and standard deviation
        const variance = numericValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numericValues.length;
        const stddev = Math.sqrt(variance);
        
        // Calculate quartiles
        const q1Index = Math.floor(numericValues.length * 0.25);
        const q3Index = Math.floor(numericValues.length * 0.75);
        
        result.numericStats.advancedStats = {
          variance,
          stddev,
          quartiles: {
            q1: numericValues[q1Index],
            q2: median,
            q3: numericValues[q3Index]
          }
        };
      }
    }
    
    if (booleanValues.length > 0) {
      const trueCount = booleanValues.filter(Boolean).length;
      result.booleanStats = {
        trueCount,
        falseCount: booleanValues.length - trueCount,
        truePercentage: (trueCount / booleanValues.length) * 100
      };
    }
    
    return result;
  } catch (error) {
    return {
      count: data.length,
      hasData: data.length > 0,
      error: error.message
    };
  }
}

/**
 * Transform a data structure based on a key mapping with enhanced options.
 * @param {Object|Array<Object>} data - Data structure to transform
 * @param {Object} mapping - Object mapping old keys to new keys
 * @param {Object} [options] - Transformation options
 * @param {boolean} [options.recursive=false] - Whether to apply transformation recursively
 * @param {Array<string>} [options.filterKeys=null] - Optional list of keys to include in output
 * @returns {Object|Array<Object>} Transformed data structure
 */
function transformDataStructure(data, mapping, options = {}) {
  const { recursive = false, filterKeys = null } = options;
  
  // Handle array case
  if (Array.isArray(data)) {
    return data
      .filter(item => typeof item === 'object' && item !== null)
      .map(item => transformDataStructure(item, mapping, options));
  }
  
  // Now data is guaranteed to be an object
  const result = {};
  
  // Apply mappings
  for (const [oldKey, newKey] of Object.entries(mapping)) {
    if (Object.prototype.hasOwnProperty.call(data, oldKey)) {
      let value = data[oldKey];
      
      // Recursive transformation
      if (recursive) {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          value = transformDataStructure(value, mapping, options);
        } else if (Array.isArray(value)) {
          value = transformDataStructure(value, mapping, options);
        }
      }
      
      result[newKey] = value;
    }
  }
  
  // Include unmapped keys
  for (const [key, value] of Object.entries(data)) {
    if (!Object.prototype.hasOwnProperty.call(mapping, key)) {
      let transformedValue = value;
      
      // Recursive transformation
      if (recursive) {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          transformedValue = transformDataStructure(value, mapping, options);
        } else if (Array.isArray(value)) {
          transformedValue = transformDataStructure(value, mapping, options);
        }
      }
      
      result[key] = transformedValue;
    }
  }
  
  // Filter keys if required
  if (Array.isArray(filterKeys)) {
    const filteredResult = {};
    for (const key of filterKeys) {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        filteredResult[key] = result[key];
      }
    }
    return filteredResult;
  }
  
  return result;
}

/**
 * Parse structured data from string with support for multiple formats.
 * @param {string} text - String to parse
 * @param {string} [formatType="key_value"] - Format type ("key_value", "json", etc.)
 * @returns {Object} Object with parsed data
 */
function parseStructuredData(text, formatType = "key_value") {
  if (!text) {
    return {};
  }
  
  if (formatType === "key_value") {
    // Split by semicolons, but respect quoted values
    const regex = /([^;=]+)=(?:"([^"]*)"|([^;]*))/g;
    const result = {};
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      const key = match[1].trim();
      const value = match[2] !== undefined ? match[2] : match[3].trim();
      
      // Try to convert to appropriate type
      if (value.toLowerCase() === 'true') {
        result[key] = true;
      } else if (value.toLowerCase() === 'false') {
        result[key] = false;
      } else if (!isNaN(value) && value !== '') {
        if (value.includes('.')) {
          result[key] = parseFloat(value);
        } else {
          result[key] = parseInt(value, 10);
        }
      } else {
        result[key] = value;
      }
    }
    
    return result;
  } else if (formatType === "json") {
    try {
      return JSON.parse(text);
    } catch (error) {
      return { error: "Invalid JSON" };
    }
  } else {
    return { error: `Unsupported format: ${formatType}` };
  }
}

/**
 * Extract specific metrics from a complex data structure.
 * @param {Object} data - Complex data structure
 * @param {Array<string>} metricPaths - List of dot-notation paths to extract
 * @returns {Object} Object with extracted metrics
 */
function extractMetricData(data, metricPaths) {
  const result = {};
  
  for (const path of metricPaths) {
    const parts = path.split('.');
    let current = data;
    let isValid = true;
    
    try {
      for (const part of parts) {
        if (current === null || current === undefined || typeof current !== 'object') {
          isValid = false;
          break;
        }
        current = current[part];
      }
      
      result[path] = isValid ? current : null;
    } catch (error) {
      result[path] = null;
    }
  }
  
  return result;
}

// Test cases
if (require.main === module) {
  // Test processDataEnhanced
  const testData = [
    { name: "Item 1", value: 10, active: true },
    { name: "Item 2", value: 20, active: false },
    { name: "Item 3", value: 30, active: true }
  ];
  const stats = processDataEnhanced(testData, { includeAdvancedStats: true });
  console.log("Enhanced data statistics:", stats);
  
  // Test parseStructuredData
  const testString = 'name="Complex Item"; value=42; active=true; tags="javascript,test,example"';
  const parsed = parseStructuredData(testString, "key_value");
  console.log("Parsed structured data:", parsed);
  
  // Test transformDataStructure with options
  const testMapping = { name: "title", value: "amount", active: "isActive" };
  const transformed = transformDataStructure(testData, testMapping, { recursive: true });
  console.log("Transformed data:", transformed);
  
  // Test extractMetricData
  const complexData = {
    user: {
      profile: {
        name: "Test User",
        age: 30
      }
    },
    metrics: {
      visits: 10,
      conversions: 2
    }
  };
  const metrics = extractMetricData(complexData, ["user.profile.name", "metrics.visits"]);
  console.log("Extracted metrics:", metrics);
}

module.exports = {
  processDataEnhanced,
  parseStructuredData,
  transformDataStructure,
  extractMetricData
}; 
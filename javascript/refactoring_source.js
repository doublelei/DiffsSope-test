/**
 * JavaScript test file for cross-file refactoring source.
 * 
 * This file contains functions that will be moved to another file
 * to test DiffScope's ability to detect cross-file refactorings.
 */

/**
 * Process a list of data objects and compute statistics.
 * @param {Array<Object>} data - List of objects containing data to process
 * @returns {Object} Object with computed statistics
 */
function processData(data) {
  if (!data || data.length === 0) {
    return { count: 0, hasData: false };
  }
  
  // Extract numeric values from each item
  const numericValues = [];
  for (const item of data) {
    for (const [key, value] of Object.entries(item)) {
      if (typeof value === 'number' && !Number.isNaN(value)) {
        numericValues.push(value);
      }
    }
  }
  
  // Compute statistics
  const result = {
    count: data.length,
    hasData: data.length > 0,
    keysFound: [...new Set(data.flatMap(item => Object.keys(item)))]
  };
  
  if (numericValues.length > 0) {
    numericValues.sort((a, b) => a - b);
    const midpoint = Math.floor(numericValues.length / 2);
    const median = numericValues.length % 2 !== 0
      ? numericValues[midpoint]
      : (numericValues[midpoint - 1] + numericValues[midpoint]) / 2;
    
    result.numericStats = {
      min: Math.min(...numericValues),
      max: Math.max(...numericValues),
      mean: numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length,
      median: median,
      sum: numericValues.reduce((sum, val) => sum + val, 0),
      count: numericValues.length
    };
  }
  
  return result;
}

/**
 * Parse a complex string into structured data.
 * 
 * The string is expected to contain key-value pairs in the format:
 * key1=value1; key2="quoted value"; key3=123
 * 
 * @param {string} text - String to parse
 * @returns {Object} Object with parsed key-value pairs
 */
function parseComplexString(text) {
  if (!text) {
    return {};
  }
  
  // Split by semicolons, but respect quoted values
  const regex = /([^;=]+)=(?:"([^"]*)"|([^;]*))/g;
  const result = {};
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const key = match[1].trim();
    const value = match[2] !== undefined ? match[2] : match[3].trim();
    
    // Try to convert to numeric if possible
    if (!isNaN(value) && value !== '') {
      if (value.includes('.')) {
        result[key] = parseFloat(value);
      } else {
        result[key] = parseInt(value, 10);
      }
    } else if (value.toLowerCase() === 'true') {
      result[key] = true;
    } else if (value.toLowerCase() === 'false') {
      result[key] = false;
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Transform a data structure based on a key mapping.
 * @param {Object} data - Data structure to transform
 * @param {Object} mapping - Object mapping old keys to new keys
 * @returns {Object} Transformed data structure
 */
function transformDataStructure(data, mapping) {
  const result = {};
  
  // Map keys according to the mapping
  for (const [oldKey, newKey] of Object.entries(mapping)) {
    if (Object.prototype.hasOwnProperty.call(data, oldKey)) {
      result[newKey] = data[oldKey];
    }
  }
  
  // Include any keys not in the mapping
  for (const [key, value] of Object.entries(data)) {
    if (!Object.prototype.hasOwnProperty.call(mapping, key)) {
      result[key] = value;
    }
  }
  
  return result;
}

// Test cases
if (require.main === module) {
  // Test processData
  const testData = [
    { name: "Item 1", value: 10, active: true },
    { name: "Item 2", value: 20, active: false },
    { name: "Item 3", value: 30, active: true }
  ];
  const stats = processData(testData);
  console.log("Data statistics:", stats);
  
  // Test parseComplexString
  const testString = 'name="Complex Item"; value=42; active=true; tags="javascript,test,example"';
  const parsed = parseComplexString(testString);
  console.log("Parsed string:", parsed);
  
  // Test transformDataStructure
  const testMapping = { name: "title", value: "amount", active: "isActive" };
  const transformed = transformDataStructure(testData[0], testMapping);
  console.log("Transformed data:", transformed);
}

module.exports = {
  processData,
  parseComplexString,
  transformDataStructure
}; 
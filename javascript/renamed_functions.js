/**
 * JavaScript test file for function rename tests.
 * 
 * This file contains functions that will be renamed in various ways
 * to test DiffScope's ability to detect function renames.
 */

/**
 * A simple function with a basic implementation that will be renamed.
 * @param {number} x - First parameter
 * @param {number} y - Second parameter
 * @returns {number} Sum of the parameters
 */
function newNameSimpleFunction(x, y) {
  return x + y;
}

/**
 * A function that will be renamed and have its body modified.
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @param {number} [c=0] - Optional third parameter
 * @returns {number} Sum of parameters with additional processing
 */
function renamedFunctionWithBodyChanges(a, b, c = 0) {
  let result = a + b;  // Start with base result
  
  // Apply optional parameter with additional logic
  if (c !== 0) {
    result += c * 2;  // Changed multiplication factor
  }
  
  return result;  // Return the final result
}

/**
 * A complex function that will be renamed and have signature changes.
 * @param {Array} data - Input data to process
 * @param {number} [minThreshold=0.5] - Minimum threshold for filtering
 * @param {number} [maxThreshold=1.0] - Maximum threshold for filtering
 * @param {Object} [config=null] - Optional configuration object
 * @param {boolean} [config.logging=false] - Whether to log processing
 * @param {Object} [config.logger=null] - Logger instance if logging is enabled
 * @returns {Array} Processed data
 */
function enhancedDataProcessor(data, minThreshold = 0.5, maxThreshold = 1.0, config = null) {
  const result = [];
  
  for (const item of data) {
    if (item >= minThreshold && item <= maxThreshold) {
      result.push(item * 2);
      if (config && config.logging && config.logger) {
        config.logger.info(`Processed item: ${item}`);
      }
    }
  }
  
  return result;
}

/**
 * A helper function that will be renamed.
 * @returns {string} A helpful message
 */
function helperFunctionOld() {
  return "I am a helper function";
}

/**
 * A utility function that will be renamed.
 * @param {string} text - Text to process
 * @returns {string} Processed text
 */
function utilityFunctionOriginal(text) {
  return text.trim().toLowerCase();
}

// Export functions
module.exports = {
  newNameSimpleFunction,
  renamedFunctionWithBodyChanges,
  enhancedDataProcessor,
  helperFunctionOld,
  utilityFunctionOriginal
};

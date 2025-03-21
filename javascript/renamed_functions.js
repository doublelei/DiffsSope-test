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
function oldNameSimpleFunction(x, y) {
  return x + y;
}

/**
 * A function that will be renamed and have its body modified.
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @param {number} [c=0] - Optional third parameter
 * @returns {number} Sum of parameters
 */
function functionToRenameWithBodyChanges(a, b, c = 0) {
  let result = a + b;
  if (c !== 0) {
    result += c;
  }
  return result;
}

/**
 * A complex function that will be renamed and have signature changes.
 * @param {Array} data - Input data to process
 * @param {number} [threshold=0.5] - Threshold for filtering
 * @param {Object} [logger=null] - Optional logger instance
 * @returns {Array} Processed data
 */
function complexFunctionWithOldName(data, threshold = 0.5, logger = null) {
  const result = [];
  
  for (const item of data) {
    if (item > threshold) {
      result.push(item * 2);
      if (logger) {
        logger.info(`Processed item: ${item}`);
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
  oldNameSimpleFunction,
  functionToRenameWithBodyChanges,
  complexFunctionWithOldName,
  helperFunctionOld,
  utilityFunctionOriginal
};

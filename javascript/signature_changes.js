/**
 * JavaScript test file for function signature changes.
 * 
 * This file contains functions that will have their signatures modified in various ways
 * to test DiffScope's ability to detect signature-level changes.
 */

/**
 * This function will have parameters added in a later commit.
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @param {number} [c=0] - Third parameter (added)
 * @param {object} [d=null] - Fourth parameter (added)
 * @param {object} [options={}] - Options object (added)
 * @returns {number} Sum of parameters and number of options
 */
function functionForParamAddition(a, b, c = 0, d = null, options = {}) {
  let result = a + b;
  if (c) {
    result += c;
  }
  
  // Count the options
  const optionsCount = Object.keys(options).length;
  
  return result + optionsCount;
}

/**
 * This function will have parameters removed in a later commit.
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @returns {number} Sum of remaining parameters
 */
function functionForParamRemoval(a, b) {
  // The c and d parameters have been removed
  return a + b;
}

/**
 * A function designed to test parameter renames.
 * 
 * @param {number} first - First parameter (renamed from a)
 * @param {number} second - Second parameter (renamed from b)
 * @returns {number} Sum of the parameters
 */
function functionForParamRename(first, second) {
    return first + second;
}

/**
 * A function designed to test default parameter value changes.
 * 
 * @param {number} a - First parameter (no default)
 * @param {number} [b=20] - Second parameter (default changed from 10 to 20)
 * @param {number} [c=30] - Third parameter (default changed from 5 to 30)
 * @returns {number} Sum of all parameters
 */
function functionForDefaultParamChange(a, b = 20, c = 30) {
    return a + b + c;
}

/**
 * This function uses rest parameters and will be modified.
 * @param {string} prefix - Prefix to prepend to items
 * @param {...any} items - Items to process
 * @returns {Array<string>} Array of processed items
 */
function functionWithRestParams(prefix, ...items) {
  return items.map(item => `${prefix}:${item}`);
}

/**
 * This function uses destructuring in parameters and will be modified.
 * @param {Object} options - Options object
 * @param {string} options.name - Name property
 * @param {number} options.age - Age property
 * @returns {string} Formatted string with the options
 */
function functionWithDestructuring({ name, age }) {
  return `Name: ${name}, Age: ${age}`;
}

/**
 * This function will undergo multiple signature changes at once.
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @param {number} [c=null] - Optional third parameter
 * @returns {Object} Object containing parameter values
 */
function functionWithMultipleSignatureChanges(a, b, c = null) {
  const result = {
    a: a,
    b: b
  };
  
  if (c !== null) {
    result.c = c;
  }
  
  return result;
}

module.exports = {
  functionForParamAddition,
  functionForParamRemoval,
  functionForParamRename,
  functionForDefaultParamChange,
  functionWithRestParams,
  functionWithDestructuring,
  functionWithMultipleSignatureChanges
}; 
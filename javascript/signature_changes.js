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
 * This function will have default parameter values changed in a later commit.
 * @param {string} name - The name to greet
 * @param {string} [greeting="Hello"] - The greeting to use
 * @param {string} [punctuation="!"] - The punctuation to use
 * @returns {string} A formatted greeting string
 */
function functionForDefaultParamChange(name, greeting = "Hello", punctuation = "!") {
  return `${greeting}, ${name}${punctuation}`;
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
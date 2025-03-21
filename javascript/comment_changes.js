/**
 * JavaScript test file for function comment changes.
 * 
 * This file contains functions whose JSDoc comments will be modified
 * to test DiffScope's ability to detect comment-level changes.
 */

/**
 * A simple function with a basic JSDoc comment.
 * 
 * This comment will be modified to test detection of simple
 * comment changes without changing function signature or body.
 * @returns {string} A greeting message
 */
function functionWithSimpleComment() {
  return "Hello, world!";
}

/**
 * A function with a more complex JSDoc comment.
 * 
 * This comment contains parameter descriptions and return value
 * information that will be modified in a later commit.
 * 
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @param {number} [c] - Optional third parameter
 * @returns {object} A dictionary containing the parameter values
 * @throws {Error} If parameters don't meet requirements
 */
function functionWithComplexComment(a, b, c) {
  if (a < 0 || b < 0) {
    throw new Error("Parameters must be non-negative");
  }
  
  const result = {
    a: a,
    b: b
  };
  
  if (c !== undefined) {
    result.c = c;
  }
  
  return result;
}

/**
 * A function with detailed type information.
 * 
 * @param {Array<number>} values - List of numbers to process
 * @param {Object} options - Configuration options
 * @param {string} options.format - Output format
 * @param {boolean} [options.sorted=false] - Whether to sort the results
 * @returns {string|Array} Processed data in requested format
 */
function functionWithTypeInformation(values, options) {
  let result = values.map(x => x * 2);
  
  if (options.sorted) {
    result.sort((a, b) => a - b);
  }
  
  if (options.format === "string") {
    return result.join(", ");
  }
  
  return result;
}

/**
 * A function with example comments.
 * 
 * @param {string} text - Text to process
 * @param {number} [repeat=1] - Number of times to repeat
 * @returns {string} Processed text
 * @example
 * // Returns "hello hello"
 * functionWithExamples("hello", 2);
 */
function functionWithExamples(text, repeat = 1) {
  return Array(repeat).fill(text).join(" ");
}

/**
 * A function with description tags.
 * 
 * @param {object} user - User object
 * @param {string} user.name - User's name
 * @param {number} user.age - User's age
 * @description Creates a formatted user profile
 * @returns {string} Formatted profile
 * @since 1.0.0
 * @deprecated Use the new profiler function instead
 */
function functionWithDescriptionTags(user) {
  return `Name: ${user.name}, Age: ${user.age}`;
}

/**
 * Minimal function comment
 */
function functionWithMinimalComment() {
  return 42;
}

module.exports = {
  functionWithSimpleComment,
  functionWithComplexComment,
  functionWithTypeInformation,
  functionWithExamples,
  functionWithDescriptionTags,
  functionWithMinimalComment
};

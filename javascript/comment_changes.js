/**
 * JavaScript test file for function comment changes.
 * 
 * This file contains functions whose JSDoc comments have been modified
 * to test DiffScope's ability to detect comment-level changes.
 * Updated with more detailed explanations and examples.
 */

/**
 * A simple function with an updated JSDoc comment.
 * 
 * This comment has been modified to test DiffScope's detection
 * of simple comment changes without altering function signature or body.
 * The comment content is different but the function is identical.
 * @returns {string} A standard greeting message
 */
function functionWithSimpleComment() {
  return "Hello, world!";
}

/**
 * A function with a more detailed complex JSDoc comment.
 * 
 * This comment has been enhanced with additional parameter information
 * and more comprehensive details about the return value and exceptions.
 * 
 * @param {number} a - First numeric parameter (must be positive)
 * @param {number} b - Second numeric parameter (must be positive)
 * @param {number|null} [c] - Optional third parameter (can be omitted)
 * @returns {object} An object containing the parameter values with properties:
 *  - a: Value of parameter a
 *  - b: Value of parameter b
 *  - c: Value of parameter c (if provided)
 * @throws {Error} If parameters a or b are negative numbers
 * @throws {TypeError} If parameters are not of expected types
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
 * A function with enhanced type information documentation.
 * 
 * This function processes a list of numbers according to specified options.
 * 
 * @param {Array<number|string>} values - List of numbers or numeric strings to process
 * @param {Object} options - Configuration options object
 * @param {string} options.format - Output format ('string', 'array', or 'object')
 * @param {boolean} [options.sorted=false] - Whether to sort the results in ascending order
 * @param {number} [options.precision=2] - Number of decimal places for numeric formatting
 * @returns {string|Array|Object} Processed data in the requested format
 * @since 2.0.0
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
 * A function with expanded example comments.
 * 
 * This function repeats text a specified number of times with spaces between.
 * 
 * @param {string} text - Text string to be repeated
 * @param {number} [repeat=1] - Number of times to repeat the text
 * @returns {string} Text repeated the specified number of times
 * @example
 * // Basic usage with default repeat
 * functionWithExamples("hello");
 * // Returns: "hello"
 * 
 * @example
 * // Repeating multiple times
 * functionWithExamples("hello", 2);
 * // Returns: "hello hello"
 * 
 * @example
 * // Using an empty string
 * functionWithExamples("", 3);
 * // Returns: "  "
 */
function functionWithExamples(text, repeat = 1) {
  return Array(repeat).fill(text).join(" ");
}

/**
 * A function with updated description tags and metadata.
 * 
 * @param {object} user - User profile object
 * @param {string} user.name - User's full name
 * @param {number} user.age - User's age in years
 * @param {string} [user.occupation] - User's occupation (if available)
 * @description Creates a formatted user profile string with key information
 * @returns {string} Formatted profile with name and age information
 * @since 2.1.0
 * @deprecated Use the enhanced userProfileFormatter function instead
 * @see userProfileFormatter
 * @author DiffScope Team
 */
function functionWithDescriptionTags(user) {
  return `Name: ${user.name}, Age: ${user.age}`;
}

/**
 * Expanded function comment with additional context
 * @returns {number} The answer to the ultimate question
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

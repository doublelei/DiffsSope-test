/**
 * JavaScript test file for whitespace-only function changes.
 * 
 * This file contains functions with various indentation and whitespace styles
 * to test DiffScope's ability to detect or ignore whitespace-only changes.
 */

/**
 * A function with normal whitespace that will have whitespace changes later.
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @param {number} c - Third parameter
 * @returns {number} Sum of all parameters
 */
function functionWithNormalWhitespace(a, b, c) {
  const result=a+b;
  return result+c;
}

/**
 * A function with compact whitespace that will have whitespace changes later.
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @param {number} c - Third parameter
 * @returns {number} Product of all parameters
 */
function functionWithCompactWhitespace(a, b, c) {
  return a * b * c;
}

/**
 * A function with excessive whitespace between parameters.
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @param {number} c - Third parameter
 * @returns {string} String representation of parameters
 */
function functionWithExcessiveWhitespace(a, b, c) {
  const result = a.toString() + " " + b.toString() + " " + c.toString();
  return result;
}

/**
 * A function with unusual indentation that will be changed later.
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @returns {Object} Dictionary of parameter values
 */
function functionWithUnusualIndentation(a, b) {
  let result;
  if (a > b) {
    result = { "larger": a, "smaller": b };
  } else {
    result = { "larger": b, "smaller": a };
  }
  return result;
}

module.exports = {
  functionWithNormalWhitespace,
  functionWithCompactWhitespace,
  functionWithExcessiveWhitespace,
  functionWithUnusualIndentation
}; 
/**
 * JavaScript test file for edge cases.
 * 
 * This file contains examples of JavaScript edge cases like
 * arrow functions, anonymous functions, and other function expressions
 * to test DiffScope's ability to detect changes in these constructs.
 */

// Simple anonymous function expression
const anonymousSum = function(x, y) {
  return x + y;
};

// Simple arrow function
const arrowMultiply = (x, y) => x * y;

// Arrow function with default parameters
const arrowWithDefault = (x, y = 10) => x + y;

// Arrow function with destructuring
const processCoordinates = ([x, y]) => ({
  sum: x + y,
  product: x * y
});

// Arrow function with object destructuring
const processUser = ({ name, age }) => `${name} is ${age} years old`;

// Arrow function with rest parameters
const sumAll = (...numbers) => numbers.reduce((sum, n) => sum + n, 0);

// Higher-order function accepting function as argument
function executeFunction(func, x, y) {
  /**
   * Execute a function that takes two parameters.
   * @param {Function} func - A function that takes two parameters
   * @param {any} x - First parameter
   * @param {any} y - Second parameter
   * @returns {any} Result of func(x, y)
   */
  return func(x, y);
}

// Function returning an arrow function
function createMultiplier(factor) {
  /**
   * Create a function that multiplies by a specific factor.
   * @param {number} factor - The multiplication factor
   * @returns {Function} A function that multiplies its argument by factor
   */
  return x => x * factor;
}

// Function using array methods with arrow functions
function squareAll(numbers) {
  /**
   * Square all numbers in an array.
   * @param {number[]} numbers - Array of numbers
   * @returns {number[]} Array of squared numbers
   */
  return numbers.map(x => x ** 2);
}

// Function using array filter with arrow function
function filterPositive(numbers) {
  /**
   * Filter positive numbers from an array.
   * @param {number[]} numbers - Array of numbers
   * @returns {number[]} Array of positive numbers
   */
  return numbers.filter(x => x > 0);
}

// Function using array sort with arrow function
function sortBySecondItem(pairs) {
  /**
   * Sort pairs by their second item.
   * @param {Array<Array<any>>} pairs - Array of arrays with at least 2 items
   * @returns {Array<Array<any>>} Sorted array of pairs
   */
  return [...pairs].sort((a, b) => a[1] > b[1] ? 1 : -1);
}

// IIFE (Immediately Invoked Function Expression)
const counter = (function() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
    reset: () => { count = 0; return count; }
  };
})();

// Function returning multiple arrow functions
function getMathFuncs() {
  /**
   * Return basic math functions as arrow functions.
   * @returns {Object} Object containing add, subtract, multiply, divide functions
   */
  return {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : null
  };
}

// Function with callback
function processWithCallback(data, callback) {
  /**
   * Process data and call the callback with the result.
   * @param {any} data - Data to process
   * @param {Function} callback - Function to call with processed data
   */
  const processed = { value: data, timestamp: Date.now() };
  callback(processed);
}

// Test cases
if (require.main === module) {
  // Test anonymous and arrow functions
  console.assert(anonymousSum(5, 3) === 8, "anonymousSum test");
  console.assert(arrowMultiply(5, 3) === 15, "arrowMultiply test");
  
  // Test function with function arg
  console.assert(executeFunction((x, y) => x - y, 10, 7) === 3, "executeFunction test");
  
  // Test function generator
  const double = createMultiplier(2);
  console.assert(double(5) === 10, "createMultiplier test");
  
  // Test array methods
  console.assert(JSON.stringify(squareAll([1, 2, 3, 4])) === JSON.stringify([1, 4, 9, 16]), "squareAll test");
  console.assert(JSON.stringify(filterPositive([-2, 0, 3, -1, 5])) === JSON.stringify([3, 5]), "filterPositive test");
  
  // Test counter from IIFE
  console.assert(counter.getCount() === 0, "counter initial value");
  counter.increment();
  counter.increment();
  console.assert(counter.getCount() === 2, "counter after increment");
  
  // Test multiple function return
  const mathFuncs = getMathFuncs();
  console.assert(mathFuncs.add(5, 3) === 8, "mathFuncs.add test");
  console.assert(mathFuncs.subtract(5, 3) === 2, "mathFuncs.subtract test");
  
  console.log("All tests passed!");
}

module.exports = {
  anonymousSum,
  arrowMultiply,
  arrowWithDefault,
  processCoordinates,
  processUser,
  sumAll,
  executeFunction,
  createMultiplier,
  squareAll,
  filterPositive,
  sortBySecondItem,
  counter,
  getMathFuncs,
  processWithCallback
};

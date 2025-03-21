/**
 * JavaScript test file for nested functions.
 * 
 * This file contains examples of nested function definitions
 * and closures to test DiffScope's ability to detect changes
 * in nested function structures.
 */

/**
 * A simple outer function with a nested function.
 * @param {number} x - Input value
 * @returns {number} Result of inner function
 */
function outerFunctionSimple(x) {
  /**
   * Inner function that adds x and y.
   * @param {number} y - Value to add to x
   * @returns {number} Sum of x and y
   */
  function innerFunction(y) {
    return x + y;
  }
  
  return innerFunction(10);
}

/**
 * Create a counter with increment, decrement, and get methods.
 * @returns {Object} An object containing counter methods
 */
function createCounter() {
  let count = 0;
  
  /**
   * Increment counter by 1.
   * @returns {number} New count value
   */
  function increment() {
    return ++count;
  }
  
  /**
   * Decrement counter by 1.
   * @returns {number} New count value
   */
  function decrement() {
    return --count;
  }
  
  /**
   * Get current counter value.
   * @returns {number} Current count value
   */
  function getCount() {
    return count;
  }
  
  /**
   * Reset counter to 0.
   * @returns {number} Reset count value (0)
   */
  function reset() {
    count = 0;
    return count;
  }
  
  return {
    increment,
    decrement,
    getCount,
    reset
  };
}

/**
 * Create a function that adds x to its argument.
 * @param {number} x - Value to add
 * @returns {Function} A function that adds x to its argument
 */
function createAdder(x) {
  /**
   * Add x to y.
   * @param {number} y - Value to add to x
   * @returns {number} Sum of x and y
   */
  return function adder(y) {
    return x + y;
  };
}

/**
 * Create a function that multiplies its argument by x.
 * @param {number} x - Multiplication factor
 * @returns {Function} A function that multiplies its argument by x
 */
function createMultiplier(x) {
  /**
   * Multiply y by x.
   * @param {number} y - Value to multiply by x
   * @returns {number} Product of x and y
   */
  return function multiplier(y) {
    return x * y;
  };
}

/**
 * Create a function that raises its argument to the given exponent.
 * @param {number} exponent - The exponent to use
 * @returns {Function} A function that raises its argument to the given exponent
 */
function createPowerFunction(exponent) {
  /**
   * Raise base to exponent.
   * @param {number} base - Value to raise to the exponent
   * @returns {number} base raised to exponent
   */
  return function powerFunction(base) {
    return Math.pow(base, exponent);
  };
}

/**
 * Create a collection of sequence processing functions.
 * @returns {Object} An object containing sequence processing functions
 */
function createSequenceProcessor() {
  /**
   * Apply func to each element of the sequence.
   * @param {Array} sequence - Input sequence
   * @param {Function} func - Function to apply
   * @returns {Array} Array containing func applied to each element
   */
  function mapSequence(sequence, func) {
    return sequence.map(func);
  }
  
  /**
   * Filter sequence by predicate.
   * @param {Array} sequence - Input sequence
   * @param {Function} predicate - Function that returns true/false
   * @returns {Array} Array containing elements for which predicate is true
   */
  function filterSequence(sequence, predicate) {
    return sequence.filter(predicate);
  }
  
  /**
   * Reduce sequence using func and initial value.
   * @param {Array} sequence - Input sequence
   * @param {Function} func - Binary function to apply cumulatively
   * @param {*} [initial] - Initial value (optional)
   * @returns {*} Accumulated result
   */
  function reduceSequence(sequence, func, initial) {
    return initial !== undefined
      ? sequence.reduce(func, initial)
      : sequence.reduce(func);
  }
  
  return {
    map: mapSequence,
    filter: filterSequence,
    reduce: reduceSequence
  };
}

/**
 * A function with multiple levels of nested functions.
 * @returns {Function} A function that creates nested functions
 */
function functionWithMultipleLevels() {
  /**
   * First level nested function.
   * @param {number} x - First value
   * @returns {Function} Second level function
   */
  return function level1(x) {
    /**
     * Second level nested function.
     * @param {number} y - Second value
     * @returns {Function} Third level function
     */
    return function level2(y) {
      /**
       * Third level nested function.
       * @param {number} z - Third value
       * @returns {number} Sum of x, y, and z
       */
      return function level3(z) {
        return x + y + z;
      };
    };
  };
}

// Module pattern (IIFE with closures)
const calculatorModule = (function() {
  // Private variables
  let result = 0;
  const history = [];
  
  // Private function
  function saveToHistory(operation, value) {
    history.push({ operation, value, result });
  }
  
  // Public API
  return {
    add: function(x) {
      result += x;
      saveToHistory('add', x);
      return result;
    },
    subtract: function(x) {
      result -= x;
      saveToHistory('subtract', x);
      return result;
    },
    multiply: function(x) {
      result *= x;
      saveToHistory('multiply', x);
      return result;
    },
    divide: function(x) {
      if (x === 0) throw new Error("Cannot divide by zero");
      result /= x;
      saveToHistory('divide', x);
      return result;
    },
    getResult: function() {
      return result;
    },
    reset: function() {
      result = 0;
      return result;
    },
    getHistory: function() {
      return [...history]; // Return a copy
    }
  };
})();

// Test cases
if (require.main === module) {
  // Test simple nested function
  console.assert(outerFunctionSimple(5) === 15, "outerFunctionSimple test");
  
  // Test counter
  const counter = createCounter();
  console.assert(counter.getCount() === 0, "counter initial value");
  counter.increment();
  counter.increment();
  console.assert(counter.getCount() === 2, "counter after increment");
  counter.decrement();
  console.assert(counter.getCount() === 1, "counter after decrement");
  counter.reset();
  console.assert(counter.getCount() === 0, "counter after reset");
  
  // Test adder and multiplier
  const addFive = createAdder(5);
  console.assert(addFive(10) === 15, "addFive test");
  
  const double = createMultiplier(2);
  console.assert(double(7) === 14, "double test");
  
  // Test power function
  const square = createPowerFunction(2);
  const cube = createPowerFunction(3);
  console.assert(square(4) === 16, "square test");
  console.assert(cube(2) === 8, "cube test");
  
  // Test sequence processor
  const seqProc = createSequenceProcessor();
  const numbers = [1, 2, 3, 4, 5];
  console.assert(
    JSON.stringify(seqProc.map(numbers, x => x * 2)) === JSON.stringify([2, 4, 6, 8, 10]),
    "map test"
  );
  console.assert(
    JSON.stringify(seqProc.filter(numbers, x => x % 2 === 0)) === JSON.stringify([2, 4]),
    "filter test"
  );
  console.assert(seqProc.reduce(numbers, (x, y) => x + y) === 15, "reduce test");
  
  // Test multiple levels
  const level1Func = functionWithMultipleLevels();
  const level2Func = level1Func(10);
  const level3Func = level2Func(20);
  console.assert(level3Func(30) === 60, "multiple levels test");
  
  // Test calculator module
  console.assert(calculatorModule.getResult() === 0, "calculator initial value");
  calculatorModule.add(5);
  calculatorModule.multiply(2);
  console.assert(calculatorModule.getResult() === 10, "calculator after operations");
  
  console.log("All tests passed!");
}

module.exports = {
  outerFunctionSimple,
  createCounter,
  createAdder,
  createMultiplier,
  createPowerFunction,
  createSequenceProcessor,
  functionWithMultipleLevels,
  calculatorModule
};

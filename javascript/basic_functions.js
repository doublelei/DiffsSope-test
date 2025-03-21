/**
 * Basic JavaScript functions for testing function change detection.
 * 
 * This file contains simple JavaScript functions that will be modified
 * in various ways to test DiffScope's function change detection.
 */

/**
 * Adds two numbers together
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum of a and b
 */
function add(a, b) {
  const result = a + b; // Compute the sum
  return result; // Return the result
}

/**
 * Subtracts one number from another
 * @param {number} a - Number to subtract from
 * @param {number} b - Number to subtract
 * @returns {number} The difference between a and b
 */
function subtract(a, b) {
  return a - b; // No change to this function
}

/**
 * Multiplies two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The product of a and b
 */
function multiply(a, b) {
  return b * a;
}

/**
 * Divides one number by another
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} The quotient of a divided by b
 * @throws {Error} If divisor is zero
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  
  const result = a / b;
  return result;
}

/**
 * Checks if a number is even
 * @param {number} num - Number to check
 * @returns {boolean} True if the number is even, false otherwise
 */
function isEven(num) {
  return (num & 1) === 0;
}

/**
 * Formats a person's name
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @returns {string} Full name formatted as "LastName, FirstName"
 */
function formatName(firstName, lastName) {
  const formattedName = lastName + ", " + firstName;
  return formattedName;
}

/**
 * Calculates the average of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The average value
 * @throws {Error} If the array is empty
 */
function calculateAverage(numbers) {
  if (numbers.length === 0) {
    throw new Error("Cannot calculate average of empty array");
  }
  
  const sum = numbers.reduce((total, num) => total + num, 0);
  const count = numbers.length;
  const average = sum / count;
  return average;
}

/**
 * Reverses a string
 * @param {string} str - String to reverse
 * @returns {string} Reversed string
 */
function reverseString(str) {
  const charArray = str.split('');
  charArray.reverse();
  const reversed = charArray.join('');
  return reversed;
}

/**
 * Checks if a string is a palindrome
 * @param {string} str - String to check
 * @returns {boolean} True if the string is a palindrome, false otherwise
 */
function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedStr = reverseString(cleanStr);
  return cleanStr === reversedStr;
}

/**
 * Generates a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer between min and max
 */
function getRandomInt(min, max) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  
  const randomValue = Math.random();
  const range = maxFloor - minCeil + 1;
  const result = Math.floor(randomValue * range) + minCeil;
  
  return result;
} 
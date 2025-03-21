/**
 * Utility functions for DiffScope test repository.
 * This file is used to test file addition functionality.
 */

/**
 * Calculate the factorial of a number
 * @param {number} n - The number to calculate factorial for
 * @returns {number} The factorial result
 */
function calculateFactorial(n) {
    if (n <= 1) {
        return 1;
    }
    return n * calculateFactorial(n - 1);
}

/**
 * Check if a number is prime
 * @param {number} num - The number to check
 * @returns {boolean} True if prime, false otherwise
 */
function isPrime(num) {
    if (num <= 1) {
        return false;
    }
    if (num <= 3) {
        return true;
    }
    
    if (num % 2 === 0 || num % 3 === 0) {
        return false;
    }
    
    let i = 5;
    while (i * i <= num) {
        if (num % i === 0 || num % (i + 2) === 0) {
            return false;
        }
        i += 6;
    }
    
    return true;
}

/**
 * Get the current timestamp
 * @returns {number} Current timestamp
 */
function getTimestamp() {
    return Date.now();
}

/**
 * Check if a value is an array
 * @param {any} value - Value to check
 * @returns {boolean} True if value is an array
 */
function isArray(value) {
    return Array.isArray(value);
}

/**
 * Convert Celsius to Fahrenheit
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 */
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

module.exports = {
    calculateFactorial,
    isPrime,
    getTimestamp,
    isArray,
    celsiusToFahrenheit
}; 
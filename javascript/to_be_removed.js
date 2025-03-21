/**
 * This file will be removed to demonstrate file deletion functionality.
 */

/**
 * A function in a file that will be removed.
 * @returns {string} A simple message
 */
function temporaryFunction() {
    return "This file will be deleted later";
}

/**
 * Another function in a file that will be removed.
 * @param {number} x - A number to work with
 * @returns {number} x squared
 */
function anotherTempFunction(x) {
    return x * x;
}

/**
 * A class in a file that will be removed.
 */
class TemporaryClass {
    /**
     * Create a TemporaryClass instance
     */
    constructor() {
        this.message = "This class will be removed";
    }
    
    /**
     * Get the message attribute
     * @returns {string} The message
     */
    getMessage() {
        return this.message;
    }
}

module.exports = {
    temporaryFunction,
    anotherTempFunction,
    TemporaryClass
}; 
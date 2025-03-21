/**
 * This file will be renamed to demonstrate file rename functionality.
 */

/**
 * A simple function that will be part of file rename test.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function willBeRenamedFunction(a, b) {
    return a + b;
}

/**
 * Another function in the file that will be renamed.
 * @returns {string} A simple message
 */
function anotherFunction() {
    return "This file will be renamed later";
}

/**
 * A test class in a file that will be renamed.
 */
class TestClass {
    /**
     * Create a TestClass instance
     * @param {string} name - The name
     */
    constructor(name) {
        this.name = name;
    }
    
    /**
     * Get the name attribute
     * @returns {string} The name
     */
    getName() {
        return this.name;
    }
    
    /**
     * Set the name attribute
     * @param {string} newName - The new name
     */
    setName(newName) {
        this.name = newName;
    }
}

module.exports = {
    willBeRenamedFunction,
    anotherFunction,
    TestClass
}; 
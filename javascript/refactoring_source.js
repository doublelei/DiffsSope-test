/**
 * JavaScript test file for cross-file refactoring source.
 * 
 * This file has been refactored with functions moved to refactoring_destination.js
 * to test DiffScope's ability to detect cross-file refactorings.
 */

// Test cases
if (require.main === module) {
  // Import the refactored functions from the destination file
  const { processDataEnhanced, parseStructuredData, transformDataStructure } = require('./refactoring_destination');
  
  // Test processData
  const testData = [
    { name: "Item 1", value: 10, active: true },
    { name: "Item 2", value: 20, active: false },
    { name: "Item 3", value: 30, active: true }
  ];
  const stats = processDataEnhanced(testData);
  console.log("Data statistics:", stats);
  
  // Test parseComplexString
  const testString = 'name="Complex Item"; value=42; active=true; tags="javascript,test,example"';
  const parsed = parseStructuredData(testString, "key_value");
  console.log("Parsed string:", parsed);
  
  // Test transformDataStructure
  const testMapping = { name: "title", value: "amount", active: "isActive" };
  const transformed = transformDataStructure(testData[0], testMapping);
  console.log("Transformed data:", transformed);
}

// Export only empty references to indicate the functions have been moved
module.exports = {
  // These functions have been moved to refactoring_destination.js
  processData: null,
  parseComplexString: null,
  transformDataStructure: null
}; 
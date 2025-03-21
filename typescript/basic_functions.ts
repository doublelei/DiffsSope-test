/**
 * Basic TypeScript functions for testing function change detection.
 * 
 * This file contains simple TypeScript functions that will be modified
 * in various ways to test DiffScope's function change detection.
 */

/**
 * Adds two numbers together
 * @param a First number
 * @param b Second number
 * @returns The sum of a and b
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Subtracts one number from another
 * @param a Number to subtract from
 * @param b Number to subtract
 * @returns The difference between a and b
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Multiplies two numbers
 * @param a First number
 * @param b Second number
 * @returns The product of a and b
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Divides one number by another
 * @param a Dividend
 * @param b Divisor
 * @returns The quotient of a divided by b
 * @throws Error if divisor is zero
 */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

/**
 * Interface for a Person
 */
export interface Person {
  firstName: string;
  lastName: string;
  age: number;
  email?: string;
}

/**
 * Creates a Person object
 * @param firstName First name
 * @param lastName Last name
 * @param age Age of the person
 * @param email Optional email address
 * @returns A Person object
 */
export function createPerson(
  firstName: string,
  lastName: string,
  age: number,
  email?: string
): Person {
  return {
    firstName,
    lastName,
    age,
    email
  };
}

/**
 * Formats a person's full name
 * @param person Person object
 * @returns Formatted full name
 */
export function formatFullName(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

/**
 * Checks if a person is an adult
 * @param person Person to check
 * @param adultAge Optional age threshold for adulthood (default: 18)
 * @returns True if the person is an adult, false otherwise
 */
export function isAdult(person: Person, adultAge: number = 18): boolean {
  return person.age >= adultAge;
}

/**
 * Calculates the average of an array of numbers
 * @param numbers Array of numbers
 * @returns The average value
 * @throws Error if the array is empty
 */
export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("Cannot calculate average of empty array");
  }
  
  const sum = numbers.reduce((total, num) => total + num, 0);
  return sum / numbers.length;
}

/**
 * Filters an array of persons to only include adults
 * @param persons Array of Person objects
 * @param adultAge Optional age threshold for adulthood (default: 18)
 * @returns Array of adult Person objects
 */
export function filterAdults(persons: Person[], adultAge: number = 18): Person[] {
  return persons.filter(person => isAdult(person, adultAge));
}

/**
 * Type for search options
 */
export type SearchOptions = {
  caseSensitive?: boolean;
  wholeWord?: boolean;
  maxResults?: number;
};

/**
 * Searches for occurrences of a pattern in a text
 * @param text Text to search in
 * @param pattern Pattern to search for
 * @param options Search options
 * @returns Array of found indices
 */
export function findOccurrences(
  text: string,
  pattern: string,
  options: SearchOptions = {}
): number[] {
  const { 
    caseSensitive = false, 
    wholeWord = false,
    maxResults = -1 
  } = options;
  
  if (!pattern) return [];
  
  const result: number[] = [];
  let searchText = text;
  let searchPattern = pattern;
  
  if (!caseSensitive) {
    searchText = searchText.toLowerCase();
    searchPattern = searchPattern.toLowerCase();
  }
  
  let position = 0;
  let index: number;
  
  while ((index = searchText.indexOf(searchPattern, position)) !== -1) {
    if (wholeWord) {
      const leftBoundary = index === 0 || !/\w/.test(searchText[index - 1]);
      const rightBoundary = index + searchPattern.length === searchText.length || 
                           !/\w/.test(searchText[index + searchPattern.length]);
      
      if (leftBoundary && rightBoundary) {
        result.push(index);
      }
    } else {
      result.push(index);
    }
    
    position = index + searchPattern.length;
    
    if (maxResults > 0 && result.length >= maxResults) {
      break;
    }
  }
  
  return result;
} 
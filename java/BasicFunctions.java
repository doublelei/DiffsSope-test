/**
 * Basic Java functions for testing function change detection.
 * 
 * This file contains simple Java methods that will be modified
 * in various ways to test DiffScope's function change detection.
 */
public class BasicFunctions {
    
    /**
     * Adds two numbers together
     * @param a First number
     * @param b Second number
     * @return The sum of a and b
     */
    public static int add(int a, int b) {
        return a + b;
    }
    
    /**
     * Subtracts one number from another
     * @param a Number to subtract from
     * @param b Number to subtract
     * @return The difference between a and b
     */
    public static int subtract(int a, int b) {
        return a - b;
    }
    
    /**
     * Multiplies two numbers
     * @param a First number
     * @param b Second number
     * @return The product of a and b
     */
    public static int multiply(int a, int b) {
        return a * b;
    }
    
    /**
     * Divides one number by another
     * @param a Dividend
     * @param b Divisor
     * @return The quotient of a divided by b
     * @throws ArithmeticException if divisor is zero
     */
    public static double divide(double a, double b) {
        if (b == 0) {
            throw new ArithmeticException("Division by zero");
        }
        return a / b;
    }
    
    /**
     * Checks if a number is even
     * @param num Number to check
     * @return true if the number is even, false otherwise
     */
    public static boolean isEven(int num) {
        return num % 2 == 0;
    }
    
    /**
     * Calculates the factorial of a number
     * @param n Number to calculate factorial for
     * @return The factorial of n
     * @throws IllegalArgumentException if n is negative
     */
    public static long factorial(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Factorial not defined for negative numbers");
        }
        
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        
        return result;
    }
    
    /**
     * Reverses a string
     * @param str String to reverse
     * @return Reversed string
     */
    public static String reverseString(String str) {
        return new StringBuilder(str).reverse().toString();
    }
    
    /**
     * Checks if a string is a palindrome
     * @param str String to check
     * @return true if the string is a palindrome, false otherwise
     */
    public static boolean isPalindrome(String str) {
        String clean = str.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        int length = clean.length();
        
        for (int i = 0; i < length / 2; i++) {
            if (clean.charAt(i) != clean.charAt(length - 1 - i)) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Finds the maximum value in an array
     * @param array Array to search
     * @return The maximum value
     * @throws IllegalArgumentException if array is empty
     */
    public static int findMax(int[] array) {
        if (array.length == 0) {
            throw new IllegalArgumentException("Array is empty");
        }
        
        int max = array[0];
        for (int i = 1; i < array.length; i++) {
            if (array[i] > max) {
                max = array[i];
            }
        }
        
        return max;
    }
    
    /**
     * Calculates the average of an array of numbers
     * @param array Array of numbers
     * @return The average value
     * @throws IllegalArgumentException if array is empty
     */
    public static double calculateAverage(int[] array) {
        if (array.length == 0) {
            throw new IllegalArgumentException("Cannot calculate average of empty array");
        }
        
        int sum = 0;
        for (int value : array) {
            sum += value;
        }
        
        return (double) sum / array.length;
    }
}
/**
 * Basic C++ functions for testing function change detection.
 * 
 * This file contains simple C++ functions that will be modified
 * in various ways to test DiffScope's function change detection.
 */

#include <string>
#include <vector>
#include <stdexcept>
#include <algorithm>
#include <numeric>
#include <cmath>

/**
 * Adds two numbers together
 * @param a First number
 * @param b Second number
 * @return The sum of a and b
 */
int add(int a, int b) {
    return a + b;
}

/**
 * Subtracts one number from another
 * @param a Number to subtract from
 * @param b Number to subtract
 * @return The difference between a and b
 */
int subtract(int a, int b) {
    return a - b;
}

/**
 * Multiplies two numbers
 * @param a First number
 * @param b Second number
 * @return The product of a and b
 */
int multiply(int a, int b) {
    return a * b;
}

/**
 * Divides one number by another
 * @param a Dividend
 * @param b Divisor
 * @return The quotient of a divided by b
 * @throw std::invalid_argument if divisor is zero
 */
double divide(double a, double b) {
    if (b == 0.0) {
        throw std::invalid_argument("Division by zero");
    }
    return a / b;
}

/**
 * Raises a number to a power
 * @param base The base
 * @param exponent The exponent
 * @return base raised to exponent
 */
double power(double base, int exponent) {
    double result = 1.0;
    bool negative_exponent = exponent < 0;
    
    if (negative_exponent) {
        exponent = -exponent;
    }
    
    for (int i = 0; i < exponent; i++) {
        result *= base;
    }
    
    if (negative_exponent) {
        result = 1.0 / result;
    }
    
    return result;
}

/**
 * Calculates the factorial of a number
 * @param n Number to calculate factorial for
 * @return The factorial of n
 * @throw std::invalid_argument if n is negative
 */
long long factorial(int n) {
    if (n < 0) {
        throw std::invalid_argument("Factorial not defined for negative numbers");
    }
    
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    
    return result;
}

/**
 * Checks if a number is prime
 * @param n Number to check
 * @return true if the number is prime, false otherwise
 */
bool isPrime(int n) {
    if (n <= 1) {
        return false;
    }
    
    if (n <= 3) {
        return true;
    }
    
    if (n % 2 == 0 || n % 3 == 0) {
        return false;
    }
    
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) {
            return false;
        }
    }
    
    return true;
}

/**
 * Reverses a string
 * @param str String to reverse
 * @return Reversed string
 */
std::string reverseString(const std::string& str) {
    std::string reversed = str;
    std::reverse(reversed.begin(), reversed.end());
    return reversed;
}

/**
 * Calculates the average of a vector of numbers
 * @param numbers Vector of numbers
 * @return The average value
 * @throw std::invalid_argument if vector is empty
 */
double calculateAverage(const std::vector<double>& numbers) {
    if (numbers.empty()) {
        throw std::invalid_argument("Cannot calculate average of empty vector");
    }
    
    double sum = std::accumulate(numbers.begin(), numbers.end(), 0.0);
    return sum / numbers.size();
}

/**
 * Finds the maximum value in a vector
 * @param numbers Vector of numbers
 * @return The maximum value
 * @throw std::invalid_argument if vector is empty
 */
double findMax(const std::vector<double>& numbers) {
    if (numbers.empty()) {
        throw std::invalid_argument("Vector is empty");
    }
    
    return *std::max_element(numbers.begin(), numbers.end());
}

/**
 * Merges two sorted vectors
 * @param a First sorted vector
 * @param b Second sorted vector
 * @return Merged sorted vector
 */
std::vector<int> mergeSorted(const std::vector<int>& a, const std::vector<int>& b) {
    std::vector<int> result;
    result.reserve(a.size() + b.size());
    
    size_t i = 0, j = 0;
    
    while (i < a.size() && j < b.size()) {
        if (a[i] <= b[j]) {
            result.push_back(a[i++]);
        } else {
            result.push_back(b[j++]);
        }
    }
    
    while (i < a.size()) {
        result.push_back(a[i++]);
    }
    
    while (j < b.size()) {
        result.push_back(b[j++]);
    }
    
    return result;
} 
/**
 * Basic Go functions for testing function change detection.
 *
 * This file contains simple Go functions that will be modified
 * in various ways to test DiffScope's function change detection.
 */

package basic

import (
	"errors"
	"math"
	"sort"
	"strings"
	"unicode"
)

// Add returns the sum of two integers
func Add(a, b int) int {
	return a + b
}

// Subtract returns the difference between two integers
func Subtract(a, b int) int {
	return a - b
}

// Multiply returns the product of two integers
func Multiply(a, b int) int {
	return a * b
}

// Divide returns the quotient of a divided by b
// Returns an error if b is zero
func Divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}

// IsPrime checks if a number is prime
func IsPrime(n int) bool {
	if n <= 1 {
		return false
	}
	
	if n <= 3 {
		return true
	}
	
	if n%2 == 0 || n%3 == 0 {
		return false
	}
	
	for i := 5; i*i <= n; i += 6 {
		if n%i == 0 || n%(i+2) == 0 {
			return false
		}
	}
	
	return true
}

// Factorial calculates the factorial of a number
// Returns an error if n is negative
func Factorial(n int) (int64, error) {
	if n < 0 {
		return 0, errors.New("factorial not defined for negative numbers")
	}
	
	if n == 0 {
		return 1, nil
	}
	
	var result int64 = 1
	for i := 2; i <= n; i++ {
		result *= int64(i)
	}
	
	return result, nil
}

// ReverseString reverses a string
func ReverseString(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

// IsPalindrome checks if a string is a palindrome
// Ignores case and non-alphanumeric characters
func IsPalindrome(s string) bool {
	var clean []rune
	
	// Remove non-alphanumeric characters and convert to lowercase
	for _, r := range s {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			clean = append(clean, unicode.ToLower(r))
		}
	}
	
	for i, j := 0, len(clean)-1; i < j; i, j = i+1, j-1 {
		if clean[i] != clean[j] {
			return false
		}
	}
	
	return true
}

// CalculateAverage calculates the average of a slice of numbers
// Returns an error if the slice is empty
func CalculateAverage(numbers []float64) (float64, error) {
	if len(numbers) == 0 {
		return 0, errors.New("cannot calculate average of empty slice")
	}
	
	sum := 0.0
	for _, num := range numbers {
		sum += num
	}
	
	return sum / float64(len(numbers)), nil
}

// FindMax finds the maximum value in a slice
// Returns an error if the slice is empty
func FindMax(numbers []int) (int, error) {
	if len(numbers) == 0 {
		return 0, errors.New("slice is empty")
	}
	
	max := numbers[0]
	for _, num := range numbers {
		if num > max {
			max = num
		}
	}
	
	return max, nil
}

// Person represents a person with name and age
type Person struct {
	FirstName string
	LastName  string
	Age       int
	Email     string
}

// FormatFullName formats a person's full name
func FormatFullName(p Person) string {
	return p.FirstName + " " + p.LastName
}

// IsAdult checks if a person is an adult
func IsAdult(p Person, adultAge int) bool {
	return p.Age >= adultAge
}

// FilterAdults filters a slice of persons to only include adults
func FilterAdults(persons []Person, adultAge int) []Person {
	var adults []Person
	
	for _, person := range persons {
		if IsAdult(person, adultAge) {
			adults = append(adults, person)
		}
	}
	
	return adults
}

// SortByField sorts a slice of strings based on the given field
func SortByField(items []string, ascending bool) []string {
	result := make([]string, len(items))
	copy(result, items)
	
	if ascending {
		sort.Strings(result)
	} else {
		sort.Sort(sort.Reverse(sort.StringSlice(result)))
	}
	
	return result
}

// CountWords counts the number of words in a string
func CountWords(text string) int {
	if len(strings.TrimSpace(text)) == 0 {
		return 0
	}
	
	words := strings.Fields(text)
	return len(words)
}

// CalculateStatistics calculates various statistics for a slice of numbers
// Returns mean, median, and standard deviation
// Returns an error if the slice is empty
func CalculateStatistics(numbers []float64) (float64, float64, float64, error) {
	if len(numbers) == 0 {
		return 0, 0, 0, errors.New("cannot calculate statistics of empty slice")
	}
	
	// Calculate mean
	sum := 0.0
	for _, num := range numbers {
		sum += num
	}
	mean := sum / float64(len(numbers))
	
	// Calculate median
	sorted := make([]float64, len(numbers))
	copy(sorted, numbers)
	sort.Float64s(sorted)
	
	var median float64
	if len(sorted)%2 == 0 {
		median = (sorted[len(sorted)/2-1] + sorted[len(sorted)/2]) / 2
	} else {
		median = sorted[len(sorted)/2]
	}
	
	// Calculate standard deviation
	varianceSum := 0.0
	for _, num := range numbers {
		varianceSum += math.Pow(num-mean, 2)
	}
	variance := varianceSum / float64(len(numbers))
	stdDev := math.Sqrt(variance)
	
	return mean, median, stdDev, nil
} 
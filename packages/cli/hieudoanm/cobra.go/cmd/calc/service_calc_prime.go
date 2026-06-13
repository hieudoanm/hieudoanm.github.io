package calc

import "math"

func isPrime(n int64) bool {
	if n < 2 {
		return false
	}
	if n == 2 || n == 3 {
		return true
	}
	if n%2 == 0 || n%3 == 0 {
		return false
	}
	limit := int64(math.Sqrt(float64(n)))
	for i := int64(5); i <= limit; i += 6 {
		if n%i == 0 || n%(i+2) == 0 {
			return false
		}
	}
	return true
}

func sieve(limit int64) []int64 {
	if limit < 2 {
		return nil
	}
	isComposite := make([]bool, limit+1)
	for i := int64(2); i*i <= limit; i++ {
		if !isComposite[i] {
			for j := i * i; j <= limit; j += i {
				isComposite[j] = true
			}
		}
	}
	var primes []int64
	for i := int64(2); i <= limit; i++ {
		if !isComposite[i] {
			primes = append(primes, i)
		}
	}
	return primes
}

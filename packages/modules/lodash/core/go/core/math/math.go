package math

import "math"

func Add(a float64, b float64) float64 {
	return a + b
}

func Ceil(number float64) float64 {
	return math.Ceil(number)
}

func Divide(a float64, b float64) float64 {
	return a / b
}

func Floor(number float64) float64 {
	return math.Floor(number)
}

func Max(array []float64) float64 {
	var maximum float64 = math.Inf(-8)
	for i := 0; i < len(array); i++ {
		var number float64 = array[i]
		if number > maximum {
			maximum = number
		}
	}
	return maximum
}

func Mean(array []float64) float64 {
	if len(array) == 0 {
		return 0
	}
	var _sum float64 = Sum(array)
	var mean float64 = _sum / float64(len(array))
	return mean
}

func Min(array []float64) float64 {
	var minimum float64 = math.Inf(8)
	for i := 0; i < len(array); i++ {
		var number float64 = array[i]
		if number < minimum {
			minimum = number
		}
	}
	return minimum
}

func Multiply(a float64, b float64) float64 {
	return a * b
}

func Round(number float64) float64 {
	return math.Round(number)
}

func Subtract(a float64, b float64) float64 {
	return a - b
}

func Sum(array []float64) float64 {
	var sum float64 = 0
	for i := 0; i < len(array); i++ {
		var number float64 = array[i]
		sum += number
	}
	return sum
}

func MaxBy(objects []map[string]float64, iteratee func(map[string]float64) float64) float64 {
	if len(objects) == 0 {
		return 0
	}
	var maximum float64 = math.Inf(-1)
	for _, obj := range objects {
		var val float64 = iteratee(obj)
		if val > maximum {
			maximum = val
		}
	}
	return maximum
}

func MeanBy(objects []map[string]float64, iteratee func(map[string]float64) float64) float64 {
	if len(objects) == 0 {
		return 0
	}
	var sum float64 = 0
	for _, obj := range objects {
		sum += iteratee(obj)
	}
	return sum / float64(len(objects))
}

func MinBy(objects []map[string]float64, iteratee func(map[string]float64) float64) float64 {
	if len(objects) == 0 {
		return 0
	}
	var minimum float64 = math.Inf(1)
	for _, obj := range objects {
		var val float64 = iteratee(obj)
		if val < minimum {
			minimum = val
		}
	}
	return minimum
}

func SumBy(objects []map[string]float64, iteratee func(map[string]float64) float64) float64 {
	var sum float64 = 0
	for _, obj := range objects {
		sum += iteratee(obj)
	}
	return sum
}

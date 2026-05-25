package number

import "math/rand"

func Clamp(number float64, lower float64, upper float64) float64 {
	if number < lower {
		return lower
	}
	if number > upper {
		return upper
	}
	return number
}

func InRange(params ...float64) bool {
	if len(params) == 2 {
		var number float64 = params[0]
		var stop float64 = params[1]
		return 0 < number && number < stop
	}

	if len(params) >= 3 {
		var number float64 = params[0]
		var start float64 = params[1]
		var stop float64 = params[2]
		return start < number && number < stop
	}

	return false
}

func Random(lower int, upper int) int {
	if lower > upper {
		var temp int = lower
		lower = upper
		upper = temp
	}
	return rand.Intn(upper-lower) + lower
}

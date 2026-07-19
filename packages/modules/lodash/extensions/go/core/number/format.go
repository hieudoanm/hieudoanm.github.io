package number

import (
	"math"
	"strconv"
	"strings"
)

func PadZero(number int64, length int) string {
	s := strconv.FormatInt(number, 10)
	if len(s) >= length {
		return s
	}
	return strings.Repeat("0", length-len(s)) + s
}

func FormatCurrency(amount float64, currency string) string {
	if currency == "" {
		currency = "USD"
	}
	intPart := int64(amount)
	cents := int64(math.Round(math.Abs(amount-float64(intPart)) * 100))
	formatted := FormatComma(intPart)
	if cents > 0 {
		formatted += "." + PadZero(cents, 2)
	}
	return formatted + " " + currency
}

func FormatComma(number int64) string {
	s := strconv.FormatInt(number, 10)
	n := len(s)
	if n <= 3 {
		return s
	}
	var parts []string
	for i := n; i > 0; i -= 3 {
		start := i - 3
		if start < 0 {
			start = 0
		}
		parts = append([]string{s[start:i]}, parts...)
	}
	return strings.Join(parts, ",")
}

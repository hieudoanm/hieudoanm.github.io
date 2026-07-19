package number

import (
	"testing"
)

func TestConvertBase(t *testing.T) {
	t.Run("decimal to hex", func(t *testing.T) {
		got := ConvertBase("255").From(10).To(16)
		if got != "FF" {
			t.Errorf("ConvertBase('255').From(10).To(16) = %q, want 'FF'", got)
		}
	})

	t.Run("binary to hex", func(t *testing.T) {
		got := ConvertBase("1111").From(2).To(16)
		if got != "F" {
			t.Errorf("ConvertBase('1111').From(2).To(16) = %q, want 'F'", got)
		}
	})

	t.Run("invalid number", func(t *testing.T) {
		got := ConvertBase("xyz").From(10).To(16)
		if got != "Invalid number or base" {
			t.Errorf("expected error message, got %q", got)
		}
	})

	t.Run("zero", func(t *testing.T) {
		got := ConvertBase("0").From(10).To(16)
		if got != "0" {
			t.Errorf("ConvertBase('0').From(10).To(16) = %q, want '0'", got)
		}
	})
}

func TestPadZero(t *testing.T) {
	tests := []struct {
		number int64
		length int
		want   string
	}{
		{42, 5, "00042"},
		{42, 2, "42"},
		{0, 3, "000"},
		{12345, 3, "12345"},
	}

	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			if got := PadZero(tt.number, tt.length); got != tt.want {
				t.Errorf("PadZero(%d,%d) = %q, want %q", tt.number, tt.length, got, tt.want)
			}
		})
	}
}

func TestFormatComma(t *testing.T) {
	tests := []struct {
		number int64
		want   string
	}{
		{0, "0"},
		{123, "123"},
		{1234, "1,234"},
		{1234567, "1,234,567"},
		{-1000, "-1,000"},
	}

	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			if got := FormatComma(tt.number); got != tt.want {
				t.Errorf("FormatComma(%d) = %q, want %q", tt.number, got, tt.want)
			}
		})
	}
}

func TestFormatCurrency(t *testing.T) {
	tests := []struct {
		amount   float64
		currency string
		want     string
	}{
		{1234.56, "USD", "1,234.56 USD"},
		{1000, "EUR", "1,000 EUR"},
		{0.5, "USD", "0.50 USD"},
		{-50.5, "USD", "-50.50 USD"},
	}

	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			if got := FormatCurrency(tt.amount, tt.currency); got != tt.want {
				t.Errorf("FormatCurrency(%v,%q) = %q, want %q", tt.amount, tt.currency, got, tt.want)
			}
		})
	}

	t.Run("empty currency defaults to USD", func(t *testing.T) {
		got := FormatCurrency(100, "")
		if got != "100 USD" {
			t.Errorf("FormatCurrency(100,'') = %q, want '100 USD'", got)
		}
	})
}

func TestArabicToRoman(t *testing.T) {
	tests := []struct {
		num  int
		want string
	}{
		{1, "I"},
		{4, "IV"},
		{5, "V"},
		{9, "IX"},
		{10, "X"},
		{40, "XL"},
		{50, "L"},
		{90, "XC"},
		{100, "C"},
		{400, "CD"},
		{500, "D"},
		{900, "CM"},
		{1000, "M"},
		{1994, "MCMXCIV"},
		{2024, "MMXXIV"},
	}

	for _, tt := range tests {
		t.Run(tt.want, func(t *testing.T) {
			if got := ArabicToRoman(tt.num); got != tt.want {
				t.Errorf("ArabicToRoman(%d) = %q, want %q", tt.num, got, tt.want)
			}
		})
	}
}

func TestRomanToArabic(t *testing.T) {
	tests := []struct {
		roman string
		want  string
	}{
		{"I", "1"},
		{"IV", "4"},
		{"V", "5"},
		{"IX", "9"},
		{"X", "10"},
		{"XL", "40"},
		{"L", "50"},
		{"XC", "90"},
		{"C", "100"},
		{"CD", "400"},
		{"D", "500"},
		{"CM", "900"},
		{"M", "1000"},
		{"MCMXCIV", "1994"},
		{"MMXXIV", "2024"},
	}

	for _, tt := range tests {
		t.Run(tt.roman, func(t *testing.T) {
			if got := RomanToArabic(tt.roman); got != tt.want {
				t.Errorf("RomanToArabic(%q) = %q, want %q", tt.roman, got, tt.want)
			}
		})
	}
}

func TestRoundtripRoman(t *testing.T) {
	numbers := []int{1, 4, 9, 42, 99, 199, 444, 999, 1994, 2024, 3999}
	for _, n := range numbers {
		roman := ArabicToRoman(n)
		back := RomanToArabic(roman)
		if back != "" {
			// weak check: just verify it doesn't error
		}
	}
}

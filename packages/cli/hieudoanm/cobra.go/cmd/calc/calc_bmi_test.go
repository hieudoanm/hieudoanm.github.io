package calc

import (
	"testing"
)

func TestBmiCategory(t *testing.T) {
	tests := []struct {
		bmi      float64
		category string
	}{
		{16, "Underweight"},
		{20, "Normal"},
		{27, "Overweight"},
		{35, "Obese"},
	}
	for _, tt := range tests {
		if got := bmiCategory(tt.bmi); got != tt.category {
			t.Errorf("bmiCategory(%.1f) = %q, want %q", tt.bmi, got, tt.category)
		}
	}
}

package calc

import (
	"math"
	"testing"
)

func TestCompoundingPeriods(t *testing.T) {
	tests := []struct {
		freq string
		want float64
	}{
		{"daily", 365},
		{"monthly", 12},
		{"quarterly", 4},
		{"yearly", 1},
		{"unknown", 1},
	}
	for _, tt := range tests {
		if got := compoundingPeriods(tt.freq); got != tt.want {
			t.Errorf("compoundingPeriods(%q) = %v, want %v", tt.freq, got, tt.want)
		}
	}
}

func TestFutureValue(t *testing.T) {
	// $10,000 at 5% for 10 years, yearly compounding, no contributions
	fv, deposits := futureValue(10000, 5, 10, 0, 1)
	expected := 10000 * math.Pow(1.05, 10) // ~16288.95
	if math.Abs(fv-expected) > 0.01 {
		t.Errorf("futureValue no contributions = %v, want %v", fv, expected)
	}
	if deposits != 10000 {
		t.Errorf("deposits = %v, want 10000", deposits)
	}

	// With contributions: $100/year for 10 years at 5%
	fv, deposits = futureValue(0, 5, 10, 100, 1)
	// FV = 100 * ((1.05^10 - 1) / 0.05) = 100 * 12.5779...
	expected = 100 * (math.Pow(1.05, 10) - 1) / 0.05
	if math.Abs(fv-expected) > 0.01 {
		t.Errorf("futureValue with contributions = %v, want %v", fv, expected)
	}
	if deposits != 1000 {
		t.Errorf("deposits = %v, want 1000", deposits)
	}

	// Zero rate
	fv, deposits = futureValue(1000, 0, 5, 50, 12)
	if fv != 1000+50*12*5 {
		t.Errorf("futureValue zero rate = %v, want %v", fv, 1000+50*12*5)
	}
}

func TestYearBreakdown(t *testing.T) {
	rows := yearBreakdown(1000, 10, 3, 0, 1)
	if len(rows) != 3 {
		t.Fatalf("expected 3 rows, got %d", len(rows))
	}
	// Year 1: 1000 * 1.10 = 1100
	if math.Abs(rows[0].Balance-1100) > 0.01 {
		t.Errorf("year 1 balance = %v, want 1100", rows[0].Balance)
	}
	// Year 3: 1000 * 1.10^3 = 1331
	expected := 1000 * math.Pow(1.10, 3)
	if math.Abs(rows[2].Balance-expected) > 0.01 {
		t.Errorf("year 3 balance = %v, want %v", rows[2].Balance, expected)
	}
}

package elo

import (
	"math"
	"testing"
)

func TestDiffToExpected(t *testing.T) {
	tests := []struct {
		diff float64
		want float64
	}{
		{diff: 0, want: 0.5},
		{diff: 200, want: 0.7597469},
		{diff: -200, want: 0.2402531},
		{diff: 400, want: 0.9090909},
		{diff: -400, want: 0.0909091},
	}

	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			got := diffToExpected(tt.diff)
			if math.Abs(got-tt.want) > 1e-6 {
				t.Errorf("diffToExpected(%.0f) = %.7f, want %.7f", tt.diff, got, tt.want)
			}
		})
	}
}

func TestExpectedToDiff(t *testing.T) {
	tests := []struct {
		exp  float64
		want float64
	}{
		{exp: 0.5, want: 0},
		{exp: 0.75, want: 191},
		{exp: 0.9090909, want: 400},
		{exp: 0.2402531, want: -200},
	}

	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			got := expectedToDiff(tt.exp)
			if math.Abs(got-tt.want) > 1 {
				t.Errorf("expectedToDiff(%.7f) = %.0f, want %.0f", tt.exp, got, tt.want)
			}
		})
	}
}

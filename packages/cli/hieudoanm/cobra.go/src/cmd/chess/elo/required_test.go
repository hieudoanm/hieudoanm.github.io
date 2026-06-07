package elo

import (
	"math"
	"testing"
)

func TestRequiredScore(t *testing.T) {
	tests := []struct {
		name      string
		avg       float64
		games     float64
		target    float64
		wantScore float64
		wantPct   float64
		tolerance float64
	}{
		{name: "example", avg: 2200, games: 9, target: 2400, wantScore: 6.8, wantPct: 75.9, tolerance: 0.2},
		{name: "same as avg", avg: 2000, games: 10, target: 2000, wantScore: 5.0, wantPct: 50.0, tolerance: 0.1},
		{name: "much higher target", avg: 2000, games: 5, target: 2800, wantScore: 4.95, wantPct: 99.0, tolerance: 0.1},
		{name: "much lower target", avg: 2000, games: 5, target: 1200, wantScore: 0.05, wantPct: 1.0, tolerance: 0.1},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotScore, gotPct := requiredScore(tt.avg, tt.games, tt.target)
			if math.Abs(gotScore-tt.wantScore) > tt.tolerance {
				t.Errorf("requiredScore() score = %.2f, want %.2f", gotScore, tt.wantScore)
			}
			if math.Abs(gotPct-tt.wantPct) > tt.tolerance {
				t.Errorf("requiredScore() pct = %.2f, want %.2f", gotPct, tt.wantPct)
			}
		})
	}
}

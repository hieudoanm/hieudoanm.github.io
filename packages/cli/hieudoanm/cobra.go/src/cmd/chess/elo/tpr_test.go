package elo

import (
	"math"
	"testing"
)

func TestPerformanceRating(t *testing.T) {
	tests := []struct {
		name      string
		ratings   []float64
		score     float64
		games     int
		wantAvg   float64
		wantTPR   float64
		tolerance float64
	}{
		{name: "3/4 example", ratings: []float64{1800, 1900, 2000, 2100}, score: 3, games: 4, wantAvg: 1950, wantTPR: 2141, tolerance: 1},
		{name: "perfect score", ratings: []float64{1800, 1900, 2000}, score: 3, games: 3, wantAvg: 1900, wantTPR: 2700, tolerance: 1},
		{name: "zero score", ratings: []float64{1800, 1900, 2000}, score: 0, games: 3, wantAvg: 1900, wantTPR: 1100, tolerance: 1},
		{name: "50% score", ratings: []float64{2000, 2000, 2000}, score: 1.5, games: 3, wantAvg: 2000, wantTPR: 2000, tolerance: 1},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotAvg, gotTPR := performanceRating(tt.ratings, tt.score, tt.games)
			if math.Abs(gotAvg-tt.wantAvg) > 0.01 {
				t.Errorf("performanceRating() avg = %.2f, want %.2f", gotAvg, tt.wantAvg)
			}
			if math.Abs(gotTPR-tt.wantTPR) > tt.tolerance {
				t.Errorf("performanceRating() tpr = %.2f, want %.2f", gotTPR, tt.wantTPR)
			}
		})
	}
}

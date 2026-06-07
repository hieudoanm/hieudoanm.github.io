package elo

import (
	"math"
	"testing"
)

func TestRatingChange(t *testing.T) {
	tests := []struct {
		name      string
		player    float64
		opponent  float64
		score     float64
		k         float64
		wantDelta float64
		wantNew   float64
		tolerance float64
	}{
		{name: "win against stronger", player: 1800, opponent: 2000, score: 1.0, k: 20, wantDelta: 15.1949, wantNew: 1815.1949, tolerance: 0.01},
		{name: "draw against stronger", player: 1800, opponent: 2000, score: 0.5, k: 20, wantDelta: 5.1949, wantNew: 1805.1949, tolerance: 0.01},
		{name: "loss against weaker", player: 1800, opponent: 1600, score: 0.0, k: 20, wantDelta: -15.1949, wantNew: 1784.8051, tolerance: 0.01},
		{name: "equal ratings win", player: 1500, opponent: 1500, score: 1.0, k: 32, wantDelta: 16.0, wantNew: 1516.0, tolerance: 0.01},
		{name: "equal ratings loss", player: 1500, opponent: 1500, score: 0.0, k: 32, wantDelta: -16.0, wantNew: 1484.0, tolerance: 0.01},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotDelta, gotNew := ratingChange(tt.player, tt.opponent, tt.score, tt.k)
			if math.Abs(gotDelta-tt.wantDelta) > tt.tolerance {
				t.Errorf("ratingChange() delta = %.4f, want %.4f", gotDelta, tt.wantDelta)
			}
			if math.Abs(gotNew-tt.wantNew) > tt.tolerance {
				t.Errorf("ratingChange() newRating = %.4f, want %.4f", gotNew, tt.wantNew)
			}
		})
	}
}

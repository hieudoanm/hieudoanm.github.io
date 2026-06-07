package elo

import (
	"math"
	"testing"
)

func TestExpectedScore(t *testing.T) {
	tests := []struct {
		name      string
		player    float64
		opponent  float64
		wantLower float64
		wantUpper float64
		wantExact *float64
	}{
		{name: "equal ratings", player: 1500, opponent: 1500, wantExact: ptr(0.5)},
		{name: "player higher by 400", player: 1900, opponent: 1500, wantExact: ptr(0.9090909)},
		{name: "player lower by 400", player: 1500, opponent: 1900, wantExact: ptr(0.0909091)},
		{name: "player higher by 200", player: 1800, opponent: 1600, wantExact: ptr(0.7597469)},
		{name: "player lower by 200", player: 1600, opponent: 1800, wantExact: ptr(0.2402531)},
		{name: "large gap", player: 2400, opponent: 1200, wantExact: ptr(0.9990010)},
		{name: "same as example", player: 1800, opponent: 2000, wantExact: ptr(0.2402531)},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := expectedScore(tt.player, tt.opponent)
			if tt.wantExact != nil {
				if math.Abs(got-*tt.wantExact) > 1e-6 {
					t.Errorf("expectedScore(%.0f, %.0f) = %.7f, want %.7f", tt.player, tt.opponent, got, *tt.wantExact)
				}
			} else {
				if got < tt.wantLower || got > tt.wantUpper {
					t.Errorf("expectedScore(%.0f, %.0f) = %.7f, want [%.7f, %.7f]", tt.player, tt.opponent, got, tt.wantLower, tt.wantUpper)
				}
			}
		})
	}
}

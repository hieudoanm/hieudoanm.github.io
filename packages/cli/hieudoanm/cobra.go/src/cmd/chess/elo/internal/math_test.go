package internal

import (
	"math"
	"testing"
)

func ptr(f float64) *float64 {
	return &f
}

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
			got := ExpectedScore(tt.player, tt.opponent)
			if tt.wantExact != nil {
				if math.Abs(got-*tt.wantExact) > 1e-6 {
					t.Errorf("ExpectedScore(%.0f, %.0f) = %.7f, want %.7f", tt.player, tt.opponent, got, *tt.wantExact)
				}
			} else {
				if got < tt.wantLower || got > tt.wantUpper {
					t.Errorf("ExpectedScore(%.0f, %.0f) = %.7f, want [%.7f, %.7f]", tt.player, tt.opponent, got, tt.wantLower, tt.wantUpper)
				}
			}
		})
	}
}

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
			gotDelta, gotNew := RatingChange(tt.player, tt.opponent, tt.score, tt.k)
			if math.Abs(gotDelta-tt.wantDelta) > tt.tolerance {
				t.Errorf("RatingChange() delta = %.4f, want %.4f", gotDelta, tt.wantDelta)
			}
			if math.Abs(gotNew-tt.wantNew) > tt.tolerance {
				t.Errorf("RatingChange() newRating = %.4f, want %.4f", gotNew, tt.wantNew)
			}
		})
	}
}

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
			got := DiffToExpected(tt.diff)
			if math.Abs(got-tt.want) > 1e-6 {
				t.Errorf("DiffToExpected(%.0f) = %.7f, want %.7f", tt.diff, got, tt.want)
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
			got := ExpectedToDiff(tt.exp)
			if math.Abs(got-tt.want) > 1 {
				t.Errorf("ExpectedToDiff(%.7f) = %.0f, want %.0f", tt.exp, got, tt.want)
			}
		})
	}
}

func TestTournamentGames(t *testing.T) {
	games, total := TournamentGames(1800, 20, []float64{1900, 1750, 1850}, []string{"win", "draw", "loss"})

	if len(games) != 3 {
		t.Fatalf("expected 3 games, got %d", len(games))
	}

	expected := []struct {
		opponent float64
		result   string
		score    float64
	}{
		{1900, "win", 1.0},
		{1750, "draw", 0.5},
		{1850, "loss", 0.0},
	}
	for i, e := range expected {
		if games[i].Opponent != e.opponent || games[i].Result != e.result || games[i].Score != e.score {
			t.Errorf("game %d: got {%v, %q, %v}, want {%v, %q, %v}", i+1, games[i].Opponent, games[i].Result, games[i].Score, e.opponent, e.result, e.score)
		}
	}

	if math.Abs(total-2.80) > 0.2 {
		t.Errorf("expected total delta ~ 2.80, got %.2f", total)
	}
}

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
			gotAvg, gotTPR := PerformanceRating(tt.ratings, tt.score, tt.games)
			if math.Abs(gotAvg-tt.wantAvg) > 0.01 {
				t.Errorf("PerformanceRating() avg = %.2f, want %.2f", gotAvg, tt.wantAvg)
			}
			if math.Abs(gotTPR-tt.wantTPR) > tt.tolerance {
				t.Errorf("PerformanceRating() tpr = %.2f, want %.2f", gotTPR, tt.wantTPR)
			}
		})
	}
}

func TestParseFloats(t *testing.T) {
	tests := []struct {
		input string
		want  []float64
	}{
		{input: "1800,1900,2000", want: []float64{1800, 1900, 2000}},
		{input: "1800, 1900, 2000", want: []float64{1800, 1900, 2000}},
		{input: "1800", want: []float64{1800}},
		{input: "", want: nil},
		{input: "abc", want: nil},
	}

	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			got := ParseFloats(tt.input)
			if len(got) != len(tt.want) {
				t.Fatalf("ParseFloats(%q) = %v, want %v", tt.input, got, tt.want)
			}
			for i := range got {
				if got[i] != tt.want[i] {
					t.Errorf("ParseFloats(%q)[%d] = %.0f, want %.0f", tt.input, i, got[i], tt.want[i])
				}
			}
		})
	}
}

func TestResultToScore(t *testing.T) {
	tests := []struct {
		input string
		want  float64
		err   bool
	}{
		{input: "win", want: 1.0},
		{input: "1", want: 1.0},
		{input: "draw", want: 0.5},
		{input: "0.5", want: 0.5},
		{input: "loss", want: 0.0},
		{input: "0", want: 0.0},
		{input: " invalid ", err: true},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			got, err := ResultToScore(tt.input)
			if tt.err && err == nil {
				t.Fatal("expected error, got nil")
			}
			if !tt.err && err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if !tt.err && got != tt.want {
				t.Errorf("ResultToScore(%q) = %.1f, want %.1f", tt.input, got, tt.want)
			}
		})
	}
}

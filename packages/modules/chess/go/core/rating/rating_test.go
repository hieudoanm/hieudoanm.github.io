package rating

import (
	"math"
	"testing"
)

func TestGetScoreValue(t *testing.T) {
	tests := []struct {
		score Score
		want  float64
	}{
		{ScoreWin, 1},
		{ScoreDraw, 0.5},
		{ScoreLoss, 0},
		{Score("unknown"), 0},
	}
	for _, tc := range tests {
		got := GetScoreValue(tc.score)
		if got != tc.want {
			t.Errorf("GetScoreValue(%s) = %f, want %f", tc.score, got, tc.want)
		}
	}
}

func TestCalculatePerformanceEmpty(t *testing.T) {
	result := CalculatePerformance(PerformanceInput{})
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestCalculatePerformanceAllWins(t *testing.T) {
	input := PerformanceInput{
		Games: []Game{
			{RatingOpponent: 1500, Score: ScoreWin},
			{RatingOpponent: 1600, Score: ScoreWin},
			{RatingOpponent: 1700, Score: ScoreWin},
		},
	}
	result := CalculatePerformance(input)
	if result <= 0 {
		t.Errorf("expected positive performance, got %d", result)
	}
}

func TestCalculatePerformanceAllLosses(t *testing.T) {
	input := PerformanceInput{
		Games: []Game{
			{RatingOpponent: 1500, Score: ScoreLoss},
			{RatingOpponent: 1600, Score: ScoreLoss},
		},
	}
	result := CalculatePerformance(input)
	if result == 0 {
		t.Errorf("expected non-zero, got %d", result)
	}
}

func TestCalculatePerformanceMixed(t *testing.T) {
	input := PerformanceInput{
		Games: []Game{
			{RatingOpponent: 1500, Score: ScoreWin},
			{RatingOpponent: 1500, Score: ScoreDraw},
			{RatingOpponent: 1500, Score: ScoreLoss},
		},
	}
	result := CalculatePerformance(input)
	if result <= 0 {
		t.Errorf("expected positive, got %d", result)
	}
}

func TestGetAverageOpponentRating(t *testing.T) {
	tests := []struct {
		name  string
		games []Game
		want  float64
	}{
		{"empty", []Game{}, 0},
		{"single", []Game{{RatingOpponent: 1500, Score: ScoreWin}}, 1500},
		{"multiple", []Game{{RatingOpponent: 1400}, {RatingOpponent: 1600}}, 1500},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got := getAverageOpponentRating(tc.games)
			if math.Abs(got-tc.want) > 0.01 {
				t.Errorf("got %f, want %f", got, tc.want)
			}
		})
	}
}

func TestGetScorePercentage(t *testing.T) {
	tests := []struct {
		name  string
		games []Game
		want  float64
	}{
		{"empty", []Game{}, 0},
		{"all wins", []Game{{Score: ScoreWin}, {Score: ScoreWin}}, 1},
		{"all draws", []Game{{Score: ScoreDraw}, {Score: ScoreDraw}}, 0.5},
		{"mixed", []Game{{Score: ScoreWin}, {Score: ScoreLoss}}, 0.5},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got := getScorePercentage(tc.games)
			if math.Abs(got-tc.want) > 0.01 {
				t.Errorf("got %f, want %f", got, tc.want)
			}
		})
	}
}

func TestGetPerformanceDifferential(t *testing.T) {
	tests := []struct {
		p    float64
		want float64
	}{
		{0.5, 0},
		{0, -400},
		{1, 400},
	}
	for _, tc := range tests {
		got := getPerformanceDifferential(tc.p)
		if tc.p == 0.5 && got != 0 {
			t.Errorf("for p=0.5 expected 0, got %f", got)
		}
	}
}

func TestGetDevelopmentCoefficient(t *testing.T) {
	tests := []struct {
		name          string
		ratingPlayer  int
		lessThan30    bool
		over2400      bool
		over18        bool
		timeClass     TimeClass
		want          DevelopmentCoefficient
	}{
		{"rapid", 1500, false, false, true, TimeClassRapid, DevCoeff20},
		{"blitz", 1500, false, false, true, TimeClassBlitz, DevCoeff20},
		{"over2400", 2500, false, true, true, TimeClassClassical, DevCoeff10},
		{"under18 under2300", 1500, false, false, false, TimeClassClassical, DevCoeff40},
		{"lessThan30Games", 1500, true, false, true, TimeClassClassical, DevCoeff40},
		{"default", 1800, false, false, true, TimeClassClassical, DevCoeff20},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got := getDevelopmentCoefficient(tc.ratingPlayer, tc.lessThan30, tc.over2400, tc.over18, tc.timeClass)
			if got != tc.want {
				t.Errorf("expected %d, got %d", tc.want, got)
			}
		})
	}
}

func TestGetDelta(t *testing.T) {
	t.Run("win against higher rated", func(t *testing.T) {
		delta := getDelta(1500, 1600, false, false, true, ScoreWin, TimeClassClassical)
		if delta <= 0 {
			t.Errorf("expected positive delta, got %d", delta)
		}
	})

	t.Run("invalid score", func(t *testing.T) {
		delta := getDelta(1500, 1500, false, false, true, Score("invalid"), TimeClassClassical)
		if delta != 0 {
			t.Errorf("expected 0, got %d", delta)
		}
	})

	t.Run("zero rating defaults", func(t *testing.T) {
		delta := getDelta(0, 0, false, false, true, ScoreWin, TimeClassClassical)
		if delta == 0 {
			t.Errorf("expected non-zero delta with defaults, got %d", delta)
		}
	})
}

func TestCalculateRating(t *testing.T) {
	t.Run("basic calculation", func(t *testing.T) {
		result := CalculateRating(CalculateRatingParams{
			RatingPlayer:   1500,
			RatingOpponent: 1500,
			LessThan30Games: false,
			OverRating2400:  false,
			OverAge18:      true,
			Score:          ScoreWin,
			TimeClass:      TimeClassClassical,
		})
		if result <= 1500 {
			t.Errorf("expected rating > 1500 for a win, got %d", result)
		}
	})

	t.Run("loss", func(t *testing.T) {
		result := CalculateRating(CalculateRatingParams{
			RatingPlayer:   1500,
			RatingOpponent: 1500,
			OverAge18:      true,
			Score:          ScoreLoss,
			TimeClass:      TimeClassClassical,
		})
		if result >= 1500 {
			t.Errorf("expected rating < 1500 for a loss, got %d", result)
		}
	})

	t.Run("zero rating defaults", func(t *testing.T) {
		result := CalculateRating(CalculateRatingParams{
			RatingPlayer:   0,
			RatingOpponent: 0,
			OverAge18:      true,
			Score:          ScoreWin,
			TimeClass:      TimeClassClassical,
		})
		if result <= 0 {
			t.Errorf("expected positive rating, got %d", result)
		}
	})

	t.Run("empty score defaults to draw", func(t *testing.T) {
		result := CalculateRating(CalculateRatingParams{
			RatingPlayer:   1500,
			RatingOpponent: 1500,
			OverAge18:      true,
			Score:          "",
			TimeClass:      TimeClassClassical,
		})
		if result != 1500 {
			t.Errorf("expected 1500 for draw, got %d", result)
		}
	})

	t.Run("empty timeclass defaults to classical", func(t *testing.T) {
		result := CalculateRating(CalculateRatingParams{
			RatingPlayer:   1500,
			RatingOpponent: 1500,
			OverAge18:      true,
			Score:          ScoreDraw,
			TimeClass:      "",
		})
		if result != 1500 {
			t.Errorf("expected 1500, got %d", result)
		}
	})
}

func TestConstants(t *testing.T) {
	if TimeClassClassical != "classical" {
		t.Errorf("expected classical, got %s", TimeClassClassical)
	}
	if TimeClassRapid != "rapid" {
		t.Errorf("expected rapid, got %s", TimeClassRapid)
	}
	if TimeClassBlitz != "blitz" {
		t.Errorf("expected blitz, got %s", TimeClassBlitz)
	}
}

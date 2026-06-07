package elo

import (
	"math"
	"testing"
)

func TestTournamentGames(t *testing.T) {
	games, total := tournamentGames(1800, 20, []float64{1900, 1750, 1850}, []string{"win", "draw", "loss"})

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

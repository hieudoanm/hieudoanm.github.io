package pgn

import (
	"testing"

	"github.com/hieudoanm/chess/core/game"
	"github.com/hieudoanm/chess/core/types"
)

func TestParsePGN(t *testing.T) {
	t.Run("single game", func(t *testing.T) {
		pgn := `[Event "Test"]
[Site "Internet"]
[Date "2024.01.01"]
[Round "1"]
[White "Player1"]
[Black "Player2"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 1-0`
		games := ParsePGN(pgn)
		if len(games) != 1 {
			t.Fatalf("expected 1 game, got %d", len(games))
		}
		if games[0].Result != "1-0" {
			t.Errorf("expected 1-0, got %s", games[0].Result)
		}
		if games[0].Headers["Event"] != "Test" {
			t.Errorf("expected Test event")
		}
		if len(games[0].Moves) != 6 {
			t.Errorf("expected 6 moves, got %d", len(games[0].Moves))
		}
	})

	t.Run("multiple games", func(t *testing.T) {
		pgn := `[Event "Game1"]
1. e4 e5 1-0

[Event "Game2"]
1. d4 d5 0-1`
		games := ParsePGN(pgn)
		if len(games) != 2 {
			t.Fatalf("expected 2 games, got %d", len(games))
		}
		if games[0].Headers["Event"] != "Game1" {
			t.Errorf("expected Game1")
		}
		if games[1].Headers["Event"] != "Game2" {
			t.Errorf("expected Game2")
		}
	})

	t.Run("empty input", func(t *testing.T) {
		games := ParsePGN("")
		if len(games) != 0 {
			t.Errorf("expected 0 games")
		}
	})

	t.Run("whitespace input", func(t *testing.T) {
		games := ParsePGN("  \n  \n")
		if len(games) != 0 {
			t.Errorf("expected 0 games")
		}
	})

	t.Run("no headers", func(t *testing.T) {
		pgn := `1. e4 e5 2. Nf3 Nc6 *`
		games := ParsePGN(pgn)
		if len(games) != 1 {
			t.Fatalf("expected 1 game")
		}
		if len(games[0].Moves) != 4 {
			t.Errorf("expected 4 half-moves, got %d", len(games[0].Moves))
		}
	})
}

func TestStringifyPGN(t *testing.T) {
	game := PGNGame{
		Headers: map[string]string{"Event": "Test", "White": "A", "Black": "B"},
		Moves: []PGNMove{
			{MoveNumber: 1, Color: "w", SAN: "e4"},
			{MoveNumber: 1, Color: "b", SAN: "e5"},
			{MoveNumber: 2, Color: "w", SAN: "Nf3"},
			{MoveNumber: 2, Color: "b", SAN: "Nc6"},
		},
		Result: "1-0",
	}
	result := StringifyPGN([]PGNGame{game})
	if result == "" {
		t.Errorf("expected non-empty PGN string")
	}
	if len(result) < 10 {
		t.Errorf("expected longer PGN string")
	}
}

func TestGetMoves(t *testing.T) {
	pgn := `[Event "Test"]
1. e4 e5 2. Nf3 Nc6 *`
	moves := GetMoves(pgn)
	if len(moves) != 4 {
		t.Errorf("expected 4 moves, got %d", len(moves))
	}
	if moves[0] != "e4" {
		t.Errorf("expected e4, got %s", moves[0])
	}
}

func TestGetMovesEmpty(t *testing.T) {
	moves := GetMoves("")
	if moves != nil {
		t.Errorf("expected nil for empty input")
	}
}

func TestGetHeaders(t *testing.T) {
	pgn := `[Event "Test"]
[Site "Internet"]
1. e4 e5 *`
	headers := GetHeaders(pgn)
	if headers == nil {
		t.Fatal("expected headers")
	}
	if headers["Event"] != "Test" {
		t.Errorf("expected Test, got %s", headers["Event"])
	}
}

func TestGetHeadersEmpty(t *testing.T) {
	headers := GetHeaders("")
	if headers != nil {
		t.Errorf("expected nil for empty input")
	}
}

func TestStateToPGN(t *testing.T) {
	state := game.CreateGame("")
	m1 := game.MakeMove(state, types.Move{From: 12, To: 28}) // e2e4
	pgn := StateToPGN(m1)
	if pgn == "" {
		t.Errorf("expected non-empty PGN")
	}
}

func TestStateToPGNMultipleMoves(t *testing.T) {
	state := game.CreateGame("")
	state1 := game.MakeMove(state, types.Move{From: 12, To: 28})                           // e4
	state2 := game.MakeMove(state1, types.Move{From: 52, To: 36})                          // e5
	state3 := game.MakeMove(state2, types.Move{From: 1, To: 18})                           // Nc3
	state4 := game.MakeMove(state3, types.Move{From: 62, To: 45})                          // Nc6
	pgn := StateToPGN(state4)
	if pgn == "" {
		t.Errorf("expected non-empty PGN")
	}
}

func TestParseMovesWithComments(t *testing.T) {
	text := "1. e4 {good move} e5 2. Nf3 Nc6 *"
	moves := parseMoves(text)
	if len(moves) != 4 {
		t.Errorf("expected 4 moves, got %d", len(moves))
	}
}

func TestParseMovesWithoutNumbers(t *testing.T) {
	text := "e4 e5 Nf3 Nc6 *"
	moves := parseMoves(text)
	if len(moves) != 4 {
		t.Errorf("expected 4 moves, got %d", len(moves))
	}
}

func TestParsePGNWithResultHeader(t *testing.T) {
	pgn := `[Result "1/2-1/2"]
1. e4 e5 *`
	games := ParsePGN(pgn)
	if len(games) != 1 {
		t.Fatalf("expected 1 game")
	}
	if games[0].Result != "1/2-1/2" {
		t.Errorf("expected 1/2-1/2, got %s", games[0].Result)
	}
}

func TestParsePGNNoResult(t *testing.T) {
	pgn := `[Event "Test"]
1. e4 e5 *`
	games := ParsePGN(pgn)
	if len(games) != 1 {
		t.Fatalf("expected 1 game")
	}
	if games[0].Result != "*" {
		t.Errorf("expected *, got %s", games[0].Result)
	}
}

func TestParsePGNMoveColors(t *testing.T) {
	text := "1. e4 e5 2. Nf3"
	moves := parseMoves(text)
	if len(moves) != 3 {
		t.Fatalf("expected 3 moves, got %d", len(moves))
	}
	if moves[0].Color != "w" || moves[0].SAN != "e4" {
		t.Errorf("expected first move white e4")
	}
	if moves[1].Color != "b" || moves[1].SAN != "e5" {
		t.Errorf("expected second move black e5")
	}
	if moves[2].Color != "w" || moves[2].SAN != "Nf3" {
		t.Errorf("expected third move white Nf3")
	}
}

func TestParseMovesEmpty(t *testing.T) {
	moves := parseMoves("")
	if len(moves) != 0 {
		t.Errorf("expected 0 moves")
	}
}

func TestTagRegex(t *testing.T) {
	match := tagRegex.FindStringSubmatch(`[Event "Test"]`)
	if match == nil || match[1] != "Event" || match[2] != "Test" {
		t.Errorf("tag regex failed: %v", match)
	}
}

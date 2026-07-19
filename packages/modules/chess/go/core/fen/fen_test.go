package fen

import "testing"

func TestParseFENFields(t *testing.T) {
	t.Run("valid full FEN", func(t *testing.T) {
		fields, err := ParseFENFields("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
		if err != nil {
			t.Fatal(err)
		}
		if fields.PiecePlacement != "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" {
			t.Errorf("unexpected piece placement: %s", fields.PiecePlacement)
		}
		if fields.ActiveColor != "w" {
			t.Errorf("expected w, got %s", fields.ActiveColor)
		}
		if fields.CastlingAvailability != "KQkq" {
			t.Errorf("expected KQkq, got %s", fields.CastlingAvailability)
		}
		if fields.EnPassantTarget != "-" {
			t.Errorf("expected -, got %s", fields.EnPassantTarget)
		}
		if fields.HalfMoveClock != 0 {
			t.Errorf("expected 0, got %d", fields.HalfMoveClock)
		}
		if fields.FullMoveNumber != 1 {
			t.Errorf("expected 1, got %d", fields.FullMoveNumber)
		}
	})

	t.Run("empty FEN", func(t *testing.T) {
		_, err := ParseFENFields("")
		if err == nil {
			t.Fatal("expected error for empty FEN")
		}
	})

	t.Run("not enough fields", func(t *testing.T) {
		_, err := ParseFENFields("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq")
		if err == nil {
			t.Fatal("expected error for short FEN")
		}
	})

	t.Run("invalid active color", func(t *testing.T) {
		_, err := ParseFENFields("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR x KQkq - 0 1")
		if err == nil {
			t.Fatal("expected error for invalid color")
		}
	})

	t.Run("invalid halfmove clock", func(t *testing.T) {
		_, err := ParseFENFields("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - abc 1")
		if err == nil {
			t.Fatal("expected error for invalid halfmove")
		}
	})

	t.Run("invalid fullmove number", func(t *testing.T) {
		_, err := ParseFENFields("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 abc")
		if err == nil {
			t.Fatal("expected error for invalid fullmove")
		}
	})

	t.Run("en passant target", func(t *testing.T) {
		fields, err := ParseFENFields("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1")
		if err != nil {
			t.Fatal(err)
		}
		if fields.EnPassantTarget != "e3" {
			t.Errorf("expected e3, got %s", fields.EnPassantTarget)
		}
	})

	t.Run("black to move", func(t *testing.T) {
		fields, err := ParseFENFields("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1")
		if err != nil {
			t.Fatal(err)
		}
		if fields.ActiveColor != "b" {
			t.Errorf("expected b, got %s", fields.ActiveColor)
		}
	})

	t.Run("no castling", func(t *testing.T) {
		fields, err := ParseFENFields("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1")
		if err != nil {
			t.Fatal(err)
		}
		if fields.CastlingAvailability != "-" {
			t.Errorf("expected -, got %s", fields.CastlingAvailability)
		}
	})
}

func TestStringifyFENFields(t *testing.T) {
	fields := FENFields{
		PiecePlacement:       "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
		ActiveColor:          "w",
		CastlingAvailability: "KQkq",
		EnPassantTarget:      "-",
		HalfMoveClock:        0,
		FullMoveNumber:       1,
	}
	result := StringifyFENFields(fields)
	expected := "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
	if result != expected {
		t.Errorf("got %s, want %s", result, expected)
	}
}

func TestChess960BackRankToInitialFEN(t *testing.T) {
	t.Run("standard back rank position", func(t *testing.T) {
		fen, err := Chess960BackRankToInitialFEN("RNBQKBNR", "standard")
		if err != nil {
			t.Fatal(err)
		}
		expected := "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
		if fen != expected {
			t.Errorf("got %s, want %s", fen, expected)
		}
	})

	t.Run("chess960 variant", func(t *testing.T) {
		fen, err := Chess960BackRankToInitialFEN("BBNNQRKR", "chess960")
		if err != nil {
			t.Fatal(err)
		}
		if fen == "" {
			t.Errorf("expected non-empty FEN")
		}
	})

	t.Run("invalid back rank length", func(t *testing.T) {
		_, err := Chess960BackRankToInitialFEN("RNBQKBN", "standard")
		if err == nil {
			t.Fatal("expected error for short back rank")
		}
	})

	t.Run("chess960 missing rooks", func(t *testing.T) {
		_, err := Chess960BackRankToInitialFEN("BNBQKBNR", "chess960")
		if err == nil {
			t.Fatal("expected error for missing rooks in chess960")
		}
	})
}

func TestGet960Castling(t *testing.T) {
	t.Run("king at position", func(t *testing.T) {
		result, err := get960Castling("RKRBBQNN")
		if err != nil {
			t.Fatal(err)
		}
		if result == "-" {
			t.Errorf("expected non-empty castling rights")
		}
	})

	t.Run("no king", func(t *testing.T) {
		result, err := get960Castling("RRBBQQNN")
		if err != nil {
			t.Fatal(err)
		}
		if result != "-" {
			t.Errorf("expected -, got %s", result)
		}
	})
}

func TestGet960CastlingErrorCase(t *testing.T) {
	_, err := get960Castling("RKRBBQN")
	if err != nil {
		t.Errorf("unexpected error for 8-char input")
	}
}

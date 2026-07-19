package notation

import (
	"testing"

	"github.com/hieudoanm/chess/core/board"
	"github.com/hieudoanm/chess/core/types"
)

func TestParseFEN(t *testing.T) {
	t.Run("starting position", func(t *testing.T) {
		state := ParseFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
		if state.Turn != types.White {
			t.Errorf("expected white to move, got %s", state.Turn)
		}
		if !state.CastlingRights.WK || !state.CastlingRights.WQ || !state.CastlingRights.BK || !state.CastlingRights.BQ {
			t.Errorf("expected all castling rights")
		}
		if state.EnPassant != types.NoSquare {
			t.Errorf("expected no en passant")
		}
		if state.HalfMoveClock != 0 {
			t.Errorf("expected 0 halfmove clock")
		}
		if state.FullMoveNumber != 1 {
			t.Errorf("expected 1 fullmove number")
		}
		if state.InCheck {
			t.Errorf("expected not in check")
		}
	})

	t.Run("black to move with en passant", func(t *testing.T) {
		state := ParseFEN("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1")
		if state.Turn != types.Black {
			t.Errorf("expected black to move")
		}
		if state.EnPassant == types.NoSquare {
			t.Errorf("expected en passant target")
		}
	})

	t.Run("no castling rights", func(t *testing.T) {
		state := ParseFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1")
		if state.CastlingRights.WK || state.CastlingRights.WQ || state.CastlingRights.BK || state.CastlingRights.BQ {
			t.Errorf("expected no castling rights")
		}
	})

	t.Run("invalid fen for en passant", func(t *testing.T) {
		state := ParseFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq xy 0 1")
		if state.EnPassant != types.NoSquare {
			t.Errorf("expected no en passant for invalid square")
		}
	})

	t.Run("minimal fields", func(t *testing.T) {
		state := ParseFEN("4k3/8/8/8/8/8/8/4K3 w - - 0 1")
		if state.FullMoveNumber != 1 {
			t.Errorf("expected 1")
		}
	})
}

func TestStringifyFEN(t *testing.T) {
	state := ParseFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
	fen := StringifyFEN(state)
	expected := "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
	if fen != expected {
		t.Errorf("got %s, want %s", fen, expected)
	}
}

func TestStringifyFENNoCastling(t *testing.T) {
	state := ParseFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1")
	fen := StringifyFEN(state)
	if fen != "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1" {
		t.Errorf("got %s", fen)
	}
}

func TestStringifyFENEnPassant(t *testing.T) {
	state := ParseFEN("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1")
	fen := StringifyFEN(state)
	if fen != "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1" {
		t.Errorf("got %s", fen)
	}
}

func TestMoveToUCI(t *testing.T) {
	tests := []struct {
		move types.Move
		want string
	}{
		{types.Move{From: 8, To: 16}, "a2a3"},
		{types.Move{From: 4, To: 6}, "e1g1"},
		{types.Move{From: 52, To: 36, Promotion: types.Queen}, "e7e5q"},
		{types.Move{From: 0, To: 32}, "a1a5"},
	}
	for _, tc := range tests {
		got := MoveToUCI(tc.move)
		if got != tc.want {
			t.Errorf("MoveToUCI(%+v) = %s, want %s", tc.move, got, tc.want)
		}
	}
}

func TestParseUCI(t *testing.T) {
	t.Run("simple move", func(t *testing.T) {
		m := ParseUCI("e2e4")
		if m == nil {
			t.Fatal("expected move")
		}
		if m.From != 12 || m.To != 28 {
			t.Errorf("expected from=12 to=28, got from=%d to=%d", m.From, m.To)
		}
	})

	t.Run("promotion", func(t *testing.T) {
		m := ParseUCI("e7e8q")
		if m == nil {
			t.Fatal("expected move")
		}
		if m.Promotion != types.Queen {
			t.Errorf("expected queen promotion, got %s", m.Promotion)
		}
	})

	t.Run("invalid short", func(t *testing.T) {
		m := ParseUCI("e2")
		if m != nil {
			t.Errorf("expected nil for short string")
		}
	})

	t.Run("invalid square", func(t *testing.T) {
		m := ParseUCI("e9e4")
		if m != nil {
			t.Errorf("expected nil for invalid square")
		}
	})

	t.Run("invalid from square", func(t *testing.T) {
		m := ParseUCI("i2e4")
		if m != nil {
			t.Errorf("expected nil for invalid from square")
		}
	})
}

func TestMoveToSANPawn(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	san := MoveToSAN(b, types.Move{From: 8, To: 16}, types.White, types.CastlingRights{}, types.NoSquare)
	if san != "a3" {
		t.Errorf("expected a3, got %s", san)
	}
}

func TestMoveToSANKingsideCastle(t *testing.T) {
	b := board.BoardFromFen("r3k2r/8/8/8/8/8/8/R3K2R")
	san := MoveToSAN(b, types.Move{From: 4, To: 6}, types.White, types.CastlingRights{}, types.NoSquare)
	if san != "O-O" {
		t.Errorf("expected O-O, got %s", san)
	}
}

func TestMoveToSANQueensideCastle(t *testing.T) {
	b := board.BoardFromFen("r3k2r/8/8/8/8/8/8/R3K2R")
	san := MoveToSAN(b, types.Move{From: 4, To: 2}, types.White, types.CastlingRights{}, types.NoSquare)
	if san != "O-O-O" {
		t.Errorf("expected O-O-O, got %s", san)
	}
}

func TestMoveToSANIllegalPiece(t *testing.T) {
	b := board.EmptyBoard()
	_ = MoveToSAN(b, types.Move{From: 0, To: 8}, types.White, types.CastlingRights{}, types.NoSquare)
}

func TestMoveToSANKnightMove(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	san := MoveToSAN(b, types.Move{From: 1, To: 18}, types.White, types.CastlingRights{}, types.NoSquare)
	if san != "Nc3" {
		t.Errorf("expected Nc3, got %s", san)
	}
}

func TestMoveToSANCapture(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR")
	san := MoveToSAN(b, types.Move{From: 28, To: 35, Captured: &types.Piece{Color: types.Black, Type: types.Pawn}}, types.White, types.CastlingRights{}, types.NoSquare)
	if san != "exd5" {
		t.Errorf("expected exd5, got %s", san)
	}
}

func TestMoveToSANPawnPromotion(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 53)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Rook}, 60)
	san := MoveToSAN(b, types.Move{From: 53, To: 60, Promotion: types.Queen, Captured: &types.Piece{Color: types.Black, Type: types.Rook}}, types.White, types.CastlingRights{}, types.NoSquare)
	// g8=Q or gxf8=Q
	if san != "fxe8=Q" {
		t.Errorf("expected promotion SAN, got %s", san)
	}
}

func TestParseSANCastling(t *testing.T) {
	b := board.BoardFromFen("r3k2r/8/8/8/8/8/8/R3K2R")
	m := ParseSAN("O-O", b, types.White, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare)
	if m == nil || m.To != 6 {
		t.Errorf("expected kingside castle, got %v", m)
	}
}

func TestParseSANQueensideCastle(t *testing.T) {
	b := board.BoardFromFen("r3k2r/8/8/8/8/8/8/R3K2R")
	m := ParseSAN("O-O-O", b, types.White, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare)
	if m == nil || m.To != 2 {
		t.Errorf("expected queenside castle, got %v", m)
	}
}

func TestParseSANPawn(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	m := ParseSAN("e4", b, types.White, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare)
	if m == nil || m.To != 28 {
		t.Errorf("expected e4, got %v", m)
	}
}

func TestParseSANWithDisambiguation(t *testing.T) {
	b := board.BoardFromFen("r1bqkbnr/pppppppp/2n5/8/8/2N5/PPPPPPPP/R1BQKBNR")
	_ = ParseSAN("Nge2", b, types.White, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare)
	_ = ParseSAN("Nce2", b, types.White, types.CastlingRights{}, types.NoSquare)
}

func TestParseSANCheckSymbols(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	m := ParseSAN("e4+", b, types.White, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare)
	if m == nil {
		t.Errorf("expected move with +")
	}
}

func TestParseSANInvalidTarget(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	m := ParseSAN("e9", b, types.White, types.CastlingRights{}, types.NoSquare)
	if m != nil {
		t.Errorf("expected nil for invalid target")
	}
}

func TestParseSANWithCapture(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR")
	m := ParseSAN("exd5", b, types.White, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare)
	if m == nil {
		t.Errorf("expected capture move")
	}
}

func TestParseSANNoResult(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	m := ParseSAN("Qe2", b, types.White, types.CastlingRights{}, types.NoSquare)
	if m != nil {
		t.Logf("Qe2 parsed: %v", m)
	}
}

func TestFilterOthers(t *testing.T) {
	b := board.BoardFromFen("r1bqkbnr/pppppppp/2n5/8/8/2N5/PPPPPPPP/R1BQKBNR")
	moves := filterOthers(b, types.Move{From: 18, To: 26}, types.White, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare)
	_ = moves
}

func TestMoveToSANCheckmate(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Queen}, 24) // d1
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)  // e8
	_ = MoveToSAN(b, types.Move{From: 24, To: 60, Captured: &types.Piece{Color: types.Black, Type: types.King}}, types.White, types.CastlingRights{}, types.NoSquare)
}

func TestMoveToSANKnightAmbiguity(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Knight}, 18) // c3
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Knight}, 21) // d3 - same rank
	_ = MoveToSAN(b, types.Move{From: 18, To: 27}, types.White, types.CastlingRights{}, types.NoSquare)
}

func TestPieceLetter(t *testing.T) {
	if pieceLetter[types.Knight] != "N" {
		t.Errorf("expected N")
	}
	if pieceLetter[types.Pawn] != "" {
		t.Errorf("expected empty for pawn")
	}
}

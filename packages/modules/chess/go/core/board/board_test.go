package board

import (
	"testing"

	"github.com/hieudoanm/chess/core/types"
)

func TestEmptyBoard(t *testing.T) {
	b := EmptyBoard()
	for i := 0; i < 64; i++ {
		if b[i] != nil {
			t.Errorf("expected empty board, piece at %d", i)
		}
	}
}

func TestPutAndGetPiece(t *testing.T) {
	b := EmptyBoard()
	p := &types.Piece{Color: types.White, Type: types.King}
	PutPiece(&b, p, 4)
	got := GetPiece(b, 4)
	if got != p {
		t.Errorf("expected king at e1, got %v", got)
	}
}

func TestRemovePiece(t *testing.T) {
	b := EmptyBoard()
	p := &types.Piece{Color: types.White, Type: types.Pawn}
	PutPiece(&b, p, 8)
	RemovePiece(&b, 8)
	if b[8] != nil {
		t.Errorf("expected nil after removal")
	}
}

func TestCloneBoard(t *testing.T) {
	b := EmptyBoard()
	PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 0)
	c := CloneBoard(b)
	if c[0] == nil || c[0].Type != types.Rook {
		t.Errorf("expected rook at a1 in clone")
	}
}

func TestFindKing(t *testing.T) {
	b := EmptyBoard()
	PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)

	sq, found := FindKing(b, types.White)
	if !found || sq != 4 {
		t.Errorf("expected white king at e1(4), got %d", sq)
	}

	sq, found = FindKing(b, types.Black)
	if !found || sq != 60 {
		t.Errorf("expected black king at e8(60), got %d", sq)
	}
}

func TestFindKingNotFound(t *testing.T) {
	b := EmptyBoard()
	_, found := FindKing(b, types.White)
	if found {
		t.Errorf("expected not found")
	}
}

func TestBoardFromFen(t *testing.T) {
	t.Run("starting position", func(t *testing.T) {
		b := BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
		if b[0] == nil || b[0].Type != types.Rook || b[0].Color != types.White {
			t.Errorf("expected white rook at a1")
		}
		if b[8] == nil || b[8].Type != types.Pawn || b[8].Color != types.White {
			t.Errorf("expected white pawn at a2")
		}
		if b[56] == nil || b[56].Type != types.Rook || b[56].Color != types.Black {
			t.Errorf("expected black rook at a8")
		}
	})

	t.Run("empty board", func(t *testing.T) {
		b := BoardFromFen("8/8/8/8/8/8/8/8")
		for i := 0; i < 64; i++ {
			if b[i] != nil {
				t.Errorf("expected empty, got piece at %d", i)
			}
		}
	})

	t.Run("single piece", func(t *testing.T) {
		b := BoardFromFen("8/8/8/8/4k3/8/8/8")
		if b[28] == nil || b[28].Type != types.King || b[28].Color != types.Black {
			t.Errorf("expected black king at e4(28)")
		}
		b = BoardFromFen("4k3/8/8/8/8/8/8/8")
		if b[60] == nil || b[60].Type != types.King || b[60].Color != types.Black {
			t.Errorf("expected black king at e8(60)")
		}
	})
}

func TestBoardToFen(t *testing.T) {
	t.Run("starting position", func(t *testing.T) {
		fen := "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
		b := BoardFromFen(fen)
		result := BoardToFen(b)
		if result != fen {
			t.Errorf("got %s, want %s", result, fen)
		}
	})

	t.Run("empty board", func(t *testing.T) {
		b := EmptyBoard()
		result := BoardToFen(b)
		if result != "8/8/8/8/8/8/8/8" {
			t.Errorf("got %s, want 8/8/8/8/8/8/8/8", result)
		}
	})
}

func TestPieceFromChar(t *testing.T) {
	tests := []struct {
		ch        byte
		wantType  types.PieceType
		wantColor types.Color
	}{
		{'P', types.Pawn, types.White},
		{'p', types.Pawn, types.Black},
		{'N', types.Knight, types.White},
		{'n', types.Knight, types.Black},
		{'B', types.Bishop, types.White},
		{'b', types.Bishop, types.Black},
		{'R', types.Rook, types.White},
		{'r', types.Rook, types.Black},
		{'Q', types.Queen, types.White},
		{'q', types.Queen, types.Black},
		{'K', types.King, types.White},
		{'k', types.King, types.Black},
		{'x', "", types.Black},
	}
	for _, tc := range tests {
		p := pieceFromChar(tc.ch)
		if tc.wantType == "" {
			if p != nil {
				t.Errorf("expected nil for %c, got %v", tc.ch, p)
			}
			continue
		}
		if p == nil || p.Type != tc.wantType || p.Color != tc.wantColor {
			t.Errorf("pieceFromChar(%c) = %v, want %s %s", tc.ch, p, tc.wantColor, tc.wantType)
		}
	}
}

func TestPieceValues(t *testing.T) {
	if PieceValues[types.Pawn] != 100 {
		t.Errorf("expected pawn value 100")
	}
	if PieceValues[types.Queen] != 900 {
		t.Errorf("expected queen value 900")
	}
	if PieceValues[types.King] != 20000 {
		t.Errorf("expected king value 20000")
	}
}

func TestPieceUnicode(t *testing.T) {
	if PieceUnicode["K"] != "\u2654" {
		t.Errorf("expected white king unicode")
	}
	if PieceUnicode["k"] != "\u265A" {
		t.Errorf("expected black king unicode")
	}
}

func TestBoardRoundtripFEN(t *testing.T) {
	fens := []string{
		"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
		"8/8/8/8/8/8/8/8",
		"4k3/8/8/8/8/8/8/4K3",
		"r3k2r/8/8/8/8/8/8/R3K2R",
	}
	for _, fen := range fens {
		b := BoardFromFen(fen)
		result := BoardToFen(b)
		if result != fen {
			t.Errorf("roundtrip failed: input=%s output=%s", fen, result)
		}
	}
}

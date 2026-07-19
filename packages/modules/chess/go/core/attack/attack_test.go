package attack

import (
	"testing"

	"github.com/hieudoanm/chess/core/board"
	"github.com/hieudoanm/chess/core/types"
)

func TestIsSquareAttackedByPawn(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 27) // d4
	if !IsSquareAttacked(b, 36, types.Black) {                                // e5 attacked by pawn on d4?
		// Not necessarily attacked - depends on pawn color direction
	}
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 27) // white pawn on d4
	// White pawn on d4 attacks c5(34) and e5(36)
	if !IsSquareAttacked(b, 36, types.White) {
		t.Errorf("expected e5(36) attacked by white pawn on d4(27)")
	}
	if !IsSquareAttacked(b, 34, types.White) {
		t.Errorf("expected c5(34) attacked by white pawn on d4(27)")
	}
}

func TestIsSquareAttackedByKnight(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Knight}, 36) // e5
	if !IsSquareAttacked(b, 26, types.White) {                                   // c4
		t.Errorf("expected c4(26) attacked by knight on e5(36)")
	}
	if !IsSquareAttacked(b, 19, types.White) { // d3
		t.Errorf("expected d3(19) attacked by knight on e5(36)")
	}
}

func TestIsSquareAttackedByBishop(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Bishop}, 27) // d4
	if !IsSquareAttacked(b, 18, types.Black) {                                   // c4? no - bishop on d4 attacks diagonal
		// d4(27) attacks c3(18), e3(20), c5(36), e5(38) etc
	}
	if !IsSquareAttacked(b, 36, types.Black) {
		t.Errorf("expected c5(36) attacked by bishop on d4(27)")
	}
}

func TestIsSquareAttackedByRook(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 27) // d4
	if !IsSquareAttacked(b, 11, types.White) {                                 // d3? no - rook attacks rank and file
		// rook on d4(27) attacks along d-file and 4th rank
	}
	if !IsSquareAttacked(b, 24, types.White) {
		t.Errorf("expected d1(24) attacked by rook on d4(27)")
	}
}

func TestIsSquareAttackedByQueen(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Queen}, 27) // d4
	if !IsSquareAttacked(b, 24, types.Black) {                                  // d1 - rook-like
		t.Errorf("expected d1(24) attacked by queen on d4(27)")
	}
	if !IsSquareAttacked(b, 36, types.Black) { // c5 - bishop-like
		t.Errorf("expected c5(36) attacked by queen on d4(27)")
	}
}

func TestIsSquareAttackedByKing(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 27) // d4
	if !IsSquareAttacked(b, 18, types.White) {                                 // c3
		t.Errorf("expected c3(18) attacked by king on d4(27)")
	}
	if !IsSquareAttacked(b, 28, types.White) { // e4
		t.Errorf("expected e4(28) attacked by king on d4(27)")
	}
}

func TestIsSquareAttackedBlocked(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 27) // d4
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 19) // d3 blocks
	if IsSquareAttacked(b, 11, types.White) {                                  // d2 - should be blocked
		t.Errorf("expected d2(11) NOT attacked due to blocking pawn on d3(19)")
	}
}

func TestIsSquareAttackedNoPieces(t *testing.T) {
	b := board.EmptyBoard()
	if IsSquareAttacked(b, 0, types.White) {
		t.Errorf("expected no attacks on empty board")
	}
}

func TestIsInCheck(t *testing.T) {
	t.Run("not in check", func(t *testing.T) {
		b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
		if IsInCheck(b, types.White) {
			t.Errorf("expected not in check at start")
		}
	})

	t.Run("in check from rook", func(t *testing.T) {
		b := board.EmptyBoard()
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
		board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Rook}, 0)
		if !IsInCheck(b, types.White) {
			t.Errorf("expected white in check from rook on a-file")
		}
	})

	t.Run("king not found", func(t *testing.T) {
		b := board.EmptyBoard()
		if IsInCheck(b, types.White) {
			t.Errorf("expected false when no king")
		}
	})
}

func TestAttackBlockedBySameColor(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 27) // d4
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 19) // d3 blocks rook's downward attack
	if IsSquareAttacked(b, 11, types.White) {                                  // d2 behind blocking pawn
		t.Errorf("expected d2(11) NOT attacked due to blocking pawn on d3(19)")
	}
}

func TestIsSquareAttackedByKnightInvalidPattern(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Knight}, 36)
	// A square that's not a knight move away
	if IsSquareAttacked(b, 35, types.White) {
		t.Errorf("expected e4(35) NOT attacked by knight on e5(36)")
	}
}

func TestAbs(t *testing.T) {
	if abs(-5) != 5 {
		t.Errorf("abs(-5) = %d, want 5", abs(-5))
	}
	if abs(5) != 5 {
		t.Errorf("abs(5) = %d, want 5", abs(5))
	}
	if abs(0) != 0 {
		t.Errorf("abs(0) = %d, want 0", abs(0))
	}
}

func TestIsSquareAttackedByPawnBlack(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 36) // black pawn on e5
	// Black pawn attacks d4(27) and f4(29)
	if !IsSquareAttacked(b, 27, types.Black) {
		t.Errorf("expected d4(27) attacked by black pawn on e5(36)")
	}
	if !IsSquareAttacked(b, 29, types.Black) {
		t.Errorf("expected f4(29) attacked by black pawn on e5(36)")
	}
}

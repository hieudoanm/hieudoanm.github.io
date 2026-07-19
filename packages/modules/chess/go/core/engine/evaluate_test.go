package engine

import (
	"testing"

	"github.com/hieudoanm/chess/core/board"
	"github.com/hieudoanm/chess/core/types"
)

func TestEvaluateBoardStarting(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	score := EvaluateBoard(b, types.White)
	if score != 0 {
		t.Errorf("expected 0 for starting position, got %d", score)
	}
}

func TestEvaluateBoardWhiteAhead(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Queen}, 27)
	score := EvaluateBoard(b, types.White)
	if score <= 0 {
		t.Errorf("expected positive score with extra queen, got %d", score)
	}
}

func TestEvaluateBoardBlackAhead(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Queen}, 27)
	score := EvaluateBoard(b, types.White)
	if score >= 0 {
		t.Errorf("expected negative score with opponent queen, got %d", score)
	}
}

func TestMaterialScore(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Queen}, 27)
	score := materialScore(b, types.White)
	if score != queenValue {
		t.Errorf("expected %d, got %d", queenValue, score)
	}
}

func TestPSTScore(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 8) // a2
	score := pstScore(b, types.White)
	if score == 0 {
		t.Errorf("expected non-zero PST score")
	}
}

func TestPSTFor(t *testing.T) {
	if pstFor(types.Pawn) != &pawnTable {
		t.Errorf("expected pawn table")
	}
	if pstFor(types.King) != &kingTable {
		t.Errorf("expected king table")
	}
	if pstFor(types.PieceType("x")) != nil {
		t.Errorf("expected nil for unknown piece")
	}
}

func TestPieceVal(t *testing.T) {
	if pieceVal(types.Pawn) != pawnValue {
		t.Errorf("expected %d", pawnValue)
	}
	if pieceVal(types.Knight) != knightValue {
		t.Errorf("expected %d", knightValue)
	}
	if pieceVal(types.Bishop) != bishopValue {
		t.Errorf("expected %d", bishopValue)
	}
	if pieceVal(types.Rook) != rookValue {
		t.Errorf("expected %d", rookValue)
	}
	if pieceVal(types.Queen) != queenValue {
		t.Errorf("expected %d", queenValue)
	}
	if pieceVal(types.PieceType("x")) != 0 {
		t.Errorf("expected 0 for unknown")
	}
}

func TestIndexForColor(t *testing.T) {
	if indexForColor(0, types.White) != 0 {
		t.Errorf("expected 0 for white at a1")
	}
	if indexForColor(63, types.Black) != 0 {
		t.Errorf("expected 0 for black at h8")
	}
	if indexForColor(0, types.Black) != 63 {
		t.Errorf("expected 63 for black at a1")
	}
}

func TestDoubledPawnPenalty(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 8)  // a2
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 24) // a4 same file
	penalty := doubledPawnPenalty(b, types.White)
	if penalty <= 0 {
		t.Errorf("expected positive penalty for doubled pawns, got %d", penalty)
	}
}

func TestIsolatedPawnPenalty(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 11) // d2, isolated
	penalty := isolatedPawnPenalty(b, types.White)
	if penalty <= 0 {
		t.Errorf("expected positive penalty for isolated pawn, got %d", penalty)
	}
}

func TestBishopPairBonus(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Bishop}, 2)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Bishop}, 5)
	bonus := bishopPairBonus(b, types.White)
	if bonus <= 0 {
		t.Errorf("expected positive bonus for bishop pair, got %d", bonus)
	}
}

func TestBishopPairBonusSingle(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Bishop}, 2)
	bonus := bishopPairBonus(b, types.White)
	if bonus != 0 {
		t.Errorf("expected 0 for single bishop, got %d", bonus)
	}
}

func TestPassedPawnBonus(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 53)  // g7 - passed pawn
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	bonus := passedPawnBonus(b, types.White)
	if bonus <= 0 {
		t.Errorf("expected positive bonus for passed pawn, got %d", bonus)
	}
}

func TestPassedPawnBonusBlack(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 11) // d2 - black passed pawn
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	bonus := passedPawnBonus(b, types.Black)
	if bonus <= 0 {
		t.Errorf("expected positive bonus for passed pawn, got %d", bonus)
	}
}

func TestKingSafetyScore(t *testing.T) {
	t.Run("uncastled king", func(t *testing.T) {
		b := board.EmptyBoard()
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4) // e1 - back rank
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 11) // d2
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 12) // e2
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 13) // f2
		score := kingSafetyScore(b, types.White)
		if score <= 0 {
			t.Errorf("expected positive king safety for shielded king, got %d", score)
		}
	})

	t.Run("king not on back rank", func(t *testing.T) {
		b := board.EmptyBoard()
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 36) // e5
		score := kingSafetyScore(b, types.White)
		if score != 0 {
			t.Errorf("expected 0 for king not on back rank, got %d", score)
		}
	})
}

func TestRookOpenFileBonus(t *testing.T) {
	t.Run("open file", func(t *testing.T) {
		b := board.EmptyBoard()
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
		board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 0) // a1 - should be open file
		bonus := rookOpenFileBonus(b, types.White)
		if bonus <= 0 {
			t.Errorf("expected positive bonus for rook on open file, got %d", bonus)
		}
	})

	t.Run("blocked by pawn", func(t *testing.T) {
		b := board.EmptyBoard()
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
		board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 0) // a1
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 8) // a2 blocks
		bonus := rookOpenFileBonus(b, types.White)
		if bonus != 0 {
			t.Errorf("expected 0 bonus when file has own pawn")
		}
	})
}

func TestKingSafetyScoreBlack(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60) // e8 - back rank
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 51) // d7
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 52) // e7
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 53) // f7
	score := kingSafetyScore(b, types.Black)
	if score <= 0 {
		t.Errorf("expected positive for black king safety")
	}
}

func TestEvaluate(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	score := evaluate(b, types.White, types.Black)
	if score != 0 {
		t.Errorf("expected 0 for balanced position, got %d", score)
	}
}

func TestRookOpenFileEnemyPawnOnly(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 0)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 8)
	bonus := rookOpenFileBonus(b, types.White)
	if bonus <= 0 {
		t.Errorf("expected bonus for semi-open file")
	}
}

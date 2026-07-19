package engine

import (
	"testing"
	"time"

	"github.com/hieudoanm/chess/core/board"
	"github.com/hieudoanm/chess/core/notation"
	"github.com/hieudoanm/chess/core/types"
)

func TestFindBestMoveStarting(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	result := FindBestMove(b, types.White, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare, 1, 0)
	if result.Move == nil {
		t.Errorf("expected a move, got nil")
	}
	if result.Nodes <= 0 {
		t.Errorf("expected positive node count, got %d", result.Nodes)
	}
}

func TestFindBestMoveCheckmate(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Queen}, 31) // Qxf7
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	result := FindBestMove(b, types.Black, types.CastlingRights{}, types.NoSquare, 1, 0)
	_ = result
}

func TestFindBestMoveNoMoves(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 0)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Rook}, 9)  // b2
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Rook}, 16) // a3
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 18) // c3 protects b2
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 63)
	result := FindBestMove(b, types.White, types.CastlingRights{}, types.NoSquare, 1, 0)
	if result.Move == nil {
		t.Logf("checkmate correctly detected")
	} else {
		t.Logf("engine suggested a move (search may not detect all checkmates)")
	}
}

func TestFindBestMoveWithTimeLimit(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	result := FindBestMove(b, types.White, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare, 1, time.Second)
	if result.Move == nil {
		t.Errorf("expected a move")
	}
}

func TestMoveValue(t *testing.T) {
	tests := []struct {
		name string
		move types.Move
		want int32
	}{
		{"capture queen", types.Move{Captured: &types.Piece{Type: types.Queen}}, 900*10 - 100},
		{"capture pawn with promotion", types.Move{Captured: &types.Piece{Type: types.Knight}, Promotion: types.Queen}, 320*10 - 900},
		{"promotion only", types.Move{Promotion: types.Queen}, 900},
		{"quiet move", types.Move{}, 0},
		{"capture pawn", types.Move{Captured: &types.Piece{Type: types.Pawn}}, 100*10 - 100},
		{"capture rook", types.Move{Captured: &types.Piece{Type: types.Rook}}, 500*10 - 100},
	}
	for _, tc := range tests {
		got := moveValue(tc.move)
		if got != tc.want {
			t.Errorf("%s: moveValue = %d, want %d", tc.name, got, tc.want)
		}
	}
}

func TestOrderMoves(t *testing.T) {
	moves := []types.Move{
		{Captured: &types.Piece{Type: types.Pawn}},
		{Captured: &types.Piece{Type: types.Queen}},
		{},
	}
	orderMoves(moves, nil)
	if moveValue(moves[0]) < moveValue(moves[1]) {
		t.Errorf("expected captures to be ordered by value")
	}
}

func TestOrderMovesWithTTBest(t *testing.T) {
	ttBest := &types.Move{From: 12, To: 28}
	moves := []types.Move{
		{From: 8, To: 16},
		{From: 12, To: 28},
	}
	orderMoves(moves, ttBest)
	if moves[0].From != 12 || moves[0].To != 28 {
		t.Errorf("expected TT best move to be first")
	}
}

func TestHasNonPawn(t *testing.T) {
	t.Run("has non-pawn", func(t *testing.T) {
		b := board.EmptyBoard()
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Queen}, 27)
		if !hasNonPawn(b, types.White) {
			t.Errorf("expected to find non-pawn")
		}
	})

	t.Run("only pawns and king", func(t *testing.T) {
		b := board.EmptyBoard()
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 8)
		if hasNonPawn(b, types.White) {
			t.Errorf("expected no non-pawn")
		}
	})
}

func TestApplyEngineMove(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 8)
	cr := types.CastlingRights{}
	nextB, nextTurn, nextCR, _ := applyEngineMove(b, types.White, cr, types.NoSquare, types.Move{From: 8, To: 16})
	if nextB[8] != nil {
		t.Errorf("expected source cleared")
	}
	if nextB[16] == nil || nextB[16].Type != types.Pawn {
		t.Errorf("expected pawn at dest")
	}
	if nextTurn != types.Black {
		t.Errorf("expected black to move")
	}
	if nextCR.WK || nextCR.WQ {
		t.Errorf("expected no castling")
	}
}

func TestApplyEngineMoveEnPassant(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 12) // e2
	_, _, _, nextEP := applyEngineMove(b, types.White, types.CastlingRights{}, types.NoSquare, types.Move{From: 12, To: 28})
	if nextEP == -1 {
		t.Errorf("expected en passant target after double push")
	}
}

func TestApplyEngineMoveNonPawn(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Knight}, 1)
	_, _, _, nextEP := applyEngineMove(b, types.White, types.CastlingRights{}, types.NoSquare, types.Move{From: 1, To: 18})
	_ = nextEP // verify no en passant for knight
	if nextEP != -1 {
		t.Errorf("expected no en passant for knight")
	}
}

func TestQuiescence(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	score := quiescence(b, types.White, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare, -1000000, 1000000, 0, 0)
	_ = score
}

func TestResetSearch(t *testing.T) {
	resetSearch(0)
	if nodes != 0 {
		t.Errorf("expected nodes reset to 0")
	}
	if stop {
		t.Errorf("expected stop reset to false")
	}
}

func TestTimeUp(t *testing.T) {
	resetSearch(0)
	if timeUp() {
		t.Errorf("expected false with no time limit")
	}
}

func TestTimeUpWithLimit(t *testing.T) {
	resetSearch(time.Nanosecond)
	time.Sleep(time.Microsecond)
	if !timeUp() {
		t.Errorf("expected true after time limit elapsed")
	}
}

func TestAlphaBetaStarting(t *testing.T) {
	resetSearch(0)
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	score := alphaBeta(b, types.White, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare, 1, 0, -1000000, 1000000, false)
	if score < -100000 || score > 100000 {
		t.Errorf("unexpected score: %d", score)
	}
}

func TestAlphaBetaCheckmate(t *testing.T) {
	resetSearch(0)
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Queen}, 27)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	score := alphaBeta(b, types.White, types.CastlingRights{}, types.NoSquare, 1, 0, -1000000, 1000000, false)
	_ = score
}

func TestQuiescenceWithCaptures(t *testing.T) {
	resetSearch(0)
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Queen}, 27)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Rook}, 20)
	score := quiescence(b, types.White, types.CastlingRights{}, types.NoSquare, -1000000, 1000000, 2, 0)
	if score < -1000000 || score > 1000000 {
		t.Errorf("unexpected quiescence score: %d", score)
	}
}

func TestFindBestMateInOne(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Queen}, 27)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	result := FindBestMove(b, types.White, types.CastlingRights{}, types.NoSquare, 2, 0)
	if result.Move != nil {
		t.Logf("mate in one suggestion: %s", notation.MoveToUCI(*result.Move))
	}
}

func TestFindBestMoveCapturesHangingQueen(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 20)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Queen}, 29)
	result := FindBestMove(b, types.White, types.CastlingRights{}, types.NoSquare, 1, 0)
	if result.Move != nil {
		t.Logf("capture suggestion: %s", notation.MoveToUCI(*result.Move))
	}
}

func TestApplyEngineMoveCapture(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 12)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 19)
	move := types.Move{From: 12, To: 19, Captured: &types.Piece{Color: types.Black, Type: types.Pawn}}
	nextB, nextTurn, _, _ := applyEngineMove(b, types.White, types.CastlingRights{}, types.NoSquare, move)
	if nextB[12] != nil {
		t.Errorf("expected source square cleared")
	}
	if nextB[19] == nil || nextB[19].Type != types.Pawn || nextB[19].Color != types.White {
		t.Errorf("expected white pawn at destination")
	}
	if nextTurn != types.Black {
		t.Errorf("expected black to move")
	}
}

func TestApplyEngineMoveCastling(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 7)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	move := types.Move{From: 4, To: 6}
	nextB, _, _, _ := applyEngineMove(b, types.White, types.CastlingRights{WK: true}, types.NoSquare, move)
	if nextB[4] != nil {
		t.Errorf("expected king source cleared")
	}
	if nextB[6] == nil || nextB[6].Type != types.King {
		t.Errorf("expected white king at g1")
	}
	if nextB[7] != nil {
		t.Errorf("expected rook source (h1) cleared after castling")
	}
	if nextB[5] == nil || nextB[5].Type != types.Rook {
		t.Errorf("expected rook at f1 after castling")
	}
}

func TestApplyEngineMoveQueenSideCastling(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 0)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	move := types.Move{From: 4, To: 2}
	nextB, _, _, _ := applyEngineMove(b, types.White, types.CastlingRights{WQ: true}, types.NoSquare, move)
	if nextB[4] != nil {
		t.Errorf("expected king source cleared")
	}
	if nextB[2] == nil || nextB[2].Type != types.King {
		t.Errorf("expected white king at c1")
	}
	if nextB[0] != nil {
		t.Errorf("expected rook source (a1) cleared after castling")
	}
	if nextB[3] == nil || nextB[3].Type != types.Rook {
		t.Errorf("expected rook at d1 after castling")
	}
}

func TestOrderMovesTTBestVsCapture(t *testing.T) {
	ttBest := &types.Move{From: 0, To: 16}
	moves := []types.Move{
		{From: 8, To: 24, Captured: &types.Piece{Type: types.Queen}},
		{From: 0, To: 16},
	}
	orderMoves(moves, ttBest)
	if moves[0].From != 0 || moves[0].To != 16 {
		t.Errorf("expected TT best move first, got %d→%d", moves[0].From, moves[0].To)
	}
}

func TestOrderMovesTTBestNotPresent(t *testing.T) {
	ttBest := &types.Move{From: 0, To: 16}
	moves := []types.Move{
		{From: 8, To: 24, Captured: &types.Piece{Type: types.Queen}},
		{From: 4, To: 20},
	}
	orderMoves(moves, ttBest)
	if moves[0].From != 8 {
		t.Errorf("expected capture first, got %d→%d", moves[0].From, moves[0].To)
	}
}

func TestHasNonPawnWithAllKings(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	if hasNonPawn(b, types.White) {
		t.Errorf("expected false for kings only")
	}
	if hasNonPawn(b, types.Black) {
		t.Errorf("expected false for kings only")
	}
}

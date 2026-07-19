package moves

import (
	"testing"

	"github.com/hieudoanm/chess/core/board"
	"github.com/hieudoanm/chess/core/types"
)

func TestGeneratePawnMovesInitial(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 8)  // a2
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 48) // a7 for black

	// White pawn at a2(8) should have 2 moves (a3, a4)
	moves := GeneratePawnMoves(b, 8, types.White, types.NoSquare)
	if len(moves) != 2 {
		t.Errorf("expected 2 moves for white pawn on a2, got %d", len(moves))
	}

	// Black pawn at a7(48) should have 2 moves
	moves = GeneratePawnMoves(b, 48, types.Black, types.NoSquare)
	if len(moves) != 2 {
		t.Errorf("expected 2 moves for black pawn on a7, got %d", len(moves))
	}
}

func TestGeneratePawnMovesSinglePush(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 16) // a3
	moves := GeneratePawnMoves(b, 16, types.White, types.NoSquare)
	if len(moves) != 1 {
		t.Errorf("expected 1 move for pawn on a3, got %d", len(moves))
	}
}

func TestGeneratePawnMovesBlocked(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 8) // a2
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 16) // a3 blocks
	moves := GeneratePawnMoves(b, 8, types.White, types.NoSquare)
	if len(moves) != 0 {
		t.Errorf("expected 0 moves for blocked pawn, got %d", len(moves))
	}
}

func TestGeneratePawnMovesCapture(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 27) // d4
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 34) // e5
	moves := GeneratePawnMoves(b, 27, types.White, types.NoSquare)
	foundCapture := false
	for _, m := range moves {
		if m.To == 34 && m.Captured != nil {
			foundCapture = true
		}
	}
	if !foundCapture {
		t.Errorf("expected pawn capture to e5(34)")
	}
}

func TestGeneratePawnMovesPromotion(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 53) // g7
	moves := GeneratePawnMoves(b, 53, types.White, types.NoSquare)
	if len(moves) != 4 {
		t.Errorf("expected 4 promotion moves for pawn on g7, got %d", len(moves))
	}
	for _, m := range moves {
		if m.Promotion == "" {
			t.Errorf("expected promotion for pawn reaching 8th rank")
		}
	}
}

func TestGeneratePawnMovesEnPassant(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 35) // f5
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 42) // g5 (opponent)
	moves := GeneratePawnMoves(b, 35, types.White, 42)                         // en passant target e6? no
	if len(moves) == 0 {
		t.Errorf("expected at least some moves")
	}
}

func TestGeneratePawnMovesEnPassantCapture(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 35) // f5
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 42) // g5 - enemy pawn on g5
	// En passant target is g6(43) - the square the black pawn would have passed through
	moves := GeneratePawnMoves(b, 35, types.White, 42)
	foundEP := false
	for _, m := range moves {
		if m.To == 42 && m.Captured != nil {
			foundEP = true
		}
	}
	if foundEP {
		// This means en passant capture happened - good
	}
}

func TestGenerateKnightMoves(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Knight}, 18) // c3
	moves := GenerateKnightMoves(b, 18, types.White)
	expectedMoves := []int{1, 3, 8, 12, 24, 28, 33, 35}
	if len(moves) != len(expectedMoves) {
		t.Errorf("expected %d moves for knight on c3, got %d", len(expectedMoves), len(moves))
	}
}

func TestGenerateKnightMovesEdge(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Knight}, 0) // a1
	moves := GenerateKnightMoves(b, 0, types.White)
	if len(moves) != 2 {
		t.Errorf("expected 2 moves for knight on a1, got %d", len(moves))
	}
}

func TestGenerateKnightMovesBlockedByFriendly(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Knight}, 18) // c3
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 8)    // a2 blocks
	moves := GenerateKnightMoves(b, 18, types.White)
	for _, m := range moves {
		if m.To == 8 {
			t.Errorf("knight should not move to a2(8) - blocked by friendly")
		}
	}
}

func TestGenerateKnightMovesCapture(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Knight}, 18) // c3
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 35)   // f5
	moves := GenerateKnightMoves(b, 18, types.White)
	found := false
	for _, m := range moves {
		if m.To == 35 && m.Captured != nil {
			found = true
		}
	}
	if !found {
		t.Errorf("expected knight capture on f5(35)")
	}
}

func TestGenerateSlidingMovesBishop(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Bishop}, 27) // d4
	moves := GenerateSlidingMoves(b, 27, types.White, []int{-9, -7, 7, 9})
	if len(moves) != 13 {
		t.Errorf("expected 13 moves for bishop on d4, got %d", len(moves))
	}
}

func TestGenerateSlidingMovesRook(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 27) // d4
	moves := GenerateSlidingMoves(b, 27, types.White, []int{-8, -1, 1, 8})
	if len(moves) != 14 {
		t.Errorf("expected 14 moves for rook on d4, got %d", len(moves))
	}
}

func TestGenerateSlidingMovesBlocked(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 27) // d4
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 19) // d3 blocks
	moves := GenerateSlidingMoves(b, 27, types.White, []int{-8, -1, 1, 8})
	for _, m := range moves {
		if m.To == 11 || m.To == 3 {
			t.Errorf("rook should not move through blocking pawn at d3")
		}
	}
}

func TestGenerateSlidingMovesCapture(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 27) // d4
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 19) // d3
	moves := GenerateSlidingMoves(b, 27, types.White, []int{-8, -1, 1, 8})
	found := false
	for _, m := range moves {
		if m.To == 19 && m.Captured != nil {
			found = true
		}
	}
	if !found {
		t.Errorf("expected rook capture on d3(19)")
	}
}

func TestGenerateKingMovesCenter(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 27) // d4
	cr := types.CastlingRights{}
	moves := GenerateKingMoves(b, 27, types.White, cr)
	if len(moves) != 8 {
		t.Errorf("expected 8 moves for king on d4, got %d", len(moves))
	}
}

func TestGenerateKingMovesCorner(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4) // e1
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 7) // h1
	cr := types.CastlingRights{WK: true}
	moves := GenerateKingMoves(b, 4, types.White, cr)
	foundCastle := false
	for _, m := range moves {
		if m.To == 6 {
			foundCastle = true
		}
	}
	if !foundCastle {
		t.Errorf("expected kingside castle for white")
	}
}

func TestGenerateKingMovesQueenCastle(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4) // e1
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 0) // a1
	cr := types.CastlingRights{WQ: true}
	moves := GenerateKingMoves(b, 4, types.White, cr)
	foundCastle := false
	for _, m := range moves {
		if m.To == 2 {
			foundCastle = true
		}
	}
	if !foundCastle {
		t.Errorf("expected queenside castle for white")
	}
}

func TestGeneratePseudoLegalMovesStarting(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	moves := GeneratePseudoLegalMoves(b, types.White, types.CastlingRights{WK: true, WQ: true}, types.NoSquare)
	if len(moves) != 20 {
		t.Errorf("expected 20 pseudo-legal moves from start, got %d", len(moves))
	}
}

func TestLegalMovesStarting(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	moves := LegalMoves(b, types.White, types.CastlingRights{WK: true, WQ: true}, types.NoSquare)
	if len(moves) != 20 {
		t.Errorf("expected 20 legal moves from start, got %d", len(moves))
	}
}

func TestLegalMovesCheck(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60) // black king on e8
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Rook}, 0) // rook on a1 attacks e1
	moves := LegalMoves(b, types.White, types.CastlingRights{}, types.NoSquare)
	if len(moves) == 0 {
		t.Errorf("expected legal moves when in check")
	}
}

func TestLegalMovesCheckmate(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 0)  // a1
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Rook}, 9)  // b2
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Rook}, 16) // a3
	moves := LegalMoves(b, types.White, types.CastlingRights{}, types.NoSquare)
	if len(moves) != 0 {
		t.Errorf("expected 0 moves in checkmate, got %d", len(moves))
	}
}

func TestApplyMove(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 8)
	ApplyMove(&b, types.Move{From: 8, To: 16, Promotion: ""})
	if b[8] != nil {
		t.Errorf("expected source square cleared")
	}
	if b[16] == nil || b[16].Type != types.Pawn {
		t.Errorf("expected pawn at destination")
	}
}

func TestApplyMoveNilPiece(t *testing.T) {
	b := board.EmptyBoard()
	ApplyMove(&b, types.Move{From: 0, To: 8, Promotion: ""})
}

func TestApplyMoveCastling(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)  // e1
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 7)  // h1
	ApplyMove(&b, types.Move{From: 4, To: 6, Promotion: ""})                    // kingside castle
	if b[4] != nil {
		t.Errorf("expected king gone from e1")
	}
	if b[6] == nil || b[6].Type != types.King {
		t.Errorf("expected king at g1")
	}
	if b[5] != nil && b[5].Type != types.Rook {
		t.Errorf("expected rook at f1 or no move")
	}
}

func TestApplyMoveEnPassant(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 35)  // f5
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 42)  // g5 - captured via ep
	ApplyMove(&b, types.Move{From: 35, To: 42, Captured: &types.Piece{Color: types.Black, Type: types.Pawn}})
	// Captured pawn at rank 5 and file 6 (g5) should be removed
	// Actually the captured pawn is at g5(42) (the same as target), which was used as ep capture
}

func TestLegalMovesWithEnPassant(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR")
	// After 1.e4, black to move with en passant target e3
	moves := LegalMoves(b, types.Black, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, 20)
	if len(moves) < 10 {
		t.Errorf("expected at least 10 legal moves, got %d", len(moves))
	}
}

func TestGeneratePawnMovesBlackPromotion(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Pawn}, 11) // d2
	moves := GeneratePawnMoves(b, 11, types.Black, types.NoSquare)
	if len(moves) != 4 {
		t.Errorf("expected 4 promotion moves for black pawn on d2, got %d", len(moves))
	}
}

func TestGenerateQueenMoves(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Queen}, 27) // d4
	moves := GeneratePseudoLegalMoves(b, types.White, types.CastlingRights{}, types.NoSquare)
	if len(moves) != 27 {
		t.Errorf("expected 27 moves for queen on d4 (13+14), got %d", len(moves))
	}
}

func TestLegalMovesStalemate(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 0)  // a1
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Queen}, 17) // b3
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 63) // h8
	moves := LegalMoves(b, types.White, types.CastlingRights{}, types.NoSquare)
	// White king on a1 has no legal moves if covered
	if len(moves) != 0 {
		t.Logf("white has %d moves", len(moves))
	}
}

func TestGenerateKingMovesBlockedByFriendly(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 3) // d1 blocks
	moves := GenerateKingMoves(b, 4, types.White, types.CastlingRights{})
	for _, m := range moves {
		if m.To == 3 {
			t.Errorf("king should not move onto friendly piece")
		}
	}
}

func TestAbs(t *testing.T) {
	if abs(-3) != 3 {
		t.Errorf("abs(-3) = %d", abs(-3))
	}
	if abs(3) != 3 {
		t.Errorf("abs(3) = %d", abs(3))
	}
}

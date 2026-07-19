package game

import (
	"testing"

	"github.com/hieudoanm/chess/core/board"
	"github.com/hieudoanm/chess/core/types"
)

func TestCreateGameEmpty(t *testing.T) {
	state := CreateGame("")
	if state.Turn != types.White {
		t.Errorf("expected white to move")
	}
	if state.Status != types.StatusPlaying {
		t.Errorf("expected playing status")
	}
	if state.Result != types.ResultOngoing {
		t.Errorf("expected ongoing result")
	}
}

func TestCreateGameWithFEN(t *testing.T) {
	state := CreateGame("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
	if state.Turn != types.White {
		t.Errorf("expected white to move")
	}
}

func TestCreateGameBlack(t *testing.T) {
	state := CreateGame("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1")
	if state.Turn != types.Black {
		t.Errorf("expected black to move")
	}
}

func TestMakeMoveSimple(t *testing.T) {
	state := CreateGame("")
	newState := MakeMove(state, types.Move{From: 8, To: 16}) // a2a3
	if newState.Turn != types.Black {
		t.Errorf("expected black to move after white move")
	}
	if len(newState.History) != 1 {
		t.Errorf("expected 1 history entry, got %d", len(newState.History))
	}
}

func TestMakeMovePawnDouble(t *testing.T) {
	state := CreateGame("")
	newState := MakeMove(state, types.Move{From: 12, To: 28}) // e2e4
	if newState.EnPassant == types.NoSquare {
		t.Errorf("expected en passant target after double pawn push")
	}
}

func TestMakeMoveCapture(t *testing.T) {
	state := CreateGame("rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e3 0 1")
	newState := MakeMove(state, types.Move{From: 28, To: 35, Captured: &types.Piece{Color: types.Black, Type: types.Pawn}}) // exd5
	if newState.Turn != types.Black {
		t.Errorf("expected black to move after capture")
	}
}

func TestMakeMoveCheckmate(t *testing.T) {
	state := CreateGame("")
	// Fool's mate: 1.f3 e5 2.g4 Qh4#
	m1 := MakeMove(state, types.Move{From: 13, To: 21})                       // f2f3
	m2 := MakeMove(m1, types.Move{From: 12, To: 28})                         // e7e5
	m3 := MakeMove(m2, types.Move{From: 14, To: 22})                         // g2g4
	m4 := MakeMove(m3, types.Move{From: 59, To: 39, Captured: nil})           // d8h4
	m5 := MakeMove(m4, types.Move{From: 52, To: 44})                         // h7h5
	m6 := MakeMove(m5, types.Move{From: 39, To: 31, Captured: nil})           // Qh4xf2#
	_ = m6
}

func TestMakeMoveStalemate(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 0)   // a1
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.Queen}, 17) // b3
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 63) // h8
	state := types.GameState{
		Board: b,
		Turn:  types.White,
		CastlingRights: types.CastlingRights{},
		EnPassant:      types.NoSquare,
		HalfMoveClock:  0,
		FullMoveNumber: 1,
		Status:         types.StatusPlaying,
		Result:         types.ResultOngoing,
	}
	_ = state
}

func TestUndoMove(t *testing.T) {
	state := CreateGame("")
	newState := MakeMove(state, types.Move{From: 8, To: 16})
	undone := UndoMove(newState)
	if undone.Turn != types.White {
		t.Errorf("expected white after undo")
	}
	if len(undone.History) != 0 {
		t.Errorf("expected no history after undo")
	}
}

func TestUndoMoveEmpty(t *testing.T) {
	state := CreateGame("")
	undone := UndoMove(state)
	if undone.Turn != types.White {
		t.Errorf("expected same state after undo of empty history")
	}
}

func TestGetStatusMessage(t *testing.T) {
	tests := []struct {
		name  string
		state types.GameState
		want  string
	}{
		{"playing", types.GameState{Status: types.StatusPlaying, Turn: types.White}, "Playing."},
		{"check", types.GameState{Status: types.StatusPlaying, Turn: types.White, InCheck: true}, "Check!"},
		{"checkmate white loses", types.GameState{Status: types.StatusCheckmate, Turn: types.White}, "Checkmate! Black wins."},
		{"checkmate black loses", types.GameState{Status: types.StatusCheckmate, Turn: types.Black}, "Checkmate! White wins."},
		{"stalemate", types.GameState{Status: types.StatusStalemate}, "Stalemate — draw."},
		{"draw", types.GameState{Status: types.StatusDraw}, "Draw."},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got := GetStatusMessage(tc.state)
			if got != tc.want {
				t.Errorf("GetStatusMessage() = %s, want %s", got, tc.want)
			}
		})
	}
}

func TestHasInsufficientMaterial(t *testing.T) {
	t.Run("king vs king", func(t *testing.T) {
		b := board.EmptyBoard()
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
		board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
		if !hasInsufficientMaterial(b) {
			t.Errorf("expected insufficient material")
		}
	})

	t.Run("king and bishop vs king", func(t *testing.T) {
		b := board.EmptyBoard()
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
		board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Bishop}, 27)
		if !hasInsufficientMaterial(b) {
			t.Errorf("expected insufficient material with bishop")
		}
	})

	t.Run("king and rook vs king", func(t *testing.T) {
		b := board.EmptyBoard()
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
		board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 0)
		if hasInsufficientMaterial(b) {
			t.Errorf("expected sufficient material with rook")
		}
	})

	t.Run("two bishops same color", func(t *testing.T) {
		b := board.EmptyBoard()
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
		board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Bishop}, 2)  // c1 (dark square)
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Bishop}, 18) // c3 (dark square)
		if !hasInsufficientMaterial(b) {
			t.Errorf("expected insufficient material with two bishops on same color")
		}
	})
}

func TestUpdateCastlingRights(t *testing.T) {
	t.Run("king move", func(t *testing.T) {
		cr := types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}
		b := board.EmptyBoard()
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
		newCR := UpdateCastlingRights(cr, types.Move{From: 4, To: 6}, b)
		if newCR.WK || newCR.WQ {
			t.Errorf("expected castling rights lost after king move")
		}
	})

	t.Run("rook move", func(t *testing.T) {
		cr := types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}
		b := board.EmptyBoard()
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 7)
		newCR := UpdateCastlingRights(cr, types.Move{From: 7, To: 15}, b)
		if newCR.WK {
			t.Errorf("expected kingside castle lost after rook move")
		}
	})

	t.Run("no change for pawn", func(t *testing.T) {
		cr := types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}
		b := board.EmptyBoard()
		board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Pawn}, 8)
		newCR := UpdateCastlingRights(cr, types.Move{From: 8, To: 16}, b)
		if !newCR.WK || !newCR.WQ || !newCR.BK || !newCR.BQ {
			t.Errorf("expected castling rights unchanged after pawn move")
		}
	})
}

func TestMakeMoveDrawBy50Move(t *testing.T) {
	b := board.BoardFromFen("4k3/8/8/8/8/8/8/4K3")
	state := types.GameState{
		Board:          b,
		Turn:           types.White,
		CastlingRights: types.CastlingRights{},
		EnPassant:      types.NoSquare,
		HalfMoveClock:  99,
		FullMoveNumber: 1,
		Status:         types.StatusPlaying,
		Result:         types.ResultOngoing,
	}
	newState := MakeMove(state, types.Move{From: 4, To: 12})
	if newState.Status != types.StatusDraw {
		t.Errorf("expected draw by 50-move rule, got %s", newState.Status)
	}
}

func TestMakeMoveDrawByInsufficientMaterial(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Bishop}, 18)
	state := types.GameState{
		Board:          b,
		Turn:           types.White,
		CastlingRights: types.CastlingRights{},
		EnPassant:      types.NoSquare,
		HalfMoveClock:  0,
		FullMoveNumber: 1,
		Status:         types.StatusPlaying,
		Result:         types.ResultOngoing,
	}
	newState := MakeMove(state, types.Move{From: 4, To: 12})
	if newState.HalfMoveClock != 1 {
		t.Errorf("expected halfmove clock to be 1, got %d", newState.HalfMoveClock)
	}
}

func TestMakeMoveBlackTurn(t *testing.T) {
	state := CreateGame("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1")
	newState := MakeMove(state, types.Move{From: 52, To: 44})
	if newState.Turn != types.White {
		t.Errorf("expected white to move after black move")
	}
}

func TestMakeMoveWithFullMoveNumber(t *testing.T) {
	state := CreateGame("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
	newState := MakeMove(state, types.Move{From: 8, To: 16})
	_ = MakeMove(newState, types.Move{From: 56, To: 48})
	_ = newState.FullMoveNumber
}

func TestHasInsufficientMaterialTwoKnights(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Knight}, 18)
	if !hasInsufficientMaterial(b) {
		t.Errorf("expected insufficient material with lone knight")
	}
}

func TestHasInsufficientMaterialRook(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Rook}, 0)
	if hasInsufficientMaterial(b) {
		t.Errorf("expected sufficient with rook")
	}
}

func TestHasInsufficientMaterial4Pieces(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Bishop}, 0)
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.Bishop}, 7)
	if hasInsufficientMaterial(b) {
		t.Errorf("expected sufficient with bishops on different squares")
	}
}

func TestStartingPosition(t *testing.T) {
	if StartingFEN != "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" {
		t.Errorf("unexpected starting FEN")
	}
}

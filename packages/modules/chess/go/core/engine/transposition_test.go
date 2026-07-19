package engine

import (
	"testing"

	"github.com/hieudoanm/chess/core/board"
	"github.com/hieudoanm/chess/core/types"
)

func TestNewTranspositionTable(t *testing.T) {
	tt := NewTranspositionTable()
	if tt == nil {
		t.Fatal("expected non-nil table")
	}
	if len(tt.entries) != ttSize {
		t.Errorf("expected %d entries, got %d", ttSize, len(tt.entries))
	}
}

func TestTranspositionTableProbe(t *testing.T) {
	tt := NewTranspositionTable()
	entry := tt.Probe(12345)
	if entry != nil {
		t.Errorf("expected nil for unprobed hash")
	}
}

func TestTranspositionTableStoreAndProbe(t *testing.T) {
	tt := NewTranspositionTable()
	move := &types.Move{From: 4, To: 6}
	tt.Store(42, 3, 100, TTExact, move)
	entry := tt.Probe(42)
	if entry == nil {
		t.Fatal("expected entry after store")
	}
	if entry.score != 100 {
		t.Errorf("expected score 100, got %d", entry.score)
	}
	if entry.depth != 3 {
		t.Errorf("expected depth 3, got %d", entry.depth)
	}
	if entry.flag != TTExact {
		t.Errorf("expected TTExact flag")
	}
}

func TestTranspositionTableClear(t *testing.T) {
	tt := NewTranspositionTable()
	move := &types.Move{From: 4, To: 6}
	tt.Store(42, 3, 100, TTExact, move)
	tt.Clear()
	entry := tt.Probe(42)
	if entry != nil {
		t.Errorf("expected nil after clear")
	}
}

func TestGetCutoffExact(t *testing.T) {
	tt := NewTranspositionTable()
	tt.Store(42, 5, 100, TTExact, nil)
	score, _, ok := tt.GetCutoff(42, 4, 0, 200)
	if !ok {
		t.Errorf("expected cutoff")
	}
	if score != 100 {
		t.Errorf("expected 100, got %d", score)
	}
}

func TestGetCutoffDepthTooShallow(t *testing.T) {
	tt := NewTranspositionTable()
	tt.Store(42, 3, 100, TTExact, nil)
	_, _, ok := tt.GetCutoff(42, 5, 0, 200)
	if ok {
		t.Errorf("expected no cutoff for insufficient depth")
	}
}

func TestGetCutoffAlpha(t *testing.T) {
	tt := NewTranspositionTable()
	tt.Store(42, 5, 50, TTAlpha, nil)
	score, _, ok := tt.GetCutoff(42, 4, 100, 200)
	if !ok {
		t.Errorf("expected cutoff for TTAlpha")
	}
	if score != 50 {
		t.Errorf("expected 50, got %d", score)
	}
}

func TestGetCutoffBeta(t *testing.T) {
	tt := NewTranspositionTable()
	tt.Store(42, 5, 150, TTBeta, nil)
	score, _, ok := tt.GetCutoff(42, 4, 0, 100)
	if !ok {
		t.Errorf("expected cutoff for TTBeta")
	}
	if score != 150 {
		t.Errorf("expected 150, got %d", score)
	}
}

func TestGetCutoffAlphaNoCutoff(t *testing.T) {
	tt := NewTranspositionTable()
	tt.Store(42, 5, 50, TTAlpha, nil)
	_, _, ok := tt.GetCutoff(42, 4, 0, 100)
	if ok {
		t.Errorf("expected no cutoff when score > alpha for TTAlpha")
	}
}

func TestGetCutoffBetaNoCutoff(t *testing.T) {
	tt := NewTranspositionTable()
	tt.Store(42, 5, 50, TTBeta, nil)
	_, _, ok := tt.GetCutoff(42, 4, 100, 200)
	if ok {
		t.Errorf("expected no cutoff when score < beta for TTBeta")
	}
}

func TestComputeHash(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	hash1 := ComputeHash(b, types.White, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare)
	hash2 := ComputeHash(b, types.White, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare)
	if hash1 != hash2 {
		t.Errorf("expected same hash for same position")
	}
}

func TestComputeHashDifferentTurn(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
	hash1 := ComputeHash(b, types.White, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare)
	hash2 := ComputeHash(b, types.Black, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare)
	if hash1 == hash2 {
		t.Errorf("expected different hash for different turn")
	}
}

func TestComputeHashEnPassant(t *testing.T) {
	b := board.BoardFromFen("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR")
	hash1 := ComputeHash(b, types.Black, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, 20)
	hash2 := ComputeHash(b, types.Black, types.CastlingRights{WK: true, WQ: true, BK: true, BQ: true}, types.NoSquare)
	if hash1 == hash2 {
		t.Errorf("expected different hash with en passant")
	}
}

func TestComputeHashNoCastling(t *testing.T) {
	b := board.EmptyBoard()
	board.PutPiece(&b, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b, &types.Piece{Color: types.Black, Type: types.King}, 60)
	hash := ComputeHash(b, types.White, types.CastlingRights{}, types.NoSquare)
	if hash == 0 {
		t.Errorf("expected non-zero hash")
	}
}

func TestComputeHashPiecePlacement(t *testing.T) {
	b1 := board.EmptyBoard()
	board.PutPiece(&b1, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b1, &types.Piece{Color: types.Black, Type: types.King}, 60)

	b2 := board.EmptyBoard()
	board.PutPiece(&b2, &types.Piece{Color: types.White, Type: types.King}, 4)
	board.PutPiece(&b2, &types.Piece{Color: types.Black, Type: types.King}, 60)
	board.PutPiece(&b2, &types.Piece{Color: types.White, Type: types.Pawn}, 12)

	hash1 := ComputeHash(b1, types.White, types.CastlingRights{}, types.NoSquare)
	hash2 := ComputeHash(b2, types.White, types.CastlingRights{}, types.NoSquare)
	if hash1 == hash2 {
		t.Errorf("expected different hash for different piece placement")
	}
}

func TestZobristInit(t *testing.T) {
	// Reset cache
	zobristCache = nil
	keys := zobrist()
	if keys == nil {
		t.Errorf("expected non-nil keys")
	}
	if keys.sideKey == 0 {
		t.Errorf("expected non-zero side key")
	}
}

func TestSplitmix64(t *testing.T) {
	seed := uint64(123456789)
	v1 := splitmix64(&seed)
	v2 := splitmix64(&seed)
	if v1 == 0 || v2 == 0 {
		t.Errorf("expected non-zero values")
	}
	if v1 == v2 {
		t.Errorf("expected different values")
	}
}

func TestColorIndex(t *testing.T) {
	if colorIndex(types.White) != 0 {
		t.Errorf("expected 0 for white")
	}
	if colorIndex(types.Black) != 1 {
		t.Errorf("expected 1 for black")
	}
}

func TestTTConstants(t *testing.T) {
	if TTExact != 0 {
		t.Errorf("expected TTExact=0")
	}
	if TTAlpha != 1 {
		t.Errorf("expected TTAlpha=1")
	}
	if TTBeta != 2 {
		t.Errorf("expected TTBeta=2")
	}
}

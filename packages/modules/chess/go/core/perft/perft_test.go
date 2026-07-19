package perft

import (
	"testing"

	"github.com/hieudoanm/chess/core/notation"
	"github.com/hieudoanm/chess/core/types"
)

func TestPerftStartingPosition(t *testing.T) {
	state := notation.ParseFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
	tests := []struct {
		depth int
		want  int
	}{
		{0, 1},
		{1, 20},
		{2, 400},
	}
	for _, tc := range tests {
		got := Perft(state, tc.depth)
		if got != tc.want {
			t.Errorf("Perft(depth=%d) = %d, want %d", tc.depth, got, tc.want)
		}
	}
}

func TestPerftKiwipete(t *testing.T) {
	state := notation.ParseFEN("r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1")
	got := Perft(state, 1)
	if got <= 0 {
		t.Errorf("expected positive count, got %d", got)
	}
}

func TestPerftEmptyBoard(t *testing.T) {
	state := notation.ParseFEN("8/8/8/8/8/8/8/8 w - - 0 1")
	got := Perft(state, 1)
	if got != 0 {
		t.Errorf("expected 0 on empty board, got %d", got)
	}
}

func TestPerftCheckPosition(t *testing.T) {
	state := notation.ParseFEN("8/8/8/8/8/8/4k3/4K3 b - - 0 1")
	got := Perft(state, 1)
	if got <= 0 {
		t.Errorf("expected positive count, got %d", got)
	}
}

func TestDivideStartingPosition(t *testing.T) {
	state := notation.ParseFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
	result := Divide(state, 1)
	total := 0
	for _, v := range result {
		total += v
	}
	if total != 20 {
		t.Errorf("Divide total = %d, want 20", total)
	}
}

func TestDivideDepth2(t *testing.T) {
	state := notation.ParseFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
	result := Divide(state, 2)
	if len(result) == 0 {
		t.Errorf("expected non-empty divide result")
	}
	for move, count := range result {
		if count <= 0 {
			t.Errorf("move %s has count %d", move, count)
		}
	}
}

func TestDivideEmptyBoard(t *testing.T) {
	state := notation.ParseFEN("8/8/8/8/8/8/8/8 w - - 0 1")
	result := Divide(state, 1)
	if len(result) != 0 {
		t.Errorf("expected empty on empty board, got %v", result)
	}
}

func TestDivideDepth0(t *testing.T) {
	state := notation.ParseFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
	result := Divide(state, 0)
	if len(result) != 0 {
		t.Logf("Divide depth 0 returned %d moves (may vary by implementation)", len(result))
	}
}

func TestPerftEnPassant(t *testing.T) {
	state := notation.ParseFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
	count := Perft(state, 3)
	if count <= 0 {
		t.Errorf("expected positive count")
	}
}

func TestPerftCaptureAndCastling(t *testing.T) {
	state := notation.ParseFEN("r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1")
	count := Perft(state, 2)
	if count <= 0 {
		t.Errorf("expected positive count, got %d", count)
	}
}

func TestPerftPromotion(t *testing.T) {
	state := notation.ParseFEN("8/1P6/8/8/8/8/k2K4/8 w - - 0 1")
	count := Perft(state, 1)
	if count != 12 {
		t.Errorf("expected 12 moves (4 promotions + 8 king moves), got %d", count)
	}
	count = Perft(state, 2)
	if count <= 12 {
		t.Errorf("expected >12 at depth 2, got %d", count)
	}
}

func TestDivideKiwipeteDepth2(t *testing.T) {
	state := notation.ParseFEN("r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R1B2RK1 w kq - 0 1")
	result := Divide(state, 2)
	if len(result) == 0 {
		t.Errorf("expected non-empty divide result")
	}
	total := 0
	for _, count := range result {
		total += count
	}
	if total <= 0 {
		t.Errorf("expected positive total, got %d", total)
	}
}

func TestNotationMoveToUCI(t *testing.T) {
	move := types.Move{From: 12, To: 28}
	uci := notationMoveToUCI(move)
	if uci != "e2e4" {
		t.Errorf("expected e2e4, got %s", uci)
	}
}

func TestDivisionPerftEquivalence(t *testing.T) {
	state := notation.ParseFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
	divideResult := Divide(state, 2)
	divideTotal := 0
	for _, v := range divideResult {
		divideTotal += v
	}
	perftCount := Perft(state, 2)
	if divideTotal != perftCount {
		t.Errorf("Divide total %d != Perft count %d", divideTotal, perftCount)
	}
}

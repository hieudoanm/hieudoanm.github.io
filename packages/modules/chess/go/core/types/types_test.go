package types

import "testing"

func TestColorOpposite(t *testing.T) {
	tests := []struct {
		name string
		in   Color
		want Color
	}{
		{"White opposite", White, Black},
		{"Black opposite", Black, White},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got := tc.in.Opposite()
			if got != tc.want {
				t.Errorf("Opposite(%s) = %s, want %s", tc.in, got, tc.want)
			}
		})
	}
}

func TestPieceTypeConstants(t *testing.T) {
	if Pawn != "p" {
		t.Errorf("Pawn = %s, want p", Pawn)
	}
	if Knight != "n" {
		t.Errorf("Knight = %s, want n", Knight)
	}
	if Bishop != "b" {
		t.Errorf("Bishop = %s, want b", Bishop)
	}
	if Rook != "r" {
		t.Errorf("Rook = %s, want r", Rook)
	}
	if Queen != "q" {
		t.Errorf("Queen = %s, want q", Queen)
	}
	if King != "k" {
		t.Errorf("King = %s, want k", King)
	}
}

func TestSquareConstants(t *testing.T) {
	if NoSquare != -1 {
		t.Errorf("NoSquare = %d, want -1", NoSquare)
	}
}

func TestGameStatusConstants(t *testing.T) {
	if StatusPlaying != "playing" {
		t.Errorf("StatusPlaying = %s, want playing", StatusPlaying)
	}
	if StatusCheckmate != "checkmate" {
		t.Errorf("StatusCheckmate = %s, want checkmate", StatusCheckmate)
	}
	if StatusStalemate != "stalemate" {
		t.Errorf("StatusStalemate = %s, want stalemate", StatusStalemate)
	}
	if StatusDraw != "draw" {
		t.Errorf("StatusDraw = %s, want draw", StatusDraw)
	}
}

func TestGameResultConstants(t *testing.T) {
	if ResultWhiteWins != "1-0" {
		t.Errorf("ResultWhiteWins = %s, want 1-0", ResultWhiteWins)
	}
	if ResultBlackWins != "0-1" {
		t.Errorf("ResultBlackWins = %s, want 0-1", ResultBlackWins)
	}
	if ResultDraw != "1/2-1/2" {
		t.Errorf("ResultDraw = %s, want 1/2-1/2", ResultDraw)
	}
	if ResultOngoing != "*" {
		t.Errorf("ResultOngoing = %s, want *", ResultOngoing)
	}
}

func TestPieceStruct(t *testing.T) {
	p := &Piece{Color: White, Type: King}
	if p.Color != White {
		t.Errorf("expected White")
	}
	if p.Type != King {
		t.Errorf("expected King")
	}
	p2 := &Piece{Color: Black, Type: Pawn}
	if p2.Color != Black {
		t.Errorf("expected Black")
	}
	if p2.Type != Pawn {
		t.Errorf("expected Pawn")
	}
}

func TestGameStateZeroValue(t *testing.T) {
	var gs GameState
	if gs.Turn != "" {
		t.Errorf("expected empty turn")
	}
	if gs.Status != "" {
		t.Errorf("expected empty status")
	}
}

func TestMoveStruct(t *testing.T) {
	m := Move{From: 0, To: 16, Promotion: Queen, Captured: nil}
	if m.From != 0 {
		t.Errorf("expected From=0")
	}
	if m.To != 16 {
		t.Errorf("expected To=16")
	}
	if m.Promotion != Queen {
		t.Errorf("expected Promotion=Queen")
	}
}

func TestCastlingRights(t *testing.T) {
	cr := CastlingRights{WK: true, WQ: false, BK: true, BQ: false}
	if !cr.WK {
		t.Errorf("expected WK true")
	}
	if cr.WQ {
		t.Errorf("expected WQ false")
	}
	if !cr.BK {
		t.Errorf("expected BK true")
	}
	if cr.BQ {
		t.Errorf("expected BQ false")
	}
}

func TestBoardInitialization(t *testing.T) {
	var b Board
	if len(b) != 64 {
		t.Errorf("Board should have 64 squares, got %d", len(b))
	}
	for i := 0; i < 64; i++ {
		if b[i] != nil {
			t.Errorf("expected nil at square %d", i)
		}
	}
}

func TestHistoryEntry(t *testing.T) {
	he := HistoryEntry{
		Move:        Move{From: 4, To: 4},
		StateBefore: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
	}
	if he.Move.From != 4 {
		t.Errorf("expected From=4")
	}
	if he.StateBefore == "" {
		t.Errorf("expected non-empty state")
	}
}

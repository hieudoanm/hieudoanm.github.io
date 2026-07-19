package chess960

import "testing"

func TestPositionsLength(t *testing.T) {
	if len(Positions) != 960 {
		t.Errorf("expected 960 positions, got %d", len(Positions))
	}
}

func TestPositionsUnique(t *testing.T) {
	seen := make(map[string]bool)
	for _, p := range Positions {
		if seen[p] {
			t.Errorf("duplicate position: %s", p)
		}
		seen[p] = true
	}
	if len(seen) != 960 {
		t.Errorf("expected 960 unique positions, got %d", len(seen))
	}
}

func TestPositionFormat(t *testing.T) {
	for i, p := range Positions {
		if len(p) != 8 {
			t.Errorf("position %d has length %d, want 8: %s", i, len(p), p)
		}
		for _, c := range p {
			if c != 'B' && c != 'N' && c != 'R' && c != 'Q' && c != 'K' {
				t.Errorf("position %d has invalid char %c in %s", i, c, p)
			}
		}
	}
}

func TestPositionsHaveTwoRooks(t *testing.T) {
	for i, p := range Positions {
		count := 0
		for _, c := range p {
			if c == 'R' {
				count++
			}
		}
		if count != 2 {
			t.Errorf("position %d %s has %d rooks, want 2", i, p, count)
		}
	}
}

func TestPositionsHaveOneKing(t *testing.T) {
	for i, p := range Positions {
		count := 0
		for _, c := range p {
			if c == 'K' {
				count++
			}
		}
		if count != 1 {
			t.Errorf("position %d %s has %d kings, want 1", i, p, count)
		}
	}
}

func TestPositionsHaveOneQueen(t *testing.T) {
	for i, p := range Positions {
		count := 0
		for _, c := range p {
			if c == 'Q' {
				count++
			}
		}
		if count != 1 {
			t.Errorf("position %d %s has %d queens, want 1", i, p, count)
		}
	}
}

func TestPositionsHaveTwoBishops(t *testing.T) {
	for i, p := range Positions {
		count := 0
		for _, c := range p {
			if c == 'B' {
				count++
			}
		}
		if count != 2 {
			t.Errorf("position %d %s has %d bishops, want 2", i, p, count)
		}
	}
}

func TestPositionsHaveTwoKnights(t *testing.T) {
	for i, p := range Positions {
		count := 0
		for _, c := range p {
			if c == 'N' {
				count++
			}
		}
		if count != 2 {
			t.Errorf("position %d %s has %d knights, want 2", i, p, count)
		}
	}
}

func TestPositionsKingBetweenRooks(t *testing.T) {
	for i, p := range Positions {
		kingIdx := -1
		rookIdxs := []int{}
		for j, c := range p {
			if c == 'K' {
				kingIdx = j
			}
			if c == 'R' {
				rookIdxs = append(rookIdxs, j)
			}
		}
		if len(rookIdxs) != 2 {
			continue
		}
		if kingIdx < rookIdxs[0] || kingIdx > rookIdxs[1] {
			t.Errorf("position %d %s: king not between rooks (king=%d, rooks=%v)", i, p, kingIdx, rookIdxs)
		}
	}
}

func TestPositionsBishopsDifferentColors(t *testing.T) {
	for i, p := range Positions {
		bishopSquares := []int{}
		for j, c := range p {
			if c == 'B' {
				bishopSquares = append(bishopSquares, j)
			}
		}
		if len(bishopSquares) != 2 {
			continue
		}
		if bishopSquares[0]%2 == bishopSquares[1]%2 {
			t.Errorf("position %d %s: bishops on same color (squares %v)", i, p, bishopSquares)
		}
	}
}

func TestFirstPosition(t *testing.T) {
	if Positions[0] != "BBQNNRKR" {
		t.Errorf("expected first position BBQNNRKR, got %s", Positions[0])
	}
}

func TestLastPosition(t *testing.T) {
	if Positions[959] != "RKRNNQBB" {
		t.Errorf("expected last position RKRNNQBB, got %s", Positions[959])
	}
}

func TestIsValidPositionWithAllPositions(t *testing.T) {
	for i, p := range Positions {
		if !IsValidPosition(p) {
			t.Errorf("position %d %s should be valid", i, p)
		}
	}
}

func TestIsValidPositionInvalidLength(t *testing.T) {
	if IsValidPosition("BBQNNRK") {
		t.Errorf("expected false for 7-char string")
	}
	if IsValidPosition("BBQNNRKRB") {
		t.Errorf("expected false for 9-char string")
	}
}

func TestIsValidPositionInvalidChars(t *testing.T) {
	if IsValidPosition("BBQNNRKX") {
		t.Errorf("expected false for invalid piece char")
	}
	if IsValidPosition("1BQNNRKR") {
		t.Errorf("expected false for digit char")
	}
}

func TestIsValidPositionWrongPieceCounts(t *testing.T) {
	tests := []struct {
		name string
		pos  string
	}{
		{"two kings", "KKQNNRBR"},
		{"no king", "BBQNNRRB"},
		{"no queen", "BBNNKRRB"},
		{"three bishops", "BBNBBKRR"},
		{"one rook", "BBNQNKRB"},
		{"three rooks", "RBRKNNQR"},
	}
	for _, tc := range tests {
		if IsValidPosition(tc.pos) {
			t.Errorf("expected false for %s: %s", tc.name, tc.pos)
		}
	}
}

func TestIsValidPositionBishopsSameColor(t *testing.T) {
	if IsValidPosition("BQBNNRKR") {
		t.Errorf("BQBNNRKR has bishops on same color (both on light squares), expected false")
	}
}

func TestIsValidPositionKingNotBetweenRooks(t *testing.T) {
	tests := []string{
		"KRNNBBQR",
		"RRNNBBQK",
	}
	for _, pos := range tests {
		if IsValidPosition(pos) {
			t.Errorf("%s: king not between rooks, expected false", pos)
		}
	}
}

func TestIsValidPositionValidPositions(t *testing.T) {
	tests := []string{
		"BQNBNRKR",
		"QBNNBRKR",
		"RNBQKBNR",
	}
	for _, pos := range tests {
		if !IsValidPosition(pos) {
			t.Errorf("%s should be valid", pos)
		}
	}
}

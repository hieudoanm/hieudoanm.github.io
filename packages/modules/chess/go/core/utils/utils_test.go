package utils

import (
	"testing"

	"github.com/hieudoanm/chess/core/types"
)

func TestRankOf(t *testing.T) {
	tests := []struct {
		sq   types.Square
		want int
	}{
		{0, 0}, {7, 0}, {8, 1}, {63, 7}, {56, 7},
	}
	for _, tc := range tests {
		got := RankOf(tc.sq)
		if got != tc.want {
			t.Errorf("RankOf(%d) = %d, want %d", tc.sq, got, tc.want)
		}
	}
}

func TestFileOf(t *testing.T) {
	tests := []struct {
		sq   types.Square
		want int
	}{
		{0, 0}, {7, 7}, {8, 0}, {63, 7}, {56, 0},
	}
	for _, tc := range tests {
		got := FileOf(tc.sq)
		if got != tc.want {
			t.Errorf("FileOf(%d) = %d, want %d", tc.sq, got, tc.want)
		}
	}
}

func TestSquare(t *testing.T) {
	tests := []struct {
		rank, file int
		want       types.Square
	}{
		{0, 0, 0}, {0, 7, 7}, {1, 0, 8}, {7, 7, 63},
	}
	for _, tc := range tests {
		got := Square(tc.rank, tc.file)
		if got != tc.want {
			t.Errorf("Square(%d,%d) = %d, want %d", tc.rank, tc.file, got, tc.want)
		}
	}
}

func TestIsValidSquare(t *testing.T) {
	tests := []struct {
		sq   int
		want bool
	}{
		{0, true}, {63, true}, {-1, false}, {64, false}, {32, true},
	}
	for _, tc := range tests {
		got := IsValidSquare(tc.sq)
		if got != tc.want {
			t.Errorf("IsValidSquare(%d) = %v, want %v", tc.sq, got, tc.want)
		}
	}
}

func TestSquareName(t *testing.T) {
	tests := []struct {
		sq   types.Square
		want string
	}{
		{0, "a1"}, {7, "h1"}, {8, "a2"}, {63, "h8"}, {27, "d4"},
	}
	for _, tc := range tests {
		got := SquareName(tc.sq)
		if got != tc.want {
			t.Errorf("SquareName(%d) = %s, want %s", tc.sq, got, tc.want)
		}
	}
}

func TestParseSquare(t *testing.T) {
	tests := []struct {
		name    string
		want    types.Square
		wantOK  bool
	}{
		{"a1", 0, true},
		{"h8", 63, true},
		{"e4", 28, true},
		{"", 0, false},
		{"a", 0, false},
		{"i1", 0, false},
		{"a9", 0, false},
		{"A1", 0, false},
	}
	for _, tc := range tests {
		got, ok := ParseSquare(tc.name)
		if ok != tc.wantOK || got != tc.want {
			t.Errorf("ParseSquare(%s) = (%d, %v), want (%d, %v)", tc.name, got, ok, tc.want, tc.wantOK)
		}
	}
}

func TestSquareColor(t *testing.T) {
	tests := []struct {
		sq   types.Square
		want string
	}{
		{0, "dark"}, {1, "light"}, {7, "light"}, {8, "light"}, {63, "dark"},
	}
	for _, tc := range tests {
		got := SquareColor(tc.sq)
		if got != tc.want {
			t.Errorf("SquareColor(%d) = %s, want %s", tc.sq, got, tc.want)
		}
	}
}

func TestFilesConstant(t *testing.T) {
	if Files != "abcdefgh" {
		t.Errorf("Files = %s, want abcdefgh", Files)
	}
}

func TestSquareNameRoundtrip(t *testing.T) {
	for sq := 0; sq < 64; sq++ {
		name := SquareName(types.Square(sq))
		parsed, ok := ParseSquare(name)
		if !ok || parsed != types.Square(sq) {
			t.Errorf("roundtrip failed for %d: %s -> %d", sq, name, parsed)
		}
	}
}

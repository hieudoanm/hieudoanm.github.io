package pgn

import (
	"strings"
	"testing"
)

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "pgn" {
		t.Errorf("Use = %q, want 'pgn'", cmd.Use)
	}
	subs := cmd.Commands()
	if len(subs) != 2 {
		t.Fatalf("expected 2 subcommands, got %d", len(subs))
	}
	names := map[string]bool{}
	for _, s := range subs {
		names[s.Name()] = true
	}
	if !names["fen"] {
		t.Error("expected subcommand 'fen'")
	}
	if !names["uci"] {
		t.Error("expected subcommand 'uci'")
	}
}

func TestNewFenCmd(t *testing.T) {
	cmd := newFenCmd()
	if cmd.Use != "fen" {
		t.Errorf("Use = %q, want 'fen'", cmd.Use)
	}
	if cmd.Flag("pgn-file") == nil {
		t.Error("expected --pgn-file flag")
	}
	if cmd.Flag("pgn") == nil {
		t.Error("expected --pgn flag")
	}
}

func TestNewFenCmd_RunE_NoInput(t *testing.T) {
	cmd := newFenCmd()
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Fatal("expected error")
	}
	if !strings.Contains(err.Error(), "provide either --pgn-file or --pgn") {
		t.Errorf("expected 'provide either --pgn-file or --pgn', got %v", err)
	}
}

func TestNewUciCmd(t *testing.T) {
	cmd := newUciCmd()
	if cmd.Use != "uci" {
		t.Errorf("Use = %q, want 'uci'", cmd.Use)
	}
	if cmd.Flag("pgn-file") == nil {
		t.Error("expected --pgn-file flag")
	}
	if cmd.Flag("pgn") == nil {
		t.Error("expected --pgn flag")
	}
}

func TestNewUciCmd_RunE_NoInput(t *testing.T) {
	cmd := newUciCmd()
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Fatal("expected error")
	}
	if !strings.Contains(err.Error(), "provide either --pgn-file or --pgn") {
		t.Errorf("expected 'provide either --pgn-file or --pgn', got %v", err)
	}
}

func Test_classifyMove(t *testing.T) {
	tests := []struct {
		cp   int
		want string
	}{
		{0, "Best"},
		{10, "Best"},
		{20, "Best"},
		{21, "Good"},
		{50, "Good"},
		{51, "Inaccuracy"},
		{100, "Inaccuracy"},
		{101, "Mistake"},
		{200, "Mistake"},
		{201, "Blunder"},
		{500, "Blunder"},
	}

	for _, tt := range tests {
		t.Run(tt.want, func(t *testing.T) {
			got := classifyMove(tt.cp)
			if got != tt.want {
				t.Errorf("classifyMove(%d) = %q, want %q", tt.cp, got, tt.want)
			}
		})
	}
}

func Test_abs(t *testing.T) {
	tests := []struct {
		a    int
		want int
	}{
		{0, 0},
		{1, 1},
		{-1, 1},
		{100, 100},
		{-100, 100},
	}

	for _, tt := range tests {
		got := abs(tt.a)
		if got != tt.want {
			t.Errorf("abs(%d) = %d, want %d", tt.a, got, tt.want)
		}
	}
}

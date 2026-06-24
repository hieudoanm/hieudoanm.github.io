package fen

import (
	"strings"
	"testing"

	"github.com/notnil/chess"
)

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "fen" {
		t.Errorf("Use = %q, want 'fen'", cmd.Use)
	}
	subs := cmd.Commands()
	if len(subs) != 2 {
		t.Fatalf("expected 2 subcommands, got %d", len(subs))
	}
	names := map[string]bool{}
	for _, s := range subs {
		names[s.Name()] = true
	}
	if !names["eval"] {
		t.Error("expected subcommand 'eval'")
	}
	if !names["svg"] {
		t.Error("expected subcommand 'svg'")
	}
	if cmd.Flag("list") == nil {
		t.Error("expected --list flag")
	}
}

func TestNewEvalCmd(t *testing.T) {
	cmd := newEvalCmd()
	if cmd.Use != "eval" {
		t.Errorf("Use = %q, want 'eval'", cmd.Use)
	}
	if cmd.Flag("fen") == nil {
		t.Error("expected --fen flag")
	}
	if cmd.Flag("multipv") == nil {
		t.Error("expected --multipv flag")
	}
}

func TestNewEvalCmd_RunE_NoFen(t *testing.T) {
	cmd := newEvalCmd()
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Fatal("expected error")
	}
	if !strings.Contains(err.Error(), "--fen is required") {
		t.Errorf("expected '--fen is required', got %v", err)
	}
}

func TestNewSvgCmd(t *testing.T) {
	cmd := newSvgCmd()
	if cmd.Use != "svg" {
		t.Errorf("Use = %q, want 'svg'", cmd.Use)
	}
	if cmd.Flag("fen") == nil {
		t.Error("expected --fen flag")
	}
	if cmd.Flag("out") == nil {
		t.Error("expected --out flag")
	}
}

func TestNewSvgCmd_RunE_NoFen(t *testing.T) {
	cmd := newSvgCmd()
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Fatal("expected error")
	}
	if !strings.Contains(err.Error(), "provide a FEN string") {
		t.Errorf("expected 'provide a FEN string', got %v", err)
	}
}

func Test_renderBoardSVG(t *testing.T) {
	game := chess.NewGame()
	board := game.Position().Board()
	svg := renderBoardSVG(board)

	if !strings.HasPrefix(svg, `<svg xmlns="http://www.w3.org/2000/svg"`) {
		t.Errorf("SVG should start with svg tag, got: %s", svg[:50])
	}

	if !strings.HasSuffix(svg, `</svg>`) {
		t.Errorf("SVG should end with </svg>")
	}

	if !strings.Contains(svg, `width="480"`) {
		t.Errorf("SVG should have width=\"480\" (8 × 60)")
	}

	if !strings.Contains(svg, `height="480"`) {
		t.Errorf("SVG should have height=\"480\" (8 × 60)")
	}

	rectCount := strings.Count(svg, "<rect ")
	if rectCount != 64 {
		t.Errorf("expected 64 <rect> elements for 64 squares, got %d", rectCount)
	}

	if !strings.Contains(svg, `fill="#b58863"`) {
		t.Errorf("expected dark square color #b58863")
	}

	if !strings.Contains(svg, `fill="#f0d9b5"`) {
		t.Errorf("expected light square color #f0d9b5")
	}
}

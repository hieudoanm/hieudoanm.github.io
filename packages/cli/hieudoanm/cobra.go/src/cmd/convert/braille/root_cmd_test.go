package braille_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/braille"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := braille.NewCommand()
	if cmd.Use != "braille <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "braille <text>")
	}
}

func TestNewCommand_RunE(t *testing.T) {
	cmd := braille.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"hello"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "⠓⠑⠇⠇⠕" {
		t.Errorf("RunE = %q, want %q", got, "⠓⠑⠇⠇⠕")
	}
}

package braille_test

import (
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/braille"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := braille.NewCommand()
	if cmd.Use != "braille <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "braille <text>")
	}
}

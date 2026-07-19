package deburr_test

import (
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/deburr"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := deburr.NewCommand()
	if cmd.Use != "deburr <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "deburr <text>")
	}
}

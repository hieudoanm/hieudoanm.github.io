package morse_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/morse"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := morse.NewCommand()
	if cmd.Use != "morse <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "morse <text>")
	}
}

func TestNewCommand_RunE(t *testing.T) {
	cmd := morse.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"sos"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "... --- ..." {
		t.Errorf("RunE = %q, want %q", got, "... --- ...")
	}
}

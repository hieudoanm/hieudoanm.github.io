package uppercase_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/uppercase"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := uppercase.NewCommand()
	if cmd.Use != "uppercase <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "uppercase <text>")
	}
}

func TestNewCommand_RunE(t *testing.T) {
	cmd := uppercase.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"hello"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "HELLO" {
		t.Errorf("RunE = %q, want %q", got, "HELLO")
	}
}

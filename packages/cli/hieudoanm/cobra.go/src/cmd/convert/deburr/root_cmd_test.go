package deburr_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/deburr"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := deburr.NewCommand()
	if cmd.Use != "deburr <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "deburr <text>")
	}
}

func TestNewCommand_RunE(t *testing.T) {
	cmd := deburr.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"héllo"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello" {
		t.Errorf("RunE = %q, want %q", got, "hello")
	}
}

package capitalise_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/capitalise"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := capitalise.NewCommand()
	if cmd.Use != "capitalise <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "capitalise <text>")
	}
}

func TestNewCommand_RunE(t *testing.T) {
	cmd := capitalise.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"hello world"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "Hello World" {
		t.Errorf("RunE = %q, want %q", got, "Hello World")
	}
}

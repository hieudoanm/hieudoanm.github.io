package lowercase_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/lowercase"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := lowercase.NewCommand()
	if cmd.Use != "lowercase <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "lowercase <text>")
	}
}

func TestNewCommand_RunE(t *testing.T) {
	cmd := lowercase.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"HELLO"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello" {
		t.Errorf("RunE = %q, want %q", got, "hello")
	}
}

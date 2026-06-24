package camelcase_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/camelcase"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := camelcase.NewCommand()
	if cmd.Use != "camelcase <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "camelcase <text>")
	}
}

func TestNewCommand_RunE(t *testing.T) {
	cmd := camelcase.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"hello world"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "helloWorld" {
		t.Errorf("RunE = %q, want %q", got, "helloWorld")
	}
}

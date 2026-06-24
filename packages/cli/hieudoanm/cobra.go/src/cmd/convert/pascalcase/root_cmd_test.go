package pascalcase_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/pascalcase"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := pascalcase.NewCommand()
	if cmd.Use != "pascalcase <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "pascalcase <text>")
	}
}

func TestNewCommand_RunE(t *testing.T) {
	cmd := pascalcase.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"hello world"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "HelloWorld" {
		t.Errorf("RunE = %q, want %q", got, "HelloWorld")
	}
}

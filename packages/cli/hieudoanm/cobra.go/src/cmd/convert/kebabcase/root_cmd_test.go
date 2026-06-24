package kebabcase_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/kebabcase"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := kebabcase.NewCommand()
	if cmd.Use != "kebabcase <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "kebabcase <text>")
	}
}

func TestNewCommand_RunE(t *testing.T) {
	cmd := kebabcase.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"helloWorld"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello-world" {
		t.Errorf("RunE = %q, want %q", got, "hello-world")
	}
}

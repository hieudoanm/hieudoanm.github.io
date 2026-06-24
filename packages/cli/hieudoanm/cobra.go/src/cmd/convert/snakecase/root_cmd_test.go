package snakecase_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/snakecase"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := snakecase.NewCommand()
	if cmd.Use != "snakecase <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "snakecase <text>")
	}
}

func TestNewCommand_RunE(t *testing.T) {
	cmd := snakecase.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"helloWorld"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello_world" {
		t.Errorf("RunE = %q, want %q", got, "hello_world")
	}
}

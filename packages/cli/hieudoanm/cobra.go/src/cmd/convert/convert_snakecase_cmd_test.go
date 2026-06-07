package convert

import (
	"testing"
)

func TestNewSnakecaseCmd_Structure(t *testing.T) {
	cmd := newSnakecaseCmd()
	if cmd.Use != "snakecase [text]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "snakecase [text]")
	}
	if cmd.Short != "Convert a string to snake_case" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Convert a string to snake_case")
	}
}

func TestNewSnakecaseCmd_RunE(t *testing.T) {
	cmd := newSnakecaseCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"helloWorld"}); err != nil {
			t.Fatal(err)
		}
	})
	if output != "hello_world" {
		t.Errorf("RunE = %q, want %q", output, "hello_world")
	}
}

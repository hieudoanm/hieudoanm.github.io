package convert

import (
	"testing"
)

func TestNewUppercaseCmd_Structure(t *testing.T) {
	cmd := newUppercaseCmd()
	if cmd.Use != "uppercase [text]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "uppercase [text]")
	}
	if cmd.Short != "Convert a string to uppercase" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Convert a string to uppercase")
	}
}

func TestNewUppercaseCmd_RunE(t *testing.T) {
	cmd := newUppercaseCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"hello world"}); err != nil {
			t.Fatal(err)
		}
	})
	if output != "HELLO WORLD" {
		t.Errorf("RunE = %q, want %q", output, "HELLO WORLD")
	}
}

package convert

import (
	"testing"
)

func TestNewLowercaseCmd_Structure(t *testing.T) {
	cmd := newLowercaseCmd()
	if cmd.Use != "lowercase [text]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "lowercase [text]")
	}
	if cmd.Short != "Convert a string to lowercase" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Convert a string to lowercase")
	}
}

func TestNewLowercaseCmd_RunE(t *testing.T) {
	cmd := newLowercaseCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"HELLO WORLD"}); err != nil {
			t.Fatal(err)
		}
	})
	if output != "hello world" {
		t.Errorf("RunE = %q, want %q", output, "hello world")
	}
}

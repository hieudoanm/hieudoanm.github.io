package convert

import (
	"testing"
)

func TestNewCapitaliseCmd_Structure(t *testing.T) {
	cmd := newCapitaliseCmd()
	if cmd.Use != "capitalise [text]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "capitalise [text]")
	}
	if cmd.Short != "Capitalise the first letter of each word" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Capitalise the first letter of each word")
	}
}

func TestNewCapitaliseCmd_RunE(t *testing.T) {
	cmd := newCapitaliseCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"hello world"}); err != nil {
			t.Fatal(err)
		}
	})
	if output != "Hello World" {
		t.Errorf("RunE = %q, want %q", output, "Hello World")
	}
}

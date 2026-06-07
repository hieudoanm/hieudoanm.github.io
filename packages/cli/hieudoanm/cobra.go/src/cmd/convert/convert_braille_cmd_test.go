package convert

import (
	"testing"
)

func TestNewBrailleCmd_Structure(t *testing.T) {
	cmd := newBrailleCmd()
	if cmd.Use != "braille [text]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "braille [text]")
	}
	if cmd.Short != "Convert text to Braille" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Convert text to Braille")
	}
}

func TestNewBrailleCmd_RunE(t *testing.T) {
	cmd := newBrailleCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"hello"}); err != nil {
			t.Fatal(err)
		}
	})
	expected := "⠓⠑⠇⠇⠕"
	if output != expected {
		t.Errorf("RunE = %q, want %q", output, expected)
	}
}

package convert

import (
	"testing"
)

func TestNewMorseCmd_Structure(t *testing.T) {
	cmd := newMorseCmd()
	if cmd.Use != "morse [text]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "morse [text]")
	}
	if cmd.Short != "Convert text to Morse code" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Convert text to Morse code")
	}
}

func TestNewMorseCmd_RunE(t *testing.T) {
	cmd := newMorseCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"sos"}); err != nil {
			t.Fatal(err)
		}
	})
	if output != "... --- ..." {
		t.Errorf("RunE = %q, want %q", output, "... --- ...")
	}
}

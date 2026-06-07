package convert

import (
	"testing"
)

func TestNewDeburrCmd_Structure(t *testing.T) {
	cmd := newDeburrCmd()
	if cmd.Use != "deburr [text]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "deburr [text]")
	}
	if cmd.Short != "Remove diacritical marks (accents) from letters" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Remove diacritical marks (accents) from letters")
	}
}

func TestNewDeburrCmd_RunE(t *testing.T) {
	cmd := newDeburrCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"héllo wörld"}); err != nil {
			t.Fatal(err)
		}
	})
	if output != "hello world" {
		t.Errorf("RunE = %q, want %q", output, "hello world")
	}
}

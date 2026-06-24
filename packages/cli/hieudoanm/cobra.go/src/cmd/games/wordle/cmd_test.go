package wordle

import (
	"testing"
)

func TestNewCommand(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "wordle" {
		t.Errorf("NewCommand().Use = %q, want %q", cmd.Use, "wordle")
	}
	if cmd.Short == "" {
		t.Error("NewCommand().Short should not be empty")
	}
}

func TestNewCommandHasJSONFlag(t *testing.T) {
	cmd := NewCommand()
	f := cmd.Flag("json")
	if f == nil {
		t.Fatal("NewCommand() missing --json flag")
	}
	if f.Usage != "Output game result as JSON" {
		t.Errorf("--json flag usage = %q", f.Usage)
	}
}

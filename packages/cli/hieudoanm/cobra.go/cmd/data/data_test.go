package data

import (
	"testing"
)

func TestNewCommand(t *testing.T) {
	cmd := NewCommand()
	if cmd == nil {
		t.Fatal("NewCommand() returned nil")
	}
	if cmd.Use != "data" {
		t.Errorf("Use = %q, want %q", cmd.Use, "data")
	}
	if cmd.Commands() == nil {
		t.Fatal("expected subcommands")
	}
}

func TestNewCommandHasSubcommands(t *testing.T) {
	cmd := NewCommand()
	subs := cmd.Commands()
	names := make(map[string]bool)
	for _, c := range subs {
		names[c.Name()] = true
	}
	for _, want := range []string{"csv", "json", "yml"} {
		if !names[want] {
			t.Errorf("missing subcommand: %s", want)
		}
	}
}

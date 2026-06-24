package image

import (
	"testing"
)

func TestNewCommand(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "image" {
		t.Errorf("Use = %q, want %q", cmd.Use, "image")
	}
}

func TestNewCommand_HasSubcommands(t *testing.T) {
	cmd := NewCommand()
	subs := cmd.Commands()
	names := make(map[string]bool)
	for _, c := range subs {
		names[c.Name()] = true
	}
	for _, want := range []string{"convert", "dominant", "icons", "info"} {
		if !names[want] {
			t.Errorf("missing subcommand: %s", want)
		}
	}
}

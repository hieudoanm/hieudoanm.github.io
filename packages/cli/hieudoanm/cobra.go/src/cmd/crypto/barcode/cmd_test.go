package barcode

import "testing"

func TestNewCommand_Use(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "barcode" {
		t.Errorf("got Use %q, want %q", cmd.Use, "barcode")
	}
}

func TestNewCommand_HasSubcommands(t *testing.T) {
	cmd := NewCommand()
	names := make(map[string]bool)
	for _, c := range cmd.Commands() {
		names[c.Name()] = true
	}
	if !names["encode"] {
		t.Error("missing subcommand: encode")
	}
}

package image

import (
	"testing"
)

func TestNewCommand(t *testing.T) {
	cmd := NewCommand()
	if cmd == nil {
		t.Fatal("NewCommand() returned nil")
	}
	if cmd.Use != "image" {
		t.Errorf("Use = %q, want %q", cmd.Use, "image")
	}
	if cmd.Commands() == nil {
		t.Fatal("expected subcommands")
	}
}

func TestNewCommandHasSubcommands(t *testing.T) {
	cmd := NewCommand()
	names := make(map[string]bool)
	for _, c := range cmd.Commands() {
		names[c.Name()] = true
	}
	for _, want := range []string{"info", "convert", "dominant"} {
		if !names[want] {
			t.Errorf("missing subcommand: %s", want)
		}
	}
}

func TestInfoCmdUse(t *testing.T) {
	cmd := newInfoCmd()
	if cmd.Use != "info <file>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "info <file>")
	}
	if cmd.Short != "Show image metadata (dimensions, format, etc.)" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Show image metadata (dimensions, format, etc.)")
	}
}

func TestConvertCmdUse(t *testing.T) {
	cmd := newConvertCmd()
	if cmd.Use != "convert <file>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "convert <file>")
	}
	if cmd.Short != "Convert image to another format" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Convert image to another format")
	}
}

func TestDominantCmdUse(t *testing.T) {
	cmd := newDominantCmd()
	if cmd.Use != "dominant <file>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "dominant <file>")
	}
	if cmd.Short != "Extract dominant color from an image" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Extract dominant color from an image")
	}
}

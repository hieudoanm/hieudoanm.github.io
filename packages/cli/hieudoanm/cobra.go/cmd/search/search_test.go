package search

import (
	"testing"
)

func TestNewCommand(t *testing.T) {
	cmd := NewCommand()
	if cmd == nil {
		t.Fatal("NewCommand() returned nil")
	}
	if cmd.Use != "search" {
		t.Errorf("Use = %q, want %q", cmd.Use, "search")
	}

	names := make(map[string]bool)
	for _, c := range cmd.Commands() {
		names[c.Name()] = true
	}
	for _, want := range []string{"files", "text", "code", "web"} {
		if !names[want] {
			t.Errorf("missing subcommand: %s", want)
		}
	}
}

func TestFilesCmdHasFlags(t *testing.T) {
	cmd := newFilesCmd()
	if cmd.Use != "files <pattern> [root]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	_, err := cmd.Flags().GetInt("max-depth")
	if err != nil {
		t.Error("expected --max-depth flag")
	}
	_, err = cmd.Flags().GetString("type")
	if err != nil {
		t.Error("expected --type flag")
	}
	_, err = cmd.Flags().GetBool("hidden")
	if err != nil {
		t.Error("expected --hidden flag")
	}
}

func TestTextCmdHasFlags(t *testing.T) {
	cmd := newTextCmd()
	if cmd.Use != "text <pattern> [files-or-dirs...]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	_, err := cmd.Flags().GetBool("ignore-case")
	if err != nil {
		t.Error("expected --ignore-case flag")
	}
	_, err = cmd.Flags().GetInt("max-count")
	if err != nil {
		t.Error("expected --max-count flag")
	}
	_, err = cmd.Flags().GetString("include")
	if err != nil {
		t.Error("expected --include flag")
	}
}

func TestWebCmdHasFlags(t *testing.T) {
	cmd := newWebCmd()
	if cmd.Use != "web <query>" {
		t.Errorf("Use = %q", cmd.Use)
	}
	_, err := cmd.Flags().GetInt("max-results")
	if err != nil {
		t.Error("expected --max-results flag")
	}
	_, err = cmd.Flags().GetString("source")
	if err != nil {
		t.Error("expected --source flag")
	}
}

func TestCodeCmdHasFlags(t *testing.T) {
	cmd := newCodeCmd()
	if cmd.Use != "code <symbol> [dir]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	_, err := cmd.Flags().GetString("lang")
	if err != nil {
		t.Error("expected --lang flag")
	}
	_, err = cmd.Flags().GetString("kind")
	if err != nil {
		t.Error("expected --kind flag")
	}
	_, err = cmd.Flags().GetInt("max-results")
	if err != nil {
		t.Error("expected --max-results flag")
	}
}

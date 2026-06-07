package history

import (
	"io"
	"os"
	"strings"
	"testing"
)

func setHomeTempDir(t *testing.T) string {
	t.Helper()
	tmpDir := t.TempDir()
	t.Setenv("HOME", tmpDir)
	t.Setenv("USERPROFILE", tmpDir)
	return tmpDir
}

func captureStdout(t *testing.T, fn func() error) (string, error) {
	t.Helper()
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	err := fn()
	w.Close()
	os.Stdout = old
	out, _ := io.ReadAll(r)
	return strings.TrimSpace(string(out)), err
}

func captureStderr(t *testing.T, fn func() error) (string, error) {
	t.Helper()
	old := os.Stderr
	r, w, _ := os.Pipe()
	os.Stderr = w
	err := fn()
	w.Close()
	os.Stderr = old
	out, _ := io.ReadAll(r)
	return strings.TrimSpace(string(out)), err
}

func TestNewCommand(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "history" {
		t.Errorf("Use = %q, want %q", cmd.Use, "history")
	}
}

func TestNewCommand_HasSubcommands(t *testing.T) {
	cmd := NewCommand()
	subs := cmd.Commands()
	names := make(map[string]bool)
	for _, c := range subs {
		names[c.Name()] = true
	}
	for _, want := range []string{"list", "search", "clear", "stats"} {
		if !names[want] {
			t.Errorf("missing subcommand: %s", want)
		}
	}
}

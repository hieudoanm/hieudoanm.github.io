package count_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/count"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := count.NewCommand()
	if cmd.Use != "count <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "count <text>")
	}
	if cmd.Short != "Count characters, words, and lines in text" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Count characters, words, and lines in text")
	}
}

func TestNewCommand_RunE(t *testing.T) {
	cmd := count.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"hello world"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	parts := strings.Fields(got)
	if len(parts) != 3 {
		t.Fatalf("expected 3 fields, got %d: %q", len(parts), got)
	}
	if parts[0] != "1" {
		t.Errorf("lines = %s, want 1", parts[0])
	}
	if parts[1] != "2" {
		t.Errorf("words = %s, want 2", parts[1])
	}
	if parts[2] != "11" {
		t.Errorf("chars = %s, want 11", parts[2])
	}
}

func TestNewCommand_RunE_Empty(t *testing.T) {
	cmd := count.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{""}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	parts := strings.Fields(got)
	if len(parts) != 3 {
		t.Fatalf("expected 3 fields, got %d: %q", len(parts), got)
	}
	if parts[0] != "0" {
		t.Errorf("lines = %s, want 0", parts[0])
	}
	if parts[1] != "0" {
		t.Errorf("words = %s, want 0", parts[1])
	}
	if parts[2] != "0" {
		t.Errorf("chars = %s, want 0", parts[2])
	}
}

func TestNewCommand_RunE_MultiLine(t *testing.T) {
	cmd := count.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"hello\nworld\nfoo"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	parts := strings.Fields(got)
	if parts[0] != "3" {
		t.Errorf("lines = %s, want 3", parts[0])
	}
	if parts[1] != "3" {
		t.Errorf("words = %s, want 3", parts[1])
	}
	if parts[2] != "15" {
		t.Errorf("chars = %s, want 15", parts[2])
	}
}

package convert

import (
	"strings"
	"testing"
)

func TestNewCountCmd_Structure(t *testing.T) {
	cmd := newCountCmd()
	if cmd.Use != "count <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "count <text>")
	}
	if cmd.Short != "Count characters, words, and lines in text" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Count characters, words, and lines in text")
	}
	if cmd.Flag("json") == nil {
		t.Error("expected --json flag")
	}
}

func TestNewCountCmd_RunE(t *testing.T) {
	cmd := newCountCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"hello world"}); err != nil {
			t.Fatal(err)
		}
	})
	parts := strings.Fields(output)
	if len(parts) != 3 {
		t.Fatalf("expected 3 fields, got %d: %q", len(parts), output)
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

func TestNewCountCmd_RunE_Empty(t *testing.T) {
	cmd := newCountCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{""}); err != nil {
			t.Fatal(err)
		}
	})
	parts := strings.Fields(output)
	if len(parts) != 3 {
		t.Fatalf("expected 3 fields, got %d: %q", len(parts), output)
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

func TestNewCountCmd_RunE_MultiLine(t *testing.T) {
	cmd := newCountCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"hello\nworld\nfoo"}); err != nil {
			t.Fatal(err)
		}
	})
	parts := strings.Fields(output)
	if parts[0] != "3" {
		t.Errorf("lines = %s, want 3", parts[0])
	}
	if parts[1] != "3" {
		t.Errorf("words = %s, want 3", parts[1])
	}
}

func TestNewCountCmd_RunE_Stdin(t *testing.T) {
	cmd := newCountCmd()
	withStdin(t, "hello world\nsecond line\n", func() {
		output := captureOutput(func() {
			if err := cmd.RunE(cmd, nil); err != nil {
				t.Fatal(err)
			}
		})
		parts := strings.Fields(output)
		if len(parts) != 3 {
			t.Fatalf("expected 3 fields, got %d: %q", len(parts), output)
		}
		if parts[0] != "2" {
			t.Errorf("lines = %s, want 2", parts[0])
		}
		if parts[1] != "4" {
			t.Errorf("words = %s, want 4", parts[1])
		}
	})
}

func TestNewCountCmd_RunE_JSON(t *testing.T) {
	countJSON = false
	defer func() { countJSON = false }()

	cmd := newCountCmd()
	if err := cmd.Flags().Set("json", "true"); err != nil {
		t.Fatal(err)
	}
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"hello world"}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, `"characters"`) {
		t.Errorf("JSON output should contain characters field: %s", output)
	}
	if !strings.Contains(output, `"words"`) {
		t.Errorf("JSON output should contain words field: %s", output)
	}
	if !strings.Contains(output, `"lines"`) {
		t.Errorf("JSON output should contain lines field: %s", output)
	}
}

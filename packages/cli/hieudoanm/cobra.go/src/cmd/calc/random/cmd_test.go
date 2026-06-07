package random

import (
	"bytes"
	"io"
	"os"
	"strings"
	"testing"
)

func captureOutput(fn func()) string {
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	fn()
	w.Close()
	var buf bytes.Buffer
	io.Copy(&buf, r)
	os.Stdout = old
	return buf.String()
}

func TestNewCmd_Structure(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "random" {
		t.Errorf("Use = %q, want %q", cmd.Use, "random")
	}
	if cmd.Short != "Generate random numbers" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Generate random numbers")
	}
	if f := cmd.Flags().Lookup("min"); f == nil {
		t.Error("expected --min flag")
	}
	if f := cmd.Flags().Lookup("max"); f == nil {
		t.Error("expected --max flag")
	}
	if f := cmd.Flags().Lookup("count"); f == nil {
		t.Error("expected --count flag")
	}
}

func TestCmd_RunE(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("min", "1")
	cmd.Flags().Set("max", "10")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	lines := strings.Split(strings.TrimSpace(output), "\n")
	if len(lines) != 1 {
		t.Errorf("expected 1 value, got %d", len(lines))
	}
}

func TestCmd_RunE_Count(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("min", "1")
	cmd.Flags().Set("max", "100")
	cmd.Flags().Set("count", "5")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	lines := strings.Split(strings.TrimSpace(output), "\n")
	if len(lines) != 5 {
		t.Errorf("expected 5 values, got %d", len(lines))
	}
}

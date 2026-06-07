package uuid

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

func TestNewCommand_Use(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "uuid" {
		t.Errorf("got Use %q, want %q", cmd.Use, "uuid")
	}
	if cmd.Short != "Generate UUID v4 identifiers" {
		t.Errorf("got Short %q, want %q", cmd.Short, "Generate UUID v4 identifiers")
	}
}

func TestNewCommand_Flags(t *testing.T) {
	cmd := NewCommand()
	tests := []struct {
		name     string
		defValue string
		typ      string
	}{
		{"count", "1", "int"},
		{"json", "false", "bool"},
	}
	for _, tt := range tests {
		f := cmd.Flag(tt.name)
		if f == nil {
			t.Errorf("missing flag: %s", tt.name)
			continue
		}
		if f.DefValue != tt.defValue {
			t.Errorf("flag %s: got DefValue %q, want %q", tt.name, f.DefValue, tt.defValue)
		}
		if f.Value.Type() != tt.typ {
			t.Errorf("flag %s: got type %q, want %q", tt.name, f.Value.Type(), tt.typ)
		}
	}
}

func TestCmd_ExecutesAndProducesOutput(t *testing.T) {
	cmd := NewCommand()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	output = strings.TrimSpace(output)
	if len(output) == 0 {
		t.Fatal("expected non-empty UUID output")
	}
	if len(output) != 36 {
		t.Errorf("expected UUID length 36, got %d: %s", len(output), output)
	}
}

func TestCmd_WithCountAndJSON(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("count", "3")
	cmd.Flags().Set("json", "true")

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})

	if !strings.Contains(output, `"uuids"`) {
		t.Error("expected JSON output with uuids key")
	}
	if !strings.Contains(output, `"count": 3`) {
		t.Error("expected count 3 in JSON output")
	}
}

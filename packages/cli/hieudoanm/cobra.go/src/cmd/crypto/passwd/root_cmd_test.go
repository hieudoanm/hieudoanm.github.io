package passwd

import (
	"bytes"
	"encoding/json"
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
	if cmd.Use != "passwd" {
		t.Errorf("got Use %q, want %q", cmd.Use, "passwd")
	}
	if cmd.Short != "Generate secure random passwords" {
		t.Errorf("got Short %q, want %q", cmd.Short, "Generate secure random passwords")
	}
}

func TestNewCommand_Flags(t *testing.T) {
	cmd := NewCommand()
	tests := []struct {
		name     string
		defValue string
		typ      string
	}{
		{"length", "16", "int"},
		{"count", "1", "int"},
		{"digits", "true", "bool"},
		{"symbols", "false", "bool"},
		{"no-upper", "false", "bool"},
		{"pin", "false", "bool"},
		{"clip", "false", "bool"},
		{"pronounceable", "false", "bool"},
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

func TestCmd_RunE(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("length", "16")
	cmd.Flags().Set("count", "1")

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})

	output = strings.TrimSpace(output)
	if len(output) != 16 {
		t.Errorf("expected 16-char password, got %q (len=%d)", output, len(output))
	}
}

func TestCmd_RunE_PIN(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("length", "8")
	cmd.Flags().Set("pin", "true")
	cmd.Flags().Set("digits", "false")

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	output = strings.TrimSpace(output)
	if len(output) != 8 {
		t.Errorf("expected 8-digit PIN, got %q (len=%d)", output, len(output))
	}
	for _, c := range output {
		if c < '0' || c > '9' {
			t.Errorf("unexpected non-digit char %c in PIN %q", c, output)
		}
	}
}

func TestCmd_RunE_JSON(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("length", "12")
	cmd.Flags().Set("count", "2")
	cmd.Flags().Set("json", "true")

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})

	var result map[string]interface{}
	if err := json.Unmarshal([]byte(output), &result); err != nil {
		t.Fatalf("expected valid JSON, got error: %v\noutput: %s", err, output)
	}
	if result["count"] != float64(2) {
		t.Errorf("expected count 2, got %v", result["count"])
	}
	if result["length"] != float64(12) {
		t.Errorf("expected length 12, got %v", result["length"])
	}
}

func TestCmd_RunE_Symbols(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("length", "32")
	cmd.Flags().Set("symbols", "true")
	cmd.Flags().Set("no-upper", "true")

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	output = strings.TrimSpace(output)
	if len(output) != 32 {
		t.Errorf("expected 32 chars, got %d", len(output))
	}
}

func TestCmd_RunE_Pronounceable(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("length", "20")
	cmd.Flags().Set("pronounceable", "true")

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	output = strings.TrimSpace(output)
	if len(output) != 20 {
		t.Errorf("expected 20 chars, got %d", len(output))
	}
}

func TestCmd_RunE_Multiple(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("length", "8")
	cmd.Flags().Set("count", "3")

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	lines := strings.Split(strings.TrimSpace(output), "\n")
	if len(lines) != 3 {
		t.Errorf("expected 3 lines, got %d", len(lines))
	}
}

func TestCmd_RunE_NoUpper(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("length", "32")
	cmd.Flags().Set("no-upper", "true")
	cmd.Flags().Set("digits", "false")

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	output = strings.TrimSpace(output)
	if len(output) != 32 {
		t.Errorf("expected 32 chars, got %d", len(output))
	}
	for _, c := range output {
		if c >= 'A' && c <= 'Z' {
			t.Errorf("unexpected uppercase char %c in output %q", c, output)
		}
	}
}

func TestCmd_RunE_PIN_JSON(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("length", "6")
	cmd.Flags().Set("pin", "true")
	cmd.Flags().Set("count", "1")
	cmd.Flags().Set("json", "true")
	cmd.Flags().Set("digits", "false")

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})

	var result map[string]interface{}
	if err := json.Unmarshal([]byte(output), &result); err != nil {
		t.Fatalf("expected valid JSON: %v\noutput: %s", err, output)
	}
	if result["type"] != "pin" {
		t.Errorf("expected type pin, got %v", result["type"])
	}
}

func TestCmd_RunE_Pronounceable_JSON(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("length", "10")
	cmd.Flags().Set("pronounceable", "true")
	cmd.Flags().Set("count", "1")
	cmd.Flags().Set("json", "true")

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})

	var result map[string]interface{}
	if err := json.Unmarshal([]byte(output), &result); err != nil {
		t.Fatalf("expected valid JSON: %v\noutput: %s", err, output)
	}
	if result["type"] != "pronounceable" {
		t.Errorf("expected type pronounceable, got %v", result["type"])
	}
}

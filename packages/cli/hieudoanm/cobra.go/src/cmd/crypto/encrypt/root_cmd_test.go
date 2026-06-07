package encrypt

import (
	"bytes"
	"io"
	"os"
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
	if cmd.Use != "encrypt [--file <file>]" {
		t.Errorf("got Use %q, want %q", cmd.Use, "encrypt [--file <file>]")
	}
	if cmd.Short != "Encrypt a file with AES-256-GCM" {
		t.Errorf("got Short %q, want %q", cmd.Short, "Encrypt a file with AES-256-GCM")
	}
}

func TestNewCommand_Flags(t *testing.T) {
	cmd := NewCommand()
	tests := []struct {
		name     string
		defValue string
		typ      string
	}{
		{"file", "", "string"},
		{"password", "", "string"},
		{"output", "", "string"},
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

func TestCmd_RunE_MissingFile(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("password", "testpass")

	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for missing --file flag")
	}
}

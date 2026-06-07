package keygen

import (
	"bytes"
	"io"
	"os"
	"path/filepath"
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
	if cmd.Use != "keygen" {
		t.Errorf("got Use %q, want %q", cmd.Use, "keygen")
	}
	if cmd.Short != "Generate a new SSH keypair" {
		t.Errorf("got Short %q, want %q", cmd.Short, "Generate a new SSH keypair")
	}
}

func TestNewCommand_Flags(t *testing.T) {
	cmd := NewCommand()
	tests := []struct {
		name     string
		defValue string
		typ      string
	}{
		{"algo", "ed25519", "string"},
		{"bits", "256", "int"},
		{"output", "id_rsa", "string"},
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

func TestCmd_RunE_Ed25519(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("algo", "ed25519")
	cmd.Flags().Set("output", filepath.Join(t.TempDir(), "id_test"))

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Wrote") {
		t.Error("expected Wrote in output")
	}
}

func TestCmd_RunE_RSA(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("algo", "rsa")
	cmd.Flags().Set("bits", "2048")
	cmd.Flags().Set("output", filepath.Join(t.TempDir(), "id_rsa_test"))

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Wrote") {
		t.Error("expected Wrote in output")
	}
}

func TestCmd_RunE_ECDSA(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("algo", "ecdsa")
	cmd.Flags().Set("bits", "256")
	cmd.Flags().Set("output", filepath.Join(t.TempDir(), "id_ecdsa_test"))

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Wrote") {
		t.Error("expected Wrote in output")
	}
}

func TestCmd_RunE_InvalidAlgo(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("algo", "invalid")

	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for invalid algorithm")
	}
}

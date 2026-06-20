package crypto

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

func TestNewCommand(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "crypto" {
		t.Errorf("got Use %q, want %q", cmd.Use, "crypto")
	}
	if cmd.Short != "Cryptographic and security tools" {
		t.Errorf("got Short %q, want %q", cmd.Short, "Cryptographic and security tools")
	}
}

func TestUUIDCmd_ExecutesAndProducesOutput(t *testing.T) {
	cmd := newUUIDCmd()
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

func TestHashCmd_WithTextAndSHA256(t *testing.T) {
	cmd := newHashCmd()
	cmd.Flags().Set("text", "test")
	cmd.Flags().Set("algo", "sha256")

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	output = strings.TrimSpace(output)
	want := "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
	if output != want {
		t.Errorf("got %q, want %q", output, want)
	}
}

func TestNewCommand_hasAllSubcommands(t *testing.T) {
	cmd := NewCommand()
	want := []string{"hash", "jwt", "keygen", "passwd", "uuid", "qrcode", "encrypt", "decrypt", "totp"}
	got := cmd.Commands()
	if len(got) != len(want) {
		t.Fatalf("got %d subcommands, want %d", len(got), len(want))
	}
	names := make(map[string]bool)
	for _, c := range got {
		names[c.Name()] = true
	}
	for _, name := range want {
		if !names[name] {
			t.Errorf("missing subcommand: %s", name)
		}
	}
}

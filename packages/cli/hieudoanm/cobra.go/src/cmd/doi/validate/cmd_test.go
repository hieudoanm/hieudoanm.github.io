package validate

import (
	"bytes"
	"io"
	"os"
	"strings"
	"testing"
)

func captureStdout(fn func()) string {
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

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "validate [doi]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "validate [doi]")
	}
	if cmd.Short != "Validate a DOI string format" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.Long == "" {
		t.Error("Long should not be empty")
	}
	if cmd.Example == "" {
		t.Error("Example should not be empty")
	}
}

func TestNewCmd_RunE_ValidDOI(t *testing.T) {
	cmd := NewCmd()
	output := captureStdout(func() {
		if err := cmd.RunE(cmd, []string{"10.1000/xyz123"}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "valid DOI") {
		t.Errorf("expected valid DOI message, got %q", output)
	}
}

func TestNewCmd_RunE_InvalidDOI(t *testing.T) {
	cmd := NewCmd()
	output := captureStdout(func() {
		if err := cmd.RunE(cmd, []string{"not-a-doi"}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "not a valid DOI") {
		t.Errorf("expected invalid DOI message, got %q", output)
	}
}

func TestNewCmd_RunE_NoArgs(t *testing.T) {
	cmd := NewCmd()
	output := captureStdout(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Usage: doi validate") {
		t.Errorf("expected usage message, got %q", output)
	}
}

func TestNewCmd_RunE_EmptyString(t *testing.T) {
	cmd := NewCmd()
	output := captureStdout(func() {
		if err := cmd.RunE(cmd, []string{""}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "not a valid DOI") {
		t.Errorf("expected invalid DOI message for empty string, got %q", output)
	}
}

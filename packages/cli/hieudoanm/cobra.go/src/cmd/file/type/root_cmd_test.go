package ftype

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
	if cmd.Use != "type [--file <path>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "Detect file type by extension" {
		t.Errorf("Short = %q", cmd.Short)
	}
}

func TestNewCommand_Flags(t *testing.T) {
	cmd := NewCommand()
	_, err := cmd.Flags().GetString("file")
	if err != nil {
		t.Error("expected --file flag")
	}
}

func TestRunE(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.txt")
	os.WriteFile(path, []byte("hello"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("file", path)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "text/plain") {
		t.Errorf("expected text/plain MIME, got: %s", output)
	}
	if !strings.Contains(output, "Size") {
		t.Errorf("expected Size field, got: %s", output)
	}
	if !strings.Contains(output, "MIME") {
		t.Errorf("expected MIME field, got: %s", output)
	}
}

func TestRunE_PDF(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "doc.pdf")
	os.WriteFile(path, []byte("%PDF-1.4"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("file", path)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "application/pdf") {
		t.Errorf("expected application/pdf MIME, got: %s", output)
	}
}

func TestRunE_FileNotFound(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("file", "/nonexistent/file.txt")
	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for nonexistent file")
	}
}

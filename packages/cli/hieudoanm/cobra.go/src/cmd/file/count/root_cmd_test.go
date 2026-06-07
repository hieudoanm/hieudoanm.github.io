package count

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
	if cmd.Use != "count [--file <path>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "Count lines, words, and bytes in a file" {
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
	content := "line one\nline two\nline three\n"
	os.WriteFile(path, []byte(content), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("file", path)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "3") {
		t.Errorf("expected 3 lines, got: %s", output)
	}
	if !strings.Contains(output, "6") {
		t.Errorf("expected 6 words, got: %s", output)
	}
}

func TestRunE_EmptyFile(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "empty.txt")
	os.WriteFile(path, []byte(""), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("file", path)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "0") {
		t.Errorf("expected 0 counts, got: %s", output)
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

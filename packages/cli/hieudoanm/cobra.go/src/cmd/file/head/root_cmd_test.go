package head

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
	if cmd.Use != "head [--file <path>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "Show the first N lines of a file" {
		t.Errorf("Short = %q", cmd.Short)
	}
}

func TestNewCommand_Flags(t *testing.T) {
	cmd := NewCommand()
	_, err := cmd.Flags().GetString("file")
	if err != nil {
		t.Error("expected --file flag")
	}
	_, err = cmd.Flags().GetInt("lines")
	if err != nil {
		t.Error("expected --lines flag")
	}
}

func TestRunE(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.txt")
	content := "line1\nline2\nline3\nline4\nline5\n"
	os.WriteFile(path, []byte(content), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("file", path)
	cmd.Flags().Set("lines", "3")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "line1") {
		t.Errorf("expected line1, got: %s", output)
	}
	if strings.Contains(output, "line4") {
		t.Errorf("expected only 3 lines, got line4")
	}
}

func TestRunE_DefaultLines(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.txt")
	var content string
	for i := 1; i <= 15; i++ {
		content += "line\n"
	}
	os.WriteFile(path, []byte(content), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("file", path)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	count := strings.Count(output, "line")
	if count != 10 {
		t.Errorf("expected 10 lines by default, got: %d", count)
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

package size

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
	if cmd.Use != "size [--path <file-or-dir>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "Show file or directory size" {
		t.Errorf("Short = %q", cmd.Short)
	}
}

func TestNewCommand_Flags(t *testing.T) {
	cmd := NewCommand()
	_, err := cmd.Flags().GetString("path")
	if err != nil {
		t.Error("expected --path flag")
	}
}

func TestRunE_File(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.txt")
	content := []byte("hello world")
	os.WriteFile(path, content, 0644)

	cmd := NewCommand()
	cmd.Flags().Set("path", path)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "11") {
		t.Errorf("expected size 11, got: %s", output)
	}
}

func TestRunE_Directory(t *testing.T) {
	tmp := t.TempDir()
	os.WriteFile(filepath.Join(tmp, "a.txt"), []byte("hello"), 0644)
	os.WriteFile(filepath.Join(tmp, "b.txt"), []byte("world!!!"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("path", tmp)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "B") {
		t.Errorf("expected size with B suffix, got: %s", output)
	}
	if !strings.Contains(output, tmp) {
		t.Errorf("expected path in output, got: %s", output)
	}
}

func TestRunE_FileJSON(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.txt")
	os.WriteFile(path, []byte("data"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("path", path)
	cmd.Flags().Bool("json", false, "JSON output")
	cmd.Flags().Set("json", "true")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "size") {
		t.Errorf("expected JSON size field, got: %s", output)
	}
}

func TestRunE_DirJSON(t *testing.T) {
	tmp := t.TempDir()
	os.WriteFile(filepath.Join(tmp, "a.txt"), []byte("hello"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("path", tmp)
	cmd.Flags().Bool("json", false, "JSON output")
	cmd.Flags().Set("json", "true")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "size") {
		t.Errorf("expected JSON size field, got: %s", output)
	}
}

func TestRunE_PathNotFound(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("path", "/nonexistent/path")
	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for nonexistent path")
	}
}

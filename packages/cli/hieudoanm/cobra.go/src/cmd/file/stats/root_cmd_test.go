package stats

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
	if cmd.Use != "stats [--dir <path>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "Show file statistics by extension" {
		t.Errorf("Short = %q", cmd.Short)
	}
}

func TestNewCommand_Flags(t *testing.T) {
	cmd := NewCommand()
	_, err := cmd.Flags().GetString("dir")
	if err != nil {
		t.Error("expected --dir flag")
	}
}

func TestRunE(t *testing.T) {
	tmp := t.TempDir()
	os.WriteFile(filepath.Join(tmp, "a.txt"), []byte("hello"), 0644)
	os.WriteFile(filepath.Join(tmp, "b.go"), []byte("package main"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("dir", tmp)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, ".txt") {
		t.Errorf("expected .txt extension stats, got: %s", output)
	}
	if !strings.Contains(output, ".go") {
		t.Errorf("expected .go extension stats, got: %s", output)
	}
	if !strings.Contains(output, "Total files") {
		t.Errorf("expected Total files, got: %s", output)
	}
}

func TestRunE_JSON(t *testing.T) {
	tmp := t.TempDir()
	os.WriteFile(filepath.Join(tmp, "a.txt"), []byte("hello"), 0644)
	os.WriteFile(filepath.Join(tmp, "b.go"), []byte("package main"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("dir", tmp)
	cmd.Flags().Bool("json", false, "JSON output")
	cmd.Flags().Set("json", "true")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "totalFiles") {
		t.Errorf("expected JSON totalFiles, got: %s", output)
	}
	if !strings.Contains(output, "byExtension") {
		t.Errorf("expected JSON byExtension, got: %s", output)
	}
}

func TestRunE_MultipleExtensions(t *testing.T) {
	tmp := t.TempDir()
	os.WriteFile(filepath.Join(tmp, "a.txt"), []byte("hello"), 0644)
	os.WriteFile(filepath.Join(tmp, "b.go"), []byte("package main"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("dir", tmp)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Total files") {
		t.Errorf("expected Total files, got: %s", output)
	}
}

func TestRunE_EmptyDir(t *testing.T) {
	tmp := t.TempDir()
	cmd := NewCommand()
	cmd.Flags().Set("dir", tmp)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Total files") {
		t.Errorf("expected Total files with empty dir, got: %s", output)
	}
}

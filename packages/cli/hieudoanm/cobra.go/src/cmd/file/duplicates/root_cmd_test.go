package duplicates

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
	if cmd.Use != "duplicates [--dir <path>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "Find duplicate files by size and partial hash" {
		t.Errorf("Short = %q", cmd.Short)
	}
}

func TestNewCommand_Flags(t *testing.T) {
	cmd := NewCommand()
	_, err := cmd.Flags().GetString("dir")
	if err != nil {
		t.Error("expected --dir flag")
	}
	_, err = cmd.Flags().GetInt64("min-size")
	if err != nil {
		t.Error("expected --min-size flag")
	}
}

func TestRunE_NoDupes(t *testing.T) {
	tmp := t.TempDir()
	os.WriteFile(filepath.Join(tmp, "a.txt"), []byte("hello a"), 0644)
	os.WriteFile(filepath.Join(tmp, "b.txt"), []byte("hello b"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("dir", tmp)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "No duplicates") {
		t.Errorf("expected no duplicates, got: %s", output)
	}
}

func TestRunE_WithDupes(t *testing.T) {
	tmp := t.TempDir()
	content := []byte("duplicate content here")
	os.WriteFile(filepath.Join(tmp, "a.txt"), content, 0644)
	os.WriteFile(filepath.Join(tmp, "b.txt"), content, 0644)
	os.WriteFile(filepath.Join(tmp, "c.txt"), []byte("unique"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("dir", tmp)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Duplicates") {
		t.Errorf("expected duplicates, got: %s", output)
	}
}

func TestRunE_WithDupesLarge(t *testing.T) {
	tmp := t.TempDir()
	content := make([]byte, 10000)
	os.WriteFile(filepath.Join(tmp, "a.dat"), content, 0644)
	os.WriteFile(filepath.Join(tmp, "b.dat"), content, 0644)

	cmd := NewCommand()
	cmd.Flags().Set("dir", tmp)
	cmd.Flags().Set("min-size", "100")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Duplicates") {
		t.Errorf("expected duplicates, got: %s", output)
	}
}

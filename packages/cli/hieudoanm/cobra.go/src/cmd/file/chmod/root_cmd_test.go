package chmod

import (
	"bytes"
	"io"
	"os"
	"path/filepath"
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
	if cmd.Use != "chmod [--mode <octal>] [--file <path>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "Change file permissions" {
		t.Errorf("Short = %q", cmd.Short)
	}
}

func TestNewCommand_Flags(t *testing.T) {
	cmd := NewCommand()
	_, err := cmd.Flags().GetString("mode")
	if err != nil {
		t.Error("expected --mode flag")
	}
	_, err = cmd.Flags().GetString("file")
	if err != nil {
		t.Error("expected --file flag")
	}
	_, err = cmd.Flags().GetBool("recursive")
	if err != nil {
		t.Error("expected --recursive flag")
	}
}

func TestRunE(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.sh")
	os.WriteFile(path, []byte("#!/bin/sh\necho hello"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("file", path)
	cmd.Flags().Set("mode", "755")
	if err := cmd.RunE(cmd, []string{}); err != nil {
		t.Fatal(err)
	}
	info, err := os.Stat(path)
	if err != nil {
		t.Fatal(err)
	}
	if info.Mode().Perm() != 0755 {
		t.Errorf("expected 0755, got: %o", info.Mode().Perm())
	}
}

func TestRunE_InvalidMode(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.sh")
	os.WriteFile(path, []byte("data"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("file", path)
	cmd.Flags().Set("mode", "invalid")
	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for invalid mode")
	}
}

func TestRunE_Recursive(t *testing.T) {
	tmp := t.TempDir()
	sub := filepath.Join(tmp, "subdir")
	os.Mkdir(sub, 0755)
	f1 := filepath.Join(tmp, "a.txt")
	f2 := filepath.Join(sub, "b.txt")
	os.WriteFile(f1, []byte("a"), 0644)
	os.WriteFile(f2, []byte("b"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("file", tmp)
	cmd.Flags().Set("mode", "777")
	cmd.Flags().Set("recursive", "true")
	if err := cmd.RunE(cmd, []string{}); err != nil {
		t.Fatal(err)
	}
	for _, p := range []string{f1, f2} {
		info, err := os.Stat(p)
		if err != nil {
			t.Fatal(err)
		}
		if info.Mode().Perm() != 0777 {
			t.Errorf("expected 0777 for %s, got: %o", p, info.Mode().Perm())
		}
	}
}

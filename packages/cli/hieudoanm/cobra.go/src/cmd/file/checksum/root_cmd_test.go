package checksum

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
	if cmd.Use != "checksum [--file <path>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "Compute file checksum" {
		t.Errorf("Short = %q", cmd.Short)
	}
}

func TestNewCommand_Flags(t *testing.T) {
	cmd := NewCommand()
	_, err := cmd.Flags().GetString("algorithm")
	if err != nil {
		t.Error("expected --algorithm flag")
	}
	_, err = cmd.Flags().GetString("file")
	if err != nil {
		t.Error("expected --file flag")
	}
}

func TestRunE_SHA256(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.txt")
	os.WriteFile(path, []byte("hello"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("file", path)
	cmd.Flags().Set("algorithm", "sha256")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "2cf24dba") {
		t.Errorf("expected sha256 hash, got: %s", output)
	}
}

func TestRunE_MD5(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.txt")
	os.WriteFile(path, []byte("hello"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("file", path)
	cmd.Flags().Set("algorithm", "md5")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "5d41402a") {
		t.Errorf("expected md5 hash, got: %s", output)
	}
}

func TestRunE_SHA1(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.txt")
	os.WriteFile(path, []byte("hello"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("file", path)
	cmd.Flags().Set("algorithm", "sha1")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "aaf4c61d") {
		t.Errorf("expected sha1 hash, got: %s", output)
	}
}

func TestRunE_SHA512(t *testing.T) {
	tmp := t.TempDir()
	path := filepath.Join(tmp, "test.txt")
	os.WriteFile(path, []byte("hello"), 0644)

	cmd := NewCommand()
	cmd.Flags().Set("file", path)
	cmd.Flags().Set("algorithm", "sha512")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "9b71d224") {
		t.Errorf("expected sha512 hash, got: %s", output)
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

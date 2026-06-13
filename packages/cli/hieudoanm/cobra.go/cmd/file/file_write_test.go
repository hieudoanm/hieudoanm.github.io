package file

import (
	"os"
	"path/filepath"
	"testing"
)

func TestWriteCmdHasFlags(t *testing.T) {
	cmd := newWriteCmd()
	if cmd.Use != "write <file> [content]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Args == nil {
		t.Error("Args must be set")
	}
	_, err := cmd.Flags().GetBool("append")
	if err != nil {
		t.Error("expected --append flag")
	}
	_, err = cmd.Flags().GetBool("mkdir")
	if err != nil {
		t.Error("expected --mkdir flag")
	}
	_, err = cmd.Flags().GetString("mode")
	if err != nil {
		t.Error("expected --mode flag")
	}
}

func TestWriteToFile(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "test.txt")

	cmd := newWriteCmd()
	cmd.SetArgs([]string{path, "hello world"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}

	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	if string(data) != "hello world" {
		t.Errorf("content = %q, want %q", string(data), "hello world")
	}
}

func TestWriteAppend(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "append.txt")

	os.WriteFile(path, []byte("first\n"), 0644)

	cmd := newWriteCmd()
	cmd.SetArgs([]string{"--append", path, "second"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}

	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	want := "first\nsecond"
	if string(data) != want {
		t.Errorf("content = %q, want %q", string(data), want)
	}
}

func TestWriteMkdir(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "sub", "nested", "file.txt")

	cmd := newWriteCmd()
	cmd.SetArgs([]string{"--mkdir", path, "content"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}

	if _, err := os.Stat(path); os.IsNotExist(err) {
		t.Error("file was not created")
	}
}

func TestWriteErrorOnNoContent(t *testing.T) {
	// When not piped and no arg, should fail
	cmd := newWriteCmd()
	cmd.SetArgs([]string{"/tmp/nonexistent/file.txt"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error when no content provided and not piped")
	}
}

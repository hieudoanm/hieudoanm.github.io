package file

import (
	"os"
	"path/filepath"
	"testing"
)

func TestEditCmd(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "edit.txt")
	original := "hello foo world foo end"
	os.WriteFile(path, []byte(original), 0644)

	cmd := newEditCmd()
	cmd.SetArgs([]string{"--file", path, "--old", "foo", "--new", "bar"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}

	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	want := "hello bar world bar end"
	if string(data) != want {
		t.Errorf("content = %q, want %q", string(data), want)
	}
}

func TestEditCmdCount(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "edit_count.txt")
	original := "foo foo foo foo"
	os.WriteFile(path, []byte(original), 0644)

	cmd := newEditCmd()
	cmd.SetArgs([]string{"--file", path, "--old", "foo", "--new", "bar", "--count", "2"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}

	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	want := "bar bar foo foo"
	if string(data) != want {
		t.Errorf("content = %q, want %q", string(data), want)
	}
}

func TestEditCmdPreview(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "edit_preview.txt")
	original := "hello foo world"
	os.WriteFile(path, []byte(original), 0644)

	cmd := newEditCmd()
	cmd.SetArgs([]string{"--file", path, "--old", "foo", "--new", "bar", "--preview"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}

	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	if string(data) != original {
		t.Errorf("preview modified file: %q", string(data))
	}
}

func TestEditCmdNoMatch(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "edit_nomatch.txt")
	os.WriteFile(path, []byte("hello world"), 0644)

	cmd := newEditCmd()
	cmd.SetArgs([]string{"--file", path, "--old", "nonexistent", "--new", "bar"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestEditCmdHasFlags(t *testing.T) {
	cmd := newEditCmd()
	if cmd.Use != "edit [--file <path>] [--old <text>] [--new <text>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	_, err := cmd.Flags().GetString("file")
	if err != nil {
		t.Error("expected --file flag")
	}
	_, err = cmd.Flags().GetString("old")
	if err != nil {
		t.Error("expected --old flag")
	}
	_, err = cmd.Flags().GetString("new")
	if err != nil {
		t.Error("expected --new flag")
	}
	_, err = cmd.Flags().GetBool("regex")
	if err != nil {
		t.Error("expected --regex flag")
	}
	_, err = cmd.Flags().GetBool("preview")
	if err != nil {
		t.Error("expected --preview flag")
	}
	_, err = cmd.Flags().GetInt("count")
	if err != nil {
		t.Error("expected --count flag")
	}
}

package file

import (
	"os"
	"path/filepath"
	"testing"
)

func TestPluralS(t *testing.T) {
	tests := []struct {
		n    int
		want string
	}{
		{0, "s"},
		{1, ""},
		{2, "s"},
		{100, "s"},
	}
	for _, tc := range tests {
		got := pluralS(tc.n)
		if got != tc.want {
			t.Errorf("pluralS(%d) = %q, want %q", tc.n, got, tc.want)
		}
	}
}

func TestBuildDiff(t *testing.T) {
	tests := []struct {
		before string
		after  string
		want   string
	}{
		{"foo\nbar\nbaz", "foo\nqux\nbaz", "- bar\n+ qux"},
		{"same\nsame", "same\nsame", ""},
		{"line1\nline2", "line1\nchanged\nline2", "- line2\n+ changed\n+ line2"},
	}
	for _, tc := range tests {
		got := buildDiff(tc.before, tc.after)
		if got != tc.want {
			t.Errorf("buildDiff(%q, %q) = %q, want %q", tc.before, tc.after, got, tc.want)
		}
	}
}

func TestEditCmd(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "edit.txt")
	original := "hello foo world foo end"
	os.WriteFile(path, []byte(original), 0644)

	cmd := newEditCmd()
	cmd.SetArgs([]string{path, "foo", "bar"})
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
	cmd.SetArgs([]string{"--count", "2", path, "foo", "bar"})
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
	cmd.SetArgs([]string{"--preview", path, "foo", "bar"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}

	// File should remain unchanged
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
	cmd.SetArgs([]string{path, "nonexistent", "bar"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestEditCmdHasFlags(t *testing.T) {
	cmd := newEditCmd()
	if cmd.Use != "edit <file> <old> <new>" {
		t.Errorf("Use = %q", cmd.Use)
	}
	_, err := cmd.Flags().GetBool("regex")
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

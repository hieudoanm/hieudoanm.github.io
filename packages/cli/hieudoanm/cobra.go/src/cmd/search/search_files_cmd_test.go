package search

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

func TestFilesCmd_GlobResult(t *testing.T) {
	dir := t.TempDir()
	os.WriteFile(filepath.Join(dir, "foo.txt"), []byte("a"), 0644)
	os.WriteFile(filepath.Join(dir, "bar.txt"), []byte("b"), 0644)
	os.WriteFile(filepath.Join(dir, "baz.go"), []byte("c"), 0644)

	root := NewCommand()
	root.SetArgs([]string{"files", "--pattern", "*.txt", "--dir", dir})

	output := captureOutput(func() {
		if err := root.Execute(); err != nil {
			t.Fatal(err)
		}
	})

	if !strings.Contains(output, "foo.txt") {
		t.Errorf("expected foo.txt in output, got: %s", output)
	}
	if !strings.Contains(output, "bar.txt") {
		t.Errorf("expected bar.txt in output, got: %s", output)
	}
	if strings.Contains(output, "baz.go") {
		t.Error("did not expect baz.go in output")
	}
}

func TestFilesCmd_EmptyGlob(t *testing.T) {
	dir := t.TempDir()
	os.WriteFile(filepath.Join(dir, "data.go"), []byte("a"), 0644)

	root := NewCommand()
	root.SetArgs([]string{"files", "--pattern", "*.py", "--dir", dir})

	output := captureOutput(func() {
		if err := root.Execute(); err != nil {
			t.Fatal(err)
		}
	})

	if !strings.Contains(output, "no files found") {
		t.Errorf("expected 'no files found' message, got: %s", output)
	}
}

package search

import (
	"os"
	"path/filepath"
	"regexp"
	"testing"
)

func TestSearchFileText(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "test.txt")
	content := "hello world\nfoo bar\nhello again"
	os.WriteFile(path, []byte(content), 0644)

	re := regexp.MustCompile("hello")
	matches := searchFileText(path, "hello", re, 0)
	if len(matches) != 2 {
		t.Errorf("got %d matches, want 2", len(matches))
	}
	if len(matches) > 0 && matches[0].Line != 1 {
		t.Errorf("first match line = %d, want 1", matches[0].Line)
	}
	if len(matches) > 1 && matches[1].Line != 3 {
		t.Errorf("second match line = %d, want 3", matches[1].Line)
	}
}

func TestSearchFileTextMaxCount(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "test.txt")
	content := "match\nskip\nmatch\nskip\nmatch"
	os.WriteFile(path, []byte(content), 0644)

	re := regexp.MustCompile("match")
	matches := searchFileText(path, "match", re, 2)
	if len(matches) != 2 {
		t.Errorf("got %d matches, want 2", len(matches))
	}
}

func TestSearchFileTextNoMatch(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "test.txt")
	os.WriteFile(path, []byte("hello world"), 0644)

	re := regexp.MustCompile("nonexistent")
	matches := searchFileText(path, "nonexistent", re, 0)
	if len(matches) != 0 {
		t.Errorf("got %d matches, want 0", len(matches))
	}
}

func TestSearchFileTextBinary(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "binary.bin")
	os.WriteFile(path, []byte{0x00, 0x01, 0x02}, 0644)

	re := regexp.MustCompile(".")
	matches := searchFileText(path, ".", re, 0)
	if len(matches) != 0 {
		t.Errorf("expected 0 matches for binary, got %d", len(matches))
	}
}

func TestSearchFileTextMissingFile(t *testing.T) {
	re := regexp.MustCompile(".")
	matches := searchFileText("/nonexistent/file.txt", ".", re, 0)
	if matches != nil {
		t.Errorf("expected nil, got %v", matches)
	}
}

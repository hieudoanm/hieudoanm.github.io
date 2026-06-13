package search

import (
	"os"
	"path/filepath"
	"testing"
)

func TestIsHidden(t *testing.T) {
	tests := []struct {
		path string
		want bool
	}{
		{".git", true},
		{".hidden", true},
		{"visible", false},
		{"src/main.go", false},
		{".config/settings", true},
	}
	for _, tc := range tests {
		got := isHidden(tc.path)
		if got != tc.want {
			t.Errorf("isHidden(%q) = %v, want %v", tc.path, got, tc.want)
		}
	}
}

func TestIsHiddenBaseName(t *testing.T) {
	// isHidden only checks the base name
	if !isHidden(".hidden/file.txt") {
		t.Error("isHidden should check path base")
	}
}

func TestWalkWithDepth(t *testing.T) {
	dir := t.TempDir()

	os.MkdirAll(filepath.Join(dir, "a", "b", "c"), 0755)
	os.WriteFile(filepath.Join(dir, "a", "f1.txt"), []byte("x"), 0644)
	os.WriteFile(filepath.Join(dir, "a", "b", "f2.txt"), []byte("x"), 0644)
	os.WriteFile(filepath.Join(dir, "a", "b", "c", "f3.txt"), []byte("x"), 0644)

	var visited []string
	walkWithDepth(dir, 0, 2, func(path string, fi os.FileInfo, err error) error {
		if err != nil {
			return nil
		}
		rel, _ := filepath.Rel(dir, path)
		visited = append(visited, rel)
		return nil
	})

	hasDeepFile := false
	for _, v := range visited {
		if v == filepath.Join("a", "b", "c", "f3.txt") {
			hasDeepFile = true
			break
		}
	}
	if hasDeepFile {
		t.Error("walkWithDepth depth=2 should not reach depth 3 files")
	}
}

func TestFilesHiddenExcluded(t *testing.T) {
	dir := t.TempDir()
	os.MkdirAll(filepath.Join(dir, ".hidden"), 0755)
	os.WriteFile(filepath.Join(dir, ".hidden", "secret.txt"), []byte("x"), 0644)
	os.WriteFile(filepath.Join(dir, "visible.txt"), []byte("x"), 0644)

	var visited []string
	filepath.Walk(dir, func(path string, fi os.FileInfo, err error) error {
		if err != nil || fi.IsDir() {
			if isHidden(path) && path != dir {
				return filepath.SkipDir
			}
			return nil
		}
		if isHidden(path) {
			return nil
		}
		rel, _ := filepath.Rel(dir, path)
		visited = append(visited, rel)
		return nil
	})

	if len(visited) != 1 || visited[0] != "visible.txt" {
		t.Errorf("expected only visible.txt, got %v", visited)
	}
}

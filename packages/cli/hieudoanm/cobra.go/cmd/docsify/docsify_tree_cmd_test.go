package docsify

import (
	"os"
	"path/filepath"
	"testing"
)

func TestMatchAnySegment(t *testing.T) {
	tests := []struct {
		pattern string
		path    string
		want    bool
	}{
		{"node_modules", "a/b/node_modules/c/d", true},
		{"node_modules", "src/node_modules", true},
		{"*.pyc", "src/__pycache__/foo.pyc", true},
		{"*.pyc", "src/main.py", false},
		{"dist", "dist/index.js", true},
		{"dist", "src/dist/index.js", true},
		{"nonexistent", "a/b/c", false},
	}
	for _, tc := range tests {
		got := matchAnySegment(tc.pattern, tc.path)
		if got != tc.want {
			t.Errorf("matchAnySegment(%q, %q) = %v, want %v", tc.pattern, tc.path, got, tc.want)
		}
	}
}

func TestLoadGitignore_noFile(t *testing.T) {
	dir := t.TempDir()
	ignore, err := loadGitignore(dir)
	if err != nil {
		t.Fatal(err)
	}
	if ignore.ignore("anything", false) {
		t.Error("expected no ignores when no .gitignore exists")
	}
}

func TestLoadGitignore_basicRules(t *testing.T) {
	dir := t.TempDir()
	gi := filepath.Join(dir, ".gitignore")
	content := `node_modules
dist
*.log
`
	if err := os.WriteFile(gi, []byte(content), 0644); err != nil {
		t.Fatal(err)
	}

	ignore, err := loadGitignore(dir)
	if err != nil {
		t.Fatal(err)
	}

	tests := []struct {
		path  string
		isDir bool
		want  bool
	}{
		{"node_modules/pkg/index.js", false, true},
		{"node_modules", true, true},
		{"dist/bundle.js", false, true},
		{"error.log", false, true},
		{"src/main.go", false, false},
		{"README.md", false, false},
	}
	for _, tc := range tests {
		got := ignore.ignore(tc.path, tc.isDir)
		if got != tc.want {
			t.Errorf("ignore(%q, isDir=%v) = %v, want %v", tc.path, tc.isDir, got, tc.want)
		}
	}
}

func TestLoadGitignore_negation(t *testing.T) {
	dir := t.TempDir()
	gi := filepath.Join(dir, ".gitignore")
	content := `*.log
!important.log
`
	if err := os.WriteFile(gi, []byte(content), 0644); err != nil {
		t.Fatal(err)
	}

	ignore, err := loadGitignore(dir)
	if err != nil {
		t.Fatal(err)
	}

	if !ignore.ignore("debug.log", false) {
		t.Error("debug.log should be ignored")
	}
	if ignore.ignore("important.log", false) {
		t.Error("important.log should not be ignored (negation)")
	}
}

func TestLoadGitignore_dirOnlyPattern(t *testing.T) {
	dir := t.TempDir()
	gi := filepath.Join(dir, ".gitignore")
	content := `build/
`
	if err := os.WriteFile(gi, []byte(content), 0644); err != nil {
		t.Fatal(err)
	}

	ignore, err := loadGitignore(dir)
	if err != nil {
		t.Fatal(err)
	}

	if !ignore.ignore("build", true) {
		t.Error("build/ should ignore directories named build")
	}
	if ignore.ignore("build/output.txt", false) {
		t.Error("build/ should not ignore files named build/output.txt (dirOnly)")
	}
}

func TestLoadGitignore_commentsAndEmptyLines(t *testing.T) {
	dir := t.TempDir()
	gi := filepath.Join(dir, ".gitignore")
	content := `# this is a comment

node_modules
`
	if err := os.WriteFile(gi, []byte(content), 0644); err != nil {
		t.Fatal(err)
	}

	ignore, err := loadGitignore(dir)
	if err != nil {
		t.Fatal(err)
	}

	if !ignore.ignore("node_modules/pkg.js", false) {
		t.Error("node_modules should be ignored")
	}
	if ignore.ignore("src/main.go", false) {
		t.Error("src/main.go should not be ignored")
	}
}

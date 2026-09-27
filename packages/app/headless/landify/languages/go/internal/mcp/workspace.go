package mcp

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

// DefaultRoot is the directory the sandbox resolves relative paths against when
// the CLI is started without --root.
const DefaultRoot = "."

// DefaultConfigPath is the file the tools read when a caller names no source.
// It matches the --file default of the landify CLI.
const DefaultConfigPath = "landify.yaml"

// Workspace is the file access the MCP tools are allowed to perform. A model
// chooses every path that reaches it, so all access is confined to one root
// directory: without this an LLM client could read or overwrite any file the
// server process can reach.
//
// The zero value is not usable; construct one with NewWorkspace.
type Workspace struct {
	root string
}

// NewWorkspace returns a Workspace rooted at dir. The directory is resolved to
// an absolute path once, so a later chdir cannot widen the sandbox, and must
// already exist. Symlinks are resolved so the root is canonical and can be
// compared against resolved paths.
func NewWorkspace(dir string) (*Workspace, error) {
	if strings.TrimSpace(dir) == "" {
		dir = DefaultRoot
	}
	abs, err := filepath.Abs(dir)
	if err != nil {
		return nil, fmt.Errorf("resolve root %s: %w", dir, err)
	}
	root, err := filepath.EvalSymlinks(abs)
	if err != nil {
		return nil, fmt.Errorf("root %s: %w", abs, err)
	}
	info, err := os.Stat(root)
	if err != nil {
		return nil, fmt.Errorf("root %s: %w", root, err)
	}
	if !info.IsDir() {
		return nil, fmt.Errorf("root %s is not a directory", root)
	}
	return &Workspace{root: root}, nil
}

// Root returns the absolute directory every path is resolved inside.
func (w *Workspace) Root() string {
	return w.root
}

// Resolve turns a caller-supplied relative path into an absolute one that is
// guaranteed to stay inside the root. An empty path resolves to the root
// itself, so callers can treat "" as "the current directory".
//
// Absolute paths and any path that escapes via ".." are rejected rather than
// silently rewritten: a caller that means to leave the sandbox has a bug, and
// quietly serving a different file would hide it. Symlinks are resolved too —
// a link inside the root pointing outside it is an escape, not a shortcut —
// so a lexical join is never enough to prove containment.
func (w *Workspace) Resolve(path string) (string, error) {
	clean := strings.TrimSpace(path)
	if clean == "" {
		return w.root, nil
	}
	if filepath.IsAbs(clean) {
		return "", fmt.Errorf("path %q must be relative to the server root %s", path, w.root)
	}
	target := filepath.Join(w.root, clean)
	if !w.contains(target) {
		return "", fmt.Errorf("path %q escapes the server root %s", path, w.root)
	}
	return target, nil
}

// contains reports whether target is the root itself or lives under it, both
// lexically and after symlinks are resolved. The second check is what catches
// a link inside the root that points out of it.
func (w *Workspace) contains(target string) bool {
	if !within(w.root, target) {
		return false
	}
	resolved, err := resolveExisting(target)
	if err != nil {
		return false
	}
	return within(w.root, resolved)
}

// within reports whether target is root or sits under it.
func within(root, target string) bool {
	return target == root || strings.HasPrefix(target, root+string(filepath.Separator))
}

// resolveExisting resolves symlinks in the longest existing prefix of path and
// re-appends the segments that do not exist yet, so a file the server is about
// to create is checked against the real location of its parent directory.
func resolveExisting(path string) (string, error) {
	tail := ""
	for current := path; ; {
		resolved, err := filepath.EvalSymlinks(current)
		if err == nil {
			return filepath.Join(resolved, tail), nil
		}
		if !errors.Is(err, os.ErrNotExist) {
			return "", err
		}
		parent := filepath.Dir(current)
		if parent == current {
			return path, nil
		}
		tail = filepath.Join(filepath.Base(current), tail)
		current = parent
	}
}

// Read returns the contents of a file inside the root.
func (w *Workspace) Read(path string) ([]byte, error) {
	target, err := w.Resolve(path)
	if err != nil {
		return nil, err
	}
	data, err := os.ReadFile(target)
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return nil, fmt.Errorf("no such file in the server root: %s", path)
		}
		return nil, fmt.Errorf("read %s: %w", path, err)
	}
	return data, nil
}

// Write creates or replaces a file inside the root, creating parent
// directories as needed.
func (w *Workspace) Write(path string, data []byte) error {
	target, err := w.Resolve(path)
	if err != nil {
		return err
	}
	if dir := filepath.Dir(target); dir != w.root {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			return fmt.Errorf("create %s: %w", filepath.Dir(target), err)
		}
	}
	if err := os.WriteFile(target, data, 0o644); err != nil {
		return fmt.Errorf("write %s: %w", path, err)
	}
	return nil
}

// Exists reports whether a path inside the root names an existing file.
func (w *Workspace) Exists(path string) (bool, error) {
	target, err := w.Resolve(path)
	if err != nil {
		return false, err
	}
	info, err := os.Stat(target)
	if errors.Is(err, os.ErrNotExist) {
		return false, nil
	}
	if err != nil {
		return false, fmt.Errorf("stat %s: %w", path, err)
	}
	return !info.IsDir(), nil
}

// Package workspace confines file access to a single root directory. The API
// server lets a caller name content directories, so every path it receives must
// be resolved back inside one root.
package workspace

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

// DefaultRoot is the directory the sandbox resolves relative paths against when
// the CLI is started without a root.
const DefaultRoot = "."

// Workspace is the file access a caller is allowed to perform. A caller chooses
// every path that reaches it, so all access is confined to one root directory:
// without this a request could read any file the server process can reach.
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
//
// A component that exists but cannot be resolved is a broken symlink, not a
// path awaiting creation. Confusing the two would let a link inside the root
// point at a location outside it: the target does not exist, so nothing is
// written there yet, and the walk would happily approve the link's own name.
// The write would then follow the link and create the file outside the root, so
// a broken symlink is refused outright.
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
		if broken, lerr := isSymlink(current); lerr != nil {
			return "", lerr
		} else if broken {
			return "", fmt.Errorf("path %s is a symlink that does not resolve, so its target cannot be confined to the root", current)
		}
		parent := filepath.Dir(current)
		if parent == current {
			return path, nil
		}
		tail = filepath.Join(filepath.Base(current), tail)
		current = parent
	}
}

// isSymlink reports whether path exists and is itself a symbolic link. Lstat
// does not follow the link, so a broken link is still seen as a link.
func isSymlink(path string) (bool, error) {
	info, err := os.Lstat(path)
	if errors.Is(err, os.ErrNotExist) {
		return false, nil
	}
	if err != nil {
		return false, fmt.Errorf("inspect %s: %w", path, err)
	}
	return info.Mode()&os.ModeSymlink != 0, nil
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

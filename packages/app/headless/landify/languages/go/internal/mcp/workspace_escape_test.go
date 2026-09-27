package mcp

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestWorkspaceRefusesToLeaveTheRoot(t *testing.T) {
	outside := t.TempDir()
	secret := filepath.Join(outside, "secret.txt")
	if err := os.WriteFile(secret, []byte("classified"), 0o644); err != nil {
		t.Fatal(err)
	}

	ws, err := NewWorkspace(t.TempDir())
	if err != nil {
		t.Fatalf("NewWorkspace: %v", err)
	}

	if _, err := ws.Read("../" + filepath.Base(outside) + "/secret.txt"); err == nil {
		t.Fatal("expected reading outside the root to be refused")
	}
	if err := ws.Write("../escaped.yaml", []byte("x")); err == nil {
		t.Fatal("expected writing outside the root to be refused")
	}
	if _, err := os.Stat(secret); err != nil {
		t.Fatalf("the file outside the root should be untouched: %v", err)
	}
}

func TestWorkspaceExistsRejectsEscapingPaths(t *testing.T) {
	ws, _ := testWorkspace(t)

	if _, err := ws.Exists("../outside.yaml"); err == nil {
		t.Fatal("expected an escaping path to be refused")
	}
}

// A symlink inside the root is an escape, not a shortcut: the lexical path
// looks contained, so only resolving it catches the escape. Each case targets a
// different operation because a model can reach all three.
func TestWorkspaceRefusesToFollowSymlinksOutOfTheRoot(t *testing.T) {
	tests := []struct {
		name    string
		link    func(t *testing.T, ws *Workspace, outside string) string
		exploit func(ws *Workspace, link string) error
	}{
		{
			name: "reading through a symlinked file",
			link: linkFile,
			exploit: func(ws *Workspace, link string) error {
				_, err := ws.Read(link)
				return err
			},
		},
		{
			name: "writing through a symlinked file",
			link: linkFile,
			exploit: func(ws *Workspace, link string) error {
				return ws.Write(link, []byte("owned"))
			},
		},
		{
			name: "writing through a symlinked directory",
			link: linkDir,
			exploit: func(ws *Workspace, link string) error {
				return ws.Write(link+"/planted.yaml", []byte("owned"))
			},
		},
		{
			name: "statting through a symlinked file",
			link: linkFile,
			exploit: func(ws *Workspace, link string) error {
				_, err := ws.Exists(link)
				return err
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ws, _ := testWorkspace(t)
			outside := t.TempDir()
			victim := filepath.Join(outside, "victim.txt")
			if err := os.WriteFile(victim, []byte("classified"), 0o644); err != nil {
				t.Fatal(err)
			}
			link := tt.link(t, ws, victim)

			if err := tt.exploit(ws, link); err == nil {
				t.Fatal("expected the symlink escape to be refused")
			}
			data, err := os.ReadFile(victim)
			if err != nil {
				t.Fatalf("read victim: %v", err)
			}
			if string(data) != "classified" {
				t.Fatalf("the file outside the root was modified: %q", data)
			}
		})
	}
}

// A symlink that stays inside the root is legitimate — a project may well link
// its content directory — so it must keep working.
func TestWorkspaceAllowsSymlinksThatStayInsideTheRoot(t *testing.T) {
	ws, _ := testWorkspace(t)
	ws.Write("pages/site.yaml", []byte(validYAML))
	if err := os.Symlink(filepath.Join(ws.Root(), "pages"), filepath.Join(ws.Root(), "link")); err != nil {
		t.Skipf("symlinks unavailable: %v", err)
	}

	data, err := ws.Read("link/site.yaml")
	if err != nil {
		t.Fatalf("expected a contained symlink to resolve, got %v", err)
	}
	if !strings.Contains(string(data), "type: faq") {
		t.Fatalf("expected the linked config, got %d bytes", len(data))
	}
}

// linkFile points name inside ws at an existing file outside it.
func linkFile(t *testing.T, ws *Workspace, outside string) string {
	t.Helper()

	name := "escape.txt"
	if err := os.Symlink(outside, filepath.Join(ws.Root(), name)); err != nil {
		t.Skipf("symlinks unavailable: %v", err)
	}
	return name
}

// linkDir points name inside ws at a directory outside it.
func linkDir(t *testing.T, ws *Workspace, outside string) string {
	t.Helper()

	name := "escape-dir"
	if err := os.Symlink(outside, filepath.Join(ws.Root(), name)); err != nil {
		t.Skipf("symlinks unavailable: %v", err)
	}
	return name
}

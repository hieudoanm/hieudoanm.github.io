package mcp

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestNewWorkspaceAcceptsExistingDirectories(t *testing.T) {
	tests := []struct {
		name    string
		dir     func(t *testing.T) string
		wantErr string
	}{
		{
			name: "an explicit directory",
			dir:  func(t *testing.T) string { return t.TempDir() },
		},
		{
			name: "an empty string falls back to the default root",
			dir:  func(t *testing.T) string { return "   " },
		},
		{
			name:    "a missing directory is reported",
			dir:     func(t *testing.T) string { return filepath.Join(t.TempDir(), "nope") },
			wantErr: "root",
		},
		{
			name: "a file is not a root",
			dir: func(t *testing.T) string {
				path := filepath.Join(t.TempDir(), "file.txt")
				if err := os.WriteFile(path, []byte("x"), 0o644); err != nil {
					t.Fatal(err)
				}
				return path
			},
			wantErr: "not a directory",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ws, err := NewWorkspace(tt.dir(t))
			if tt.wantErr != "" {
				if err == nil || !strings.Contains(err.Error(), tt.wantErr) {
					t.Fatalf("expected an error containing %q, got %v", tt.wantErr, err)
				}
				return
			}
			if err != nil {
				t.Fatalf("NewWorkspace: %v", err)
			}
			if !filepath.IsAbs(ws.Root()) {
				t.Fatalf("expected an absolute root, got %q", ws.Root())
			}
		})
	}
}

func TestWorkspaceResolveConfinesPathsToTheRoot(t *testing.T) {
	root := t.TempDir()
	ws, err := NewWorkspace(root)
	if err != nil {
		t.Fatalf("NewWorkspace: %v", err)
	}

	// Expectations hang off ws.Root() rather than the temp dir: the root is
	// canonicalised, and on macOS t.TempDir() is itself a symlink (/var -> /private/var).
	tests := []struct {
		name    string
		path    string
		want    string
		wantErr string
	}{
		{name: "a plain relative path", path: "landify.yaml", want: filepath.Join(ws.Root(), "landify.yaml")},
		{name: "a nested relative path", path: "pages/a.yaml", want: filepath.Join(ws.Root(), "pages/a.yaml")},
		{name: "a path that walks back but stays inside", path: "pages/../b.yaml", want: filepath.Join(ws.Root(), "b.yaml")},
		{name: "an empty path is the root itself", path: "", want: ws.Root()},
		{name: "a parent escape is rejected", path: "../outside.yaml", wantErr: "escapes the server root"},
		{name: "a deep parent escape is rejected", path: "a/b/../../../outside.yaml", wantErr: "escapes the server root"},
		{name: "an absolute path is rejected", path: "/etc/passwd", wantErr: "must be relative"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := ws.Resolve(tt.path)
			if tt.wantErr != "" {
				if err == nil || !strings.Contains(err.Error(), tt.wantErr) {
					t.Fatalf("expected an error containing %q, got %v", tt.wantErr, err)
				}
				return
			}
			if err != nil {
				t.Fatalf("Resolve(%q): %v", tt.path, err)
			}
			if got != tt.want {
				t.Fatalf("Resolve(%q) = %q, want %q", tt.path, got, tt.want)
			}
		})
	}
}

func TestWorkspaceWriteReadRoundTrip(t *testing.T) {
	root := t.TempDir()
	ws, err := NewWorkspace(root)
	if err != nil {
		t.Fatalf("NewWorkspace: %v", err)
	}

	if err := ws.Write("pages/site.yaml", []byte("type: faq\n")); err != nil {
		t.Fatalf("Write: %v", err)
	}
	data, err := ws.Read("pages/site.yaml")
	if err != nil {
		t.Fatalf("Read: %v", err)
	}
	if string(data) != "type: faq\n" {
		t.Fatalf("expected the written content back, got %q", data)
	}
}

func TestWorkspaceWriteReplacesExistingContent(t *testing.T) {
	ws, _ := testWorkspace(t)

	if err := ws.Write("a.yaml", []byte("first")); err != nil {
		t.Fatalf("Write: %v", err)
	}
	if err := ws.Write("a.yaml", []byte("second")); err != nil {
		t.Fatalf("Write: %v", err)
	}
	data, err := ws.Read("a.yaml")
	if err != nil {
		t.Fatalf("Read: %v", err)
	}
	if string(data) != "second" {
		t.Fatalf("expected the file to be replaced, got %q", data)
	}
}

func TestWorkspaceReadReportsAMissingFile(t *testing.T) {
	ws, _ := testWorkspace(t)

	_, err := ws.Read("absent.yaml")
	if err == nil {
		t.Fatal("expected an error for a missing file")
	}
	if !strings.Contains(err.Error(), "no such file") {
		t.Fatalf("expected a no-such-file error, got %v", err)
	}
}

func TestWorkspaceExists(t *testing.T) {
	ws, _ := testWorkspace(t)
	if err := ws.Write("here.yaml", []byte("x")); err != nil {
		t.Fatalf("Write: %v", err)
	}
	if err := os.Mkdir(filepath.Join(ws.Root(), "nested"), 0o755); err != nil {
		t.Fatalf("Mkdir: %v", err)
	}

	tests := []struct {
		name string
		path string
		want bool
	}{
		{name: "an existing file", path: "here.yaml", want: true},
		{name: "a missing file", path: "gone.yaml", want: false},
		{name: "a directory is not a file", path: "nested", want: false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := ws.Exists(tt.path)
			if err != nil {
				t.Fatalf("Exists(%q): %v", tt.path, err)
			}
			if got != tt.want {
				t.Fatalf("Exists(%q) = %t, want %t", tt.path, got, tt.want)
			}
		})
	}
}

// A frame larger than the cap is reported as a parse error rather than being
// buffered, and the stream resynchronises on the next newline.
func TestServerRefusesAnOversizedFrameAndRecovers(t *testing.T) {
	oversized := `{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"pad":"` +
		strings.Repeat("x", MaxFrameBytes) + `"}}`
	input := oversized + "\n" + `{"jsonrpc":"2.0","id":2,"method":"tools/list"}` + "\n"

	ws, _ := testWorkspace(t)

	lines := outputLines(runServer(t, ws, input))
	if len(lines) < 2 {
		t.Fatalf("expected a parse error and a tools/list reply, got %d frames", len(lines))
	}

	var first struct {
		ID    json.RawMessage `json:"id"`
		Error *ErrorObject    `json:"error"`
	}
	if err := json.Unmarshal([]byte(lines[0]), &first); err != nil {
		t.Fatalf("unmarshal %q: %v", lines[0], err)
	}
	if first.Error == nil || first.Error.Code != ErrCodeParse {
		t.Fatalf("expected a parse error, got %q", lines[0])
	}
	if !strings.Contains(lines[len(lines)-1], `"id":2`) {
		t.Fatalf("the stream did not resynchronise, got %q", lines[len(lines)-1])
	}
}

// outputLines splits a captured stdout into frames, dropping blank lines.
func outputLines(out string) []string {
	var lines []string
	for _, line := range strings.Split(out, "\n") {
		if trimmed := strings.TrimSpace(line); trimmed != "" {
			lines = append(lines, trimmed)
		}
	}
	return lines
}

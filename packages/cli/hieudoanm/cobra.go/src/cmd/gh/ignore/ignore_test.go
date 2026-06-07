package ignore

import (
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/gh/shared"
)

func TestNewIgnoreCmd_Structure(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "ignore" {
		t.Errorf("Use = %q, want 'ignore'", cmd.Use)
	}
	if cmd.Short != "Fetch a .gitignore template from GitHub" {
		t.Errorf("Short = %q, want 'Fetch a .gitignore template from GitHub'", cmd.Short)
	}
	wantLong := `Fetch and save a .gitignore template from the GitHub gitignore API.

Fetches the list of available templates, prompts the user to select
one (or uses --name), then writes the template content to a file.`
	if cmd.Long != wantLong {
		t.Errorf("Long = %q, want %q", cmd.Long, wantLong)
	}
	wantExample := `  gh ignore
  gh ignore --name Go
  gh ignore --name Python -o .gitignore`
	if cmd.Example != wantExample {
		t.Errorf("Example = %q, want %q", cmd.Example, wantExample)
	}
	if f := cmd.Flags().Lookup("name"); f == nil {
		t.Error("expected --name flag")
	} else if f.DefValue != "" {
		t.Errorf("--name default = %q, want ''", f.DefValue)
	}
	if f := cmd.Flags().Lookup("output"); f == nil {
		t.Error("expected --output flag")
	} else if f.DefValue != ".gitignore" {
		t.Errorf("--output default = %q, want '.gitignore'", f.DefValue)
	}
}

func TestFetchIgnore(t *testing.T) {
	listBody := `["Go","Python","Rust"]`
	detailBody := `{"name":"Go","source":"# Go gitignore\n\n# Binaries\n*.exe\n*.dll\n"}`

	tests := []struct {
		name    string
		key     string
		output  string
		mocks   []shared.MockResult
		wantErr string
		wantOut string
	}{
		{
			name:   "success with name",
			key:    "Go",
			output: "test-gitignore",
			mocks: []shared.MockResult{
				{Body: []byte(listBody)},
				{Body: []byte(detailBody)},
			},
			wantOut: "# Go gitignore\n\n# Binaries\n*.exe\n*.dll\n",
		},
		{
			name:   "fetch list error",
			key:    "Go",
			output: "test-gitignore",
			mocks: []shared.MockResult{
				{Err: errors.New("network error")},
			},
			wantErr: "error fetching templates",
		},
		{
			name:   "fetch detail error",
			key:    "Go",
			output: "test-gitignore",
			mocks: []shared.MockResult{
				{Body: []byte(listBody)},
				{Err: errors.New("network error")},
			},
			wantErr: "error fetching template",
		},
		{
			name:   "invalid list JSON",
			key:    "Go",
			output: "test-gitignore",
			mocks: []shared.MockResult{
				{Body: []byte("invalid json")},
			},
			wantErr: "error parsing response",
		},
		{
			name:   "invalid detail JSON",
			key:    "Go",
			output: "test-gitignore",
			mocks: []shared.MockResult{
				{Body: []byte(listBody)},
				{Body: []byte("invalid json")},
			},
			wantErr: "error parsing response",
		},
		{
			name:   "file create error",
			key:    "Go",
			output: "/nonexistent/deep/dir/gitignore",
			mocks: []shared.MockResult{
				{Body: []byte(listBody)},
				{Body: []byte(detailBody)},
			},
			wantErr: "error creating file",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			dir := t.TempDir()
			outPath := tt.output
			if !filepath.IsAbs(outPath) {
				outPath = filepath.Join(dir, outPath)
			}

			mock := shared.MockFetchSeq(tt.mocks...)
			err := fetchIgnore(tt.key, outPath, mock)

			if tt.wantErr != "" {
				if err == nil {
					t.Fatal("expected error, got nil")
				}
				if !strings.Contains(err.Error(), tt.wantErr) {
					t.Errorf("err = %q, want contains %q", err.Error(), tt.wantErr)
				}
				return
			}

			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}

			data, err := os.ReadFile(outPath)
			if err != nil {
				t.Fatalf("error reading output file: %v", err)
			}
			if string(data) != tt.wantOut {
				t.Errorf("file content = %q, want %q", string(data), tt.wantOut)
			}
		})
	}
}

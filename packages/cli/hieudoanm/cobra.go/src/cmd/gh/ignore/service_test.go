package ignore

import (
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/gh/shared"
)

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

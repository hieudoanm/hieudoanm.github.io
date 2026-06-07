package coc

import (
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/gh/shared"
)

func TestNewCocCmd_Structure(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "coc" {
		t.Errorf("Use = %q, want 'coc'", cmd.Use)
	}
	if cmd.Short != "Fetch a GitHub Code of Conduct" {
		t.Errorf("Short = %q, want 'Fetch a GitHub Code of Conduct'", cmd.Short)
	}
	wantLong := `Fetch and save a GitHub Code of Conduct to a file.

Fetches the list of available codes of conduct from the GitHub API,
prompts the user to select one (or uses --key), then writes the body
to a file.`
	if cmd.Long != wantLong {
		t.Errorf("Long = %q, want %q", cmd.Long, wantLong)
	}
	wantExample := `  gh coc
  gh coc --key citizen_code_of_conduct
  gh coc --key contributor_covenant -o COC.md`
	if cmd.Example != wantExample {
		t.Errorf("Example = %q, want %q", cmd.Example, wantExample)
	}
	if f := cmd.Flags().Lookup("key"); f == nil {
		t.Error("expected --key flag")
	} else if f.DefValue != "" {
		t.Errorf("--key default = %q, want ''", f.DefValue)
	}
	if f := cmd.Flags().Lookup("output"); f == nil {
		t.Error("expected --output flag")
	} else if f.DefValue != "CODE_OF_CONDUCT" {
		t.Errorf("--output default = %q, want 'CODE_OF_CONDUCT'", f.DefValue)
	}
}

func TestFetchCOC(t *testing.T) {
	listBody := `[{"key":"contributor_covenant","name":"Contributor Covenant","url":"https://","body":"# Code of Conduct\n\nBe nice."}]`
	detailBody := `{"key":"contributor_covenant","name":"Contributor Covenant","url":"https://","body":"# Code of Conduct\n\nBe nice."}`

	tests := []struct {
		name    string
		key     string
		output  string
		mocks   []shared.MockResult
		wantErr string
		wantOut string
	}{
		{
			name:   "success with key",
			key:    "contributor_covenant",
			output: "test-coc.md",
			mocks: []shared.MockResult{
				{Body: []byte(listBody)},
				{Body: []byte(detailBody)},
			},
			wantOut: "# Code of Conduct\n\nBe nice.",
		},
		{
			name:   "fetch list error",
			key:    "contributor_covenant",
			output: "test-coc.md",
			mocks: []shared.MockResult{
				{Err: errors.New("network error")},
			},
			wantErr: "error fetching codes of conduct",
		},
		{
			name:   "fetch detail error",
			key:    "contributor_covenant",
			output: "test-coc.md",
			mocks: []shared.MockResult{
				{Body: []byte(listBody)},
				{Err: errors.New("network error")},
			},
			wantErr: "error fetching code of conduct",
		},
		{
			name:   "invalid list JSON",
			key:    "contributor_covenant",
			output: "test-coc.md",
			mocks: []shared.MockResult{
				{Body: []byte("invalid json")},
			},
			wantErr: "error parsing response",
		},
		{
			name:   "invalid detail JSON",
			key:    "contributor_covenant",
			output: "test-coc.md",
			mocks: []shared.MockResult{
				{Body: []byte(listBody)},
				{Body: []byte("invalid json")},
			},
			wantErr: "error parsing response",
		},
		{
			name:   "file create error",
			key:    "contributor_covenant",
			output: "/nonexistent/deep/dir/coc.md",
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
			err := fetchCOC(tt.key, outPath, mock)

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

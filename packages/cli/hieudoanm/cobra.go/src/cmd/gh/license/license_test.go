package license

import (
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/gh/shared"
)

func TestNewLicenseCmd_Structure(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "license" {
		t.Errorf("Use = %q, want 'license'", cmd.Use)
	}
	if cmd.Short != "Fetch a license template from GitHub" {
		t.Errorf("Short = %q, want 'Fetch a license template from GitHub'", cmd.Short)
	}
	wantLong := `Fetch and save a license template from the GitHub licenses API.

Fetches the list of available licenses, prompts the user to select
one (or uses --spdx-id), then writes the license body to a file.`
	if cmd.Long != wantLong {
		t.Errorf("Long = %q, want %q", cmd.Long, wantLong)
	}
	wantExample := `  gh license
  gh license --spdx-id MIT
  gh license --spdx-id Apache-2.0 -o LICENSE.txt`
	if cmd.Example != wantExample {
		t.Errorf("Example = %q, want %q", cmd.Example, wantExample)
	}
	if f := cmd.Flags().Lookup("spdx-id"); f == nil {
		t.Error("expected --spdx-id flag")
	} else if f.DefValue != "" {
		t.Errorf("--spdx-id default = %q, want ''", f.DefValue)
	}
	if f := cmd.Flags().Lookup("output"); f == nil {
		t.Error("expected --output flag")
	} else if f.DefValue != "LICENSE" {
		t.Errorf("--output default = %q, want 'LICENSE'", f.DefValue)
	}
}

func TestFetchLicense(t *testing.T) {
	listBody := `[{"key":"mit","name":"MIT License","spdx_id":"MIT","url":"https://","body":"MIT License\n\nPermission is hereby granted..."}]`
	detailBody := `{"key":"mit","name":"MIT License","spdx_id":"MIT","url":"https://","body":"MIT License\n\nPermission is hereby granted..."}`

	tests := []struct {
		name    string
		spdxID  string
		output  string
		mocks   []shared.MockResult
		wantErr string
		wantOut string
	}{
		{
			name:   "success with spdx-id",
			spdxID: "MIT",
			output: "test-license",
			mocks: []shared.MockResult{
				{Body: []byte(listBody)},
				{Body: []byte(detailBody)},
			},
			wantOut: "MIT License\n\nPermission is hereby granted...",
		},
		{
			name:   "fetch list error",
			spdxID: "MIT",
			output: "test-license",
			mocks: []shared.MockResult{
				{Err: errors.New("network error")},
			},
			wantErr: "error fetching licenses",
		},
		{
			name:   "fetch detail error",
			spdxID: "MIT",
			output: "test-license",
			mocks: []shared.MockResult{
				{Body: []byte(listBody)},
				{Err: errors.New("network error")},
			},
			wantErr: "error fetching license",
		},
		{
			name:   "invalid list JSON",
			spdxID: "MIT",
			output: "test-license",
			mocks: []shared.MockResult{
				{Body: []byte("invalid json")},
			},
			wantErr: "error parsing response",
		},
		{
			name:   "invalid detail JSON",
			spdxID: "MIT",
			output: "test-license",
			mocks: []shared.MockResult{
				{Body: []byte(listBody)},
				{Body: []byte("invalid json")},
			},
			wantErr: "error parsing response",
		},
		{
			name:   "file create error",
			spdxID: "MIT",
			output: "/nonexistent/deep/dir/license",
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
			err := fetchLicense(tt.spdxID, outPath, mock)

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

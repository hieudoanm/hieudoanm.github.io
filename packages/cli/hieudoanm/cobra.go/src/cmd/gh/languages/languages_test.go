package languages

import (
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/gh/shared"
)

func TestNewLanguagesCmd_Structure(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "languages [--repo <owner/repo>]" {
		t.Errorf("Use = %q, want 'languages [--repo <owner/repo>]'", cmd.Use)
	}
	if cmd.Short != "Show repository language breakdown and generate SVG bar chart" {
		t.Errorf("Short = %q, want 'Show repository language breakdown and generate SVG bar chart'", cmd.Short)
	}
	wantLong := `Fetches language statistics for a GitHub repository and generates
an SVG bar chart showing the breakdown.`
	if cmd.Long != wantLong {
		t.Errorf("Long = %q, want %q", cmd.Long, wantLong)
	}
	wantExample := `  gh languages --repo hieudoanm/hieudoanm.github.io
  gh languages --repo hieudoanm/hieudoanm --output lang.svg`
	if cmd.Example != wantExample {
		t.Errorf("Example = %q, want %q", cmd.Example, wantExample)
	}
	if f := cmd.Flags().Lookup("repo"); f == nil {
		t.Error("expected --repo flag")
	} else if f.DefValue != "" {
		t.Errorf("--repo default = %q, want ''", f.DefValue)
	}
	if f := cmd.Flags().Lookup("output"); f == nil {
		t.Error("expected --output flag")
	} else if f.DefValue != "languages.svg" {
		t.Errorf("--output default = %q, want 'languages.svg'", f.DefValue)
	}
}

func TestFetchLanguages(t *testing.T) {
	langsBody := `{"Go":500,"TypeScript":300,"Python":200}`

	tests := []struct {
		name    string
		repo    string
		output  string
		mocks   []shared.MockResult
		wantErr string
		wantOut string
	}{
		{
			name:   "success",
			repo:   "owner/repo",
			output: "langs.svg",
			mocks: []shared.MockResult{
				{Body: []byte(langsBody)},
			},
		},
		{
			name:    "invalid repo format",
			repo:    "invalid",
			output:  "langs.svg",
			wantErr: "repo must be in format owner/repo",
		},
		{
			name:   "fetch error",
			repo:   "owner/repo",
			output: "langs.svg",
			mocks: []shared.MockResult{
				{Err: errors.New("network error")},
			},
			wantErr: "error fetching languages",
		},
		{
			name:   "invalid JSON",
			repo:   "owner/repo",
			output: "langs.svg",
			mocks: []shared.MockResult{
				{Body: []byte("invalid json")},
			},
			wantErr: "error parsing response",
		},
		{
			name:   "empty languages",
			repo:   "owner/repo",
			output: "langs.svg",
			mocks: []shared.MockResult{
				{Body: []byte(`{}`)},
			},
		},
		{
			name:   "file write error",
			repo:   "owner/repo",
			output: "/nonexistent/deep/dir/langs.svg",
			mocks: []shared.MockResult{
				{Body: []byte(langsBody)},
			},
			wantErr: "error writing SVG",
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
			err := fetchLanguages(tt.repo, outPath, mock)

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

			if tt.wantOut != "" {
				data, err := os.ReadFile(outPath)
				if err != nil {
					t.Fatalf("error reading output file: %v", err)
				}
				if string(data) != tt.wantOut {
					t.Errorf("file content = %q, want %q", string(data), tt.wantOut)
				}
			}
		})
	}
}

func TestFetchLanguages_generatedSVG(t *testing.T) {
	mock := shared.MockFetchSeq(shared.MockResult{Body: []byte(`{"Go":500,"TypeScript":300,"Python":200}`)})
	dir := t.TempDir()
	outPath := filepath.Join(dir, "langs.svg")

	if err := fetchLanguages("owner/repo", outPath, mock); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	data, err := os.ReadFile(outPath)
	if err != nil {
		t.Fatalf("error reading output file: %v", err)
	}

	svg := string(data)
	if !strings.Contains(svg, "Go") {
		t.Error("expected SVG to contain Go")
	}
	if !strings.Contains(svg, "TypeScript") {
		t.Error("expected SVG to contain TypeScript")
	}
	if !strings.Contains(svg, "Python") {
		t.Error("expected SVG to contain Python")
	}
}

func TestGenerateLanguagesSVG_multipleLanguages(t *testing.T) {
	langs := map[string]int{
		"Go":     500,
		"Python": 300,
		"Rust":   200,
	}
	svg := GenerateLanguagesSVG(langs)

	if !strings.HasPrefix(svg, `<svg xmlns="http://www.w3.org/2000/svg"`) {
		t.Error("expected SVG namespace prefix")
	}
	if !strings.HasSuffix(strings.TrimSpace(svg), "</svg>") {
		t.Error("expected SVG closing tag")
	}
	if !strings.Contains(svg, "Go") {
		t.Error("expected SVG to contain Go")
	}
	if !strings.Contains(svg, "Python") {
		t.Error("expected SVG to contain Python")
	}
	if !strings.Contains(svg, "Rust") {
		t.Error("expected SVG to contain Rust")
	}
	if !strings.Contains(svg, "%") {
		t.Error("expected SVG to contain percentage values")
	}
	if !strings.Contains(svg, `fill="#00ADD8"`) {
		t.Error("expected Go color in SVG")
	}
}

func TestGenerateLanguagesSVG_empty(t *testing.T) {
	svg := GenerateLanguagesSVG(map[string]int{})

	if !strings.HasPrefix(svg, `<svg`) {
		t.Error("expected SVG output")
	}
	if !strings.HasSuffix(strings.TrimSpace(svg), "</svg>") {
		t.Error("expected SVG closing tag")
	}
}

func TestGenerateLanguagesSVG_singleLanguage(t *testing.T) {
	langs := map[string]int{
		"Go": 1000,
	}
	svg := GenerateLanguagesSVG(langs)

	if !strings.Contains(svg, "Go") {
		t.Error("expected SVG to contain language name")
	}
	if !strings.Contains(svg, "100.0%") {
		t.Error("expected single language to show 100.0%")
	}
}

func TestGenerateLanguagesSVG_unknownLanguageColor(t *testing.T) {
	langs := map[string]int{
		"FooLang": 500,
	}
	svg := GenerateLanguagesSVG(langs)

	if !strings.Contains(svg, "FooLang") {
		t.Error("expected SVG to contain language name")
	}
	if !strings.Contains(svg, `fill="#6e7681"`) {
		t.Error("expected unknown language to use default color")
	}
}

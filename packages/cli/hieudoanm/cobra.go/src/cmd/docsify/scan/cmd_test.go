package scan

import (
	"os"
	"path/filepath"
	"testing"
)

func TestParseExcludeList(t *testing.T) {
	tests := []struct {
		input    string
		expected map[string]bool
	}{
		{
			input:    ".git,node_modules,vendor",
			expected: map[string]bool{".git": true, "node_modules": true, "vendor": true},
		},
		{
			input:    "",
			expected: map[string]bool{},
		},
		{
			input:    "a",
			expected: map[string]bool{"a": true},
		},
	}
	for _, tc := range tests {
		got := parseExcludeList(tc.input)
		if len(got) != len(tc.expected) {
			t.Errorf("parseExcludeList(%q) = %v (len=%d), want %v (len=%d)",
				tc.input, got, len(got), tc.expected, len(tc.expected))
		}
		for k := range tc.expected {
			if !got[k] {
				t.Errorf("parseExcludeList(%q) missing key %q", tc.input, k)
			}
		}
	}
}

func TestParseExcludeList_trimsSpaces(t *testing.T) {
	got := parseExcludeList("  a , b , c  ")
	expected := map[string]bool{"a": true, "b": true, "c": true}
	if len(got) != len(expected) {
		t.Errorf("expected %d entries, got %d", len(expected), len(got))
	}
	for k := range expected {
		if !got[k] {
			t.Errorf("missing key %q", k)
		}
	}
}

func TestParseExcludeList_skipsEmptyParts(t *testing.T) {
	got := parseExcludeList("a,,b,")
	expected := map[string]bool{"a": true, "b": true}
	if len(got) != len(expected) {
		t.Errorf("expected %d entries, got %d", len(expected), len(got))
	}
}

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "scan" {
		t.Errorf("Use = %q, want %q", cmd.Use, "scan")
	}
	if cmd.Short != "Scan a codebase and generate a GraphML file" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Scan a codebase and generate a GraphML file")
	}
	if cmd.Example == "" {
		t.Error("Example should not be empty")
	}
	if cmd.RunE == nil {
		t.Error("RunE should not be nil")
	}
	for _, name := range []string{"dir", "out", "exclude", "verbose"} {
		if cmd.Flags().Lookup(name) == nil {
			t.Errorf("expected --%s flag", name)
		}
	}
}

func TestNewCmd_RunE_Verbose(t *testing.T) {
	dir := t.TempDir()
	os.WriteFile(filepath.Join(dir, "main.go"), []byte("package main\nfunc main() {}"), 0644)
	out := filepath.Join(dir, "out.graphml")

	cmd := NewCmd()
	cmd.SetArgs([]string{"--dir", dir, "--out", out, "--verbose"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestNewCmd_RunE_Error(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--out", filepath.Join(t.TempDir(), "nonexistent", "out.graphml")})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error for bad output path")
	}
}

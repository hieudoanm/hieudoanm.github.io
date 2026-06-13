package docsify

import (
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

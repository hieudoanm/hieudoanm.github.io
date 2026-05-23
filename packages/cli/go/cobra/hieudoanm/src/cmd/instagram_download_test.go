package cmd

import (
	"testing"
)

func TestExtractShortcode(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"https://www.instagram.com/p/CLI7qRNhI_o/", "CLI7qRNhI_o"},
		{"https://www.instagram.com/reels/CLI7qRNhI_o/?img_index=1", "CLI7qRNhI_o"},
		{"https://www.instagram.com/tv/CLI7qRNhI_o/", "CLI7qRNhI_o"},
		{"CLI7qRNhI_o", "CLI7qRNhI_o"},
	}

	for _, tt := range tests {
		actual, err := extractShortcode(tt.input)
		if err != nil {
			t.Errorf("input %s: unexpected error: %v", tt.input, err)
			continue
		}
		if actual != tt.expected {
			t.Errorf("input %s: expected %s, got %s", tt.input, tt.expected, actual)
		}
	}
}

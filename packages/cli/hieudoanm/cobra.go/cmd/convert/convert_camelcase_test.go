package convert

import (
	"testing"
)

func TestToCamelCase(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"hello world", "helloWorld"},
		{"hello-world", "helloWorld"},
		{"hello_world", "helloWorld"},
		{"Hello World", "helloWorld"},
		{"hello", "hello"},
		{"", ""},
	}
	for _, tt := range tests {
		if got := ToCamelCase(tt.input); got != tt.expected {
			t.Errorf("ToCamelCase(%q) = %q, want %q", tt.input, got, tt.expected)
		}
	}
}

func TestToPascalCase(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"hello world", "HelloWorld"},
		{"hello-world", "HelloWorld"},
		{"hello_world", "HelloWorld"},
		{"hello", "Hello"},
		{"", ""},
	}
	for _, tt := range tests {
		if got := ToPascalCase(tt.input); got != tt.expected {
			t.Errorf("ToPascalCase(%q) = %q, want %q", tt.input, got, tt.expected)
		}
	}
}

func TestSlug(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"Hello World!", "hello-world"},
		{"  spaces  ", "spaces"},
		{"already-a-slug", "already-a-slug"},
		{"Special & Characters!", "special-characters"},
	}
	for _, tt := range tests {
		if got := Slug(tt.input); got != tt.expected {
			t.Errorf("Slug(%q) = %q, want %q", tt.input, got, tt.expected)
		}
	}
}

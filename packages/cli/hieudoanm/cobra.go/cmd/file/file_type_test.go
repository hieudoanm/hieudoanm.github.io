package file

import (
	"testing"
)

func TestDetectMIME(t *testing.T) {
	tests := []struct {
		path string
		want string
	}{
		{"file.txt", "text/plain"},
		{"file.md", "text/markdown"},
		{"file.html", "text/html"},
		{"file.css", "text/css"},
		{"file.js", "text/javascript"},
		{"file.json", "application/json"},
		{"file.xml", "application/xml"},
		{"file.yml", "application/x-yaml"},
		{"file.yaml", "application/x-yaml"},
		{"file.go", "text/x-go"},
		{"file.py", "text/x-python"},
		{"file.rs", "text/x-rust"},
		{"file.jpg", "image/jpeg"},
		{"file.jpeg", "image/jpeg"},
		{"file.png", "image/png"},
		{"file.pdf", "application/pdf"},
		{"file.unknown", "application/octet-stream"},
		{"file", "application/octet-stream"},
	}
	for _, tt := range tests {
		t.Run(tt.path, func(t *testing.T) {
			if got := detectMIME(tt.path); got != tt.want {
				t.Errorf("detectMIME(%q) = %q, want %q", tt.path, got, tt.want)
			}
		})
	}
}

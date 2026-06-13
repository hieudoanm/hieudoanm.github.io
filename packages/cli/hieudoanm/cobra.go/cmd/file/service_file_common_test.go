package file

import (
	"os"
	"testing"
)

func TestParseMode755(t *testing.T) {
	mode, err := parseMode("755")
	if err != nil {
		t.Fatalf("parseMode(\"755\") unexpected error: %v", err)
	}
	if mode != os.FileMode(0755) {
		t.Errorf("got %o, want %o", mode, 0755)
	}
}

func TestParseMode644(t *testing.T) {
	mode, err := parseMode("644")
	if err != nil {
		t.Fatalf("parseMode(\"644\") unexpected error: %v", err)
	}
	if mode != os.FileMode(0644) {
		t.Errorf("got %o, want %o", mode, 0644)
	}
}

func TestParseMode600(t *testing.T) {
	mode, err := parseMode("600")
	if err != nil {
		t.Fatalf("parseMode(\"600\") unexpected error: %v", err)
	}
	if mode != os.FileMode(0600) {
		t.Errorf("got %o, want %o", mode, 0600)
	}
}

func TestParseMode777(t *testing.T) {
	mode, err := parseMode("777")
	if err != nil {
		t.Fatalf("parseMode(\"777\") unexpected error: %v", err)
	}
	if mode != os.FileMode(0777) {
		t.Errorf("got %o, want %o", mode, 0777)
	}
}

func TestParseModeInvalidString(t *testing.T) {
	_, err := parseMode("abc")
	if err == nil {
		t.Fatal("parseMode(\"abc\") expected error")
	}
}

func TestParseModeInvalidOctal(t *testing.T) {
	_, err := parseMode("888")
	if err == nil {
		t.Fatal("parseMode(\"888\") expected error")
	}
}

func TestParseModeEmptyString(t *testing.T) {
	_, err := parseMode("")
	if err == nil {
		t.Fatal("parseMode(\"\") expected error")
	}
}

func TestFormatSizeZero(t *testing.T) {
	if got := formatSize(0); got != "0 B" {
		t.Errorf("formatSize(0) = %q, want %q", got, "0 B")
	}
}

func TestFormatSizeBytes(t *testing.T) {
	if got := formatSize(100); got != "100 B" {
		t.Errorf("formatSize(100) = %q, want %q", got, "100 B")
	}
	if got := formatSize(200); got != "200 B" {
		t.Errorf("formatSize(200) = %q, want %q", got, "200 B")
	}
}

func TestFormatSizeKB(t *testing.T) {
	if got := formatSize(1024); got != "1.0 KB" {
		t.Errorf("formatSize(1024) = %q, want %q", got, "1.0 KB")
	}
	if got := formatSize(1536); got != "1.5 KB" {
		t.Errorf("formatSize(1536) = %q, want %q", got, "1.5 KB")
	}
	if got := formatSize(2048); got != "2.0 KB" {
		t.Errorf("formatSize(2048) = %q, want %q", got, "2.0 KB")
	}
}

func TestFormatSizeMB(t *testing.T) {
	if got := formatSize(1048576); got != "1.0 MB" {
		t.Errorf("formatSize(1048576) = %q, want %q", got, "1.0 MB")
	}
}

func TestFormatSizeGB(t *testing.T) {
	if got := formatSize(1073741824); got != "1.0 GB" {
		t.Errorf("formatSize(1073741824) = %q, want %q", got, "1.0 GB")
	}
}

func TestFormatSizeTB(t *testing.T) {
	if got := formatSize(1099511627776); got != "1.0 TB" {
		t.Errorf("formatSize(1099511627776) = %q, want %q", got, "1.0 TB")
	}
}

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

func TestSplitLines(t *testing.T) {
	tests := []struct {
		input string
		lines int
		last  string
	}{
		{"hello\nworld\n", 3, ""},
		{"hello\nworld", 2, "world"},
		{"hello\nworld\n\n", 4, ""},
		{"", 1, ""},
		{"single", 1, "single"},
		{"a\nb\nc\nd\n", 5, ""},
		{"\n", 2, ""},
	}
	for _, tc := range tests {
		got := splitLines(tc.input)
		if len(got) != tc.lines {
			t.Errorf("splitLines(%q) got %d lines, want %d", tc.input, len(got), tc.lines)
		}
		if len(got) > 0 && got[len(got)-1] != tc.last {
			t.Errorf("splitLines(%q) last = %q, want %q", tc.input, got[len(got)-1], tc.last)
		}
	}
}

func TestSplitLinesRoundtrip(t *testing.T) {
	input := "line1\nline2\nline3"
	lines := splitLines(input)
	got := joinLines(lines)
	if got != input {
		t.Errorf("roundtrip: %q != %q", got, input)
	}
}

func TestJoinLines(t *testing.T) {
	tests := []struct {
		input []string
		want  string
	}{
		{[]string{"a", "b", "c"}, "a\nb\nc"},
		{[]string{}, ""},
		{[]string{"single"}, "single"},
		{[]string{"a", "", "c"}, "a\n\nc"},
	}
	for _, tc := range tests {
		got := joinLines(tc.input)
		if got != tc.want {
			t.Errorf("joinLines(%v) = %q, want %q", tc.input, got, tc.want)
		}
	}
}

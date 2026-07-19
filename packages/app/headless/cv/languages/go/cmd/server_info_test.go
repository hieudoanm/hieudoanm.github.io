package cmd

import (
	"bytes"
	"regexp"
	"strings"
	"testing"
	"unicode/utf8"
)

var ansiPattern = regexp.MustCompile(`\x1b\]8;;[^\x1b]*\x1b\\|\x1b]8;;\x1b\\`)

func TestPrintServerBoxIncludesLocalURL(t *testing.T) {
	var buf bytes.Buffer
	printServerBox(&buf, "8080")

	got := buf.String()
	for _, want := range []string{"╭", "╯", "CV Server", "http://localhost:8080", "Local"} {
		if !strings.Contains(got, want) {
			t.Errorf("output missing %q:\n%s", want, got)
		}
	}
}

func TestPrintServerBoxNonTTYHasNoEscapeSequences(t *testing.T) {
	var buf bytes.Buffer
	printServerBox(&buf, "8080")

	if strings.Contains(buf.String(), "\x1b") {
		t.Errorf("non-TTY output should not contain ANSI escapes:\n%q", buf.String())
	}
}

func TestRenderServerBoxBordersAlign(t *testing.T) {
	links := []serverLink{
		{"Local", "http://localhost:8080"},
		{"Network", "http://192.168.1.42:8080"},
	}

	for _, useANSI := range []bool{false, true} {
		lines := strings.Split(strings.TrimRight(renderServerBox(links, useANSI), "\n"), "\n")
		want := utf8.RuneCountInString(ansiPattern.ReplaceAllString(lines[0], ""))
		for i, line := range lines {
			visible := ansiPattern.ReplaceAllString(line, "")
			if got := utf8.RuneCountInString(visible); got != want {
				t.Errorf("useANSI=%v line %d width = %d, want %d: %q", useANSI, i, got, want, line)
			}
		}
	}
}

func TestHyperlinkWrapsTextInOSC8(t *testing.T) {
	got := hyperlink("http://localhost:8080", "http://localhost:8080")
	want := "\x1b]8;;http://localhost:8080\x1b\\http://localhost:8080\x1b]8;;\x1b\\"
	if got != want {
		t.Errorf("hyperlink = %q, want %q", got, want)
	}
}

func TestPadRight(t *testing.T) {
	if got := padRight("ab", 4); got != "ab  " {
		t.Errorf("padRight = %q, want %q", got, "ab  ")
	}
	if got := padRight("abcd", 2); got != "abcd" {
		t.Errorf("padRight should not truncate, got %q", got)
	}
}

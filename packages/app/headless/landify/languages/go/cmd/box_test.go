package cmd

import (
	"regexp"
	"strings"
	"testing"
	"unicode/utf8"
)

var ansiPattern = regexp.MustCompile(`\x1b\]8;;[^\x1b]*\x1b\\|\x1b]8;;\x1b\\`)

func TestRenderServerBoxBordersAlign(t *testing.T) {
	links := []serverLink{
		{"Local", "http://localhost:8080"},
		{"Network", "http://192.168.1.42:8080"},
		{"Docs", "http://localhost:8080/docs"},
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

func TestServeLinksLocalAndDocsOnlyWhenNotExposed(t *testing.T) {
	links := serveLinks("http://127.0.0.1:8080", false)

	if len(links) != 2 {
		t.Fatalf("links = %d, want Local and Docs only when not exposed", len(links))
	}
	if links[0].label != "Local" || links[0].url != "http://localhost:8080" {
		t.Errorf("Local = %+v, want http://localhost:8080", links[0])
	}
	if links[1].label != "Docs" || links[1].url != "http://localhost:8080/api/v1/docs" {
		t.Errorf("Docs = %+v, want http://localhost:8080/api/v1/docs", links[1])
	}
}

func TestPreviewLinksHaveNoDocsRow(t *testing.T) {
	links := previewLinks("http://127.0.0.1:8080", false)

	if len(links) != 1 {
		t.Fatalf("links = %d, want only the Local row for the static preview", len(links))
	}
	if links[0].label != "Local" || links[0].url != "http://localhost:8080" {
		t.Errorf("Local = %+v, want http://localhost:8080", links[0])
	}
}

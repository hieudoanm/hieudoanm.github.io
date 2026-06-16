package web

import (
	"strings"
	"testing"
)

func Test_extractReadable_returnsContent(t *testing.T) {
	html := `<html><head><title>Test Article</title></head><body><article><h1>Test Article</h1><p>This is a paragraph with enough content to pass the readability check. It needs to be at least fifty characters long so that the readability library considers it meaningful content.</p></article></body></html>`
	title, content, ok, err := extractReadable(html, "https://example.com")
	if err != nil {
		t.Fatal(err)
	}
	if !ok {
		t.Fatal("expected readable content")
	}
	if title != "Test Article" {
		t.Errorf("expected title 'Test Article', got %q", title)
	}
	if !strings.Contains(content, "paragraph") {
		t.Errorf("expected content to contain 'paragraph', got %q", content)
	}
}

func Test_extractReadable_filtersShortContent(t *testing.T) {
	html := `<html><body><p>Short</p></body></html>`
	_, _, ok, err := extractReadable(html, "https://example.com")
	if err != nil {
		t.Fatal(err)
	}
	if ok {
		t.Fatal("expected ok=false for short content")
	}
}

func Test_extractReadable_noTitle(t *testing.T) {
	html := `<html><body><p>` + strings.Repeat("long content for readability ", 20) + `</p></body></html>`
	title, _, ok, err := extractReadable(html, "https://example.com")
	if err != nil {
		t.Fatal(err)
	}
	if !ok {
		t.Fatal("expected ok=true for long content")
	}
	if title != "" {
		t.Fatal("expected empty title")
	}
}

func Test_extractReadable_invalidHtml(t *testing.T) {
	_, _, ok, err := extractReadable("not valid html", "https://example.com")
	if err != nil {
		t.Fatal(err)
	}
	if ok {
		t.Fatal("expected ok=false for invalid html")
	}
}

func Test_convertToMarkdown(t *testing.T) {
	html := "<h1>Hello</h1><p>World</p>"
	md, err := convertToMarkdown(html)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(md, "Hello") || !strings.Contains(md, "World") {
		t.Errorf("expected markdown to contain Hello and World, got %q", md)
	}
}

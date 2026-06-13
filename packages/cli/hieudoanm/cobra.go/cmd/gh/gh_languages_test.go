package gh

import (
	"strings"
	"testing"
)

func TestGenerateLanguagesSVG_multipleLanguages(t *testing.T) {
	langs := map[string]int{
		"Go":     500,
		"Python": 300,
		"Rust":   200,
	}
	svg := generateLanguagesSVG(langs)

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
	svg := generateLanguagesSVG(map[string]int{})

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
	svg := generateLanguagesSVG(langs)

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
	svg := generateLanguagesSVG(langs)

	if !strings.Contains(svg, "FooLang") {
		t.Error("expected SVG to contain language name")
	}
	if !strings.Contains(svg, "fill=\"#6e7681\"") {
		t.Error("expected unknown language to use default color")
	}
}

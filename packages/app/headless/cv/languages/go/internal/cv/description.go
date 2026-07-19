package cv

import (
	"html"
	"strings"
	"text/template"
)

// TemplateFuncs returns the helper functions available to CV templates.
func TemplateFuncs() template.FuncMap {
	return template.FuncMap{"description": FormatDescription}
}

// FormatDescription renders a YAML description as HTML-safe text that keeps
// line breaks. Templates render descriptions inside a single paragraph, so
// newlines become <br> and bullet lines ("- " or "* ") become "• " markers
// rather than block-level <ul>/<li> elements that would break the paragraph.
func FormatDescription(text string) string {
	lines := strings.Split(strings.TrimSpace(text), "\n")

	rendered := make([]string, 0, len(lines))
	for _, line := range lines {
		line = strings.TrimSpace(line)
		switch {
		case line == "":
			rendered = append(rendered, "")
		case strings.HasPrefix(line, "- "), strings.HasPrefix(line, "* "):
			rendered = append(rendered, "• "+html.EscapeString(strings.TrimSpace(line[2:])))
		default:
			rendered = append(rendered, html.EscapeString(line))
		}
	}

	return strings.Join(compact(rendered), "<br>")
}

// compact trims leading and trailing blank lines and collapses runs of blank
// lines into a single blank line.
func compact(lines []string) []string {
	for len(lines) > 0 && lines[0] == "" {
		lines = lines[1:]
	}
	for len(lines) > 0 && lines[len(lines)-1] == "" {
		lines = lines[:len(lines)-1]
	}

	out := make([]string, 0, len(lines))
	for _, line := range lines {
		if line == "" && len(out) > 0 && out[len(out)-1] == "" {
			continue
		}
		out = append(out, line)
	}
	return out
}

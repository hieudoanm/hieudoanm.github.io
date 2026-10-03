package landify

import (
	"bytes"
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"landify/static"
)

// themeSlot marks where the :root custom properties are spliced in. It is
// static text so html/template leaves it untouched inside the <style> element
// (html/template's CSS value filter would otherwise mangle a raw block).
const themeSlot = "@LANDIFY_THEME@"

// Render returns the landing page HTML for cfg. The page type (cfg.Type)
// selects which embedded template is used; unknown types fall back to
// product so hand-built configs still render.
func Render(cfg *Config) ([]byte, error) {
	kind := NormalizeType(cfg.Type)
	if !isKnownType(kind) {
		kind = "product"
	}
	tmpl, err := template.New("page").ParseFS(static.FS, "templates/*.tmpl", "partials/*.tmpl")
	if err != nil {
		return nil, fmt.Errorf("parse templates: %w", err)
	}
	page := tmpl.Lookup("template-" + kind + ".tmpl")
	if page == nil {
		return nil, fmt.Errorf("no template for type %q", kind)
	}
	var buf bytes.Buffer
	if err := page.Execute(&buf, cfg); err != nil {
		return nil, fmt.Errorf("render %s template: %w", kind, err)
	}
	tokens, err := Tokens(cfg.Theme)
	if err != nil {
		return nil, fmt.Errorf("theme: %w", err)
	}
	return bytes.ReplaceAll(buf.Bytes(), []byte(themeSlot), []byte(themeCSS(tokens))), nil
}

// BuildResult reports what a build wrote, so a caller can tell the user which
// files changed without re-reading the config.
type BuildResult struct {
	Page string // the rendered HTML
	Card string // the social card SVG, empty when the config has no site.og
}

// BuildFile loads path, validates it, renders the landing page, and writes it
// to output (creating parent directories as needed). A config with a site.og
// block also gets its 1200 × 630 card written beside the page. A non-empty
// themeName overrides the YAML's theme: section with a built-in preset.
func BuildFile(path, output, themeName string) (*BuildResult, error) {
	cfg, err := LoadFile(path)
	if err != nil {
		return nil, err
	}
	if themeName != "" {
		theme, ok := ThemeByName(themeName)
		if !ok {
			available := strings.Join(ThemeNames(), ", ")
			return nil, fmt.Errorf("unknown theme %q (available: %s)", themeName, available)
		}
		cfg.Theme = theme
	}
	if errs := Errors(cfg); len(errs) > 0 {
		return nil, fmt.Errorf("%s is invalid:\n  - %s", path, strings.Join(errs, "\n  - "))
	}
	html, err := Render(cfg)
	if err != nil {
		return nil, err
	}
	dir := filepath.Dir(output)
	if dir != "." && dir != "" {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			return nil, fmt.Errorf("create %s: %w", dir, err)
		}
	}
	if err := os.WriteFile(output, html, 0o644); err != nil {
		return nil, fmt.Errorf("write %s: %w", output, err)
	}
	result := &BuildResult{Page: output}
	if cfg.Site.OpenGraph.Configured() {
		if err := writeOGCard(cfg, output); err != nil {
			return nil, err
		}
		result.Card = OGCardPath(output)
	}
	return result, nil
}

// writeOGCard renders the social card beside the page. The SVG is the source of
// truth; site.og.image is expected to point at a PNG converted from it.
func writeOGCard(cfg *Config, output string) error {
	card, err := RenderOG(cfg)
	if err != nil {
		return err
	}
	path := OGCardPath(output)
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return fmt.Errorf("create %s: %w", filepath.Dir(path), err)
	}
	if err := os.WriteFile(path, card, 0o644); err != nil {
		return fmt.Errorf("write %s: %w", path, err)
	}
	return nil
}

// themeCSS renders the :root declarations as "--name: value;" lines in sorted
// token order so output is stable across runs.
func themeCSS(tokens map[string]string) string {
	keys := make([]string, 0, len(tokens))
	for k := range tokens {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	var b strings.Builder
	for _, k := range keys {
		fmt.Fprintf(&b, "        --%s: %s;\n", k, tokens[k])
	}
	return b.String()
}

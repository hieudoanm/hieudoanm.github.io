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

// Render returns the landing page HTML for cfg.
func Render(cfg *Config) ([]byte, error) {
	tmplText, err := static.FS.ReadFile("template.tmpl")
	if err != nil {
		return nil, fmt.Errorf("read template: %w", err)
	}
	tmpl, err := template.New("page").Parse(string(tmplText))
	if err != nil {
		return nil, fmt.Errorf("parse template: %w", err)
	}
	var buf bytes.Buffer
	if err := tmpl.Execute(&buf, cfg); err != nil {
		return nil, fmt.Errorf("render template: %w", err)
	}
	tokens, err := Tokens(cfg.Theme)
	if err != nil {
		return nil, fmt.Errorf("theme: %w", err)
	}
	return bytes.ReplaceAll(buf.Bytes(), []byte(themeSlot), []byte(themeCSS(tokens))), nil
}

// BuildFile loads path, validates it, renders the landing page, and writes it
// to output (creating parent directories as needed). A non-empty themeName
// overrides the YAML's theme: section with a built-in preset.
func BuildFile(path, output, themeName string) error {
	cfg, err := LoadFile(path)
	if err != nil {
		return err
	}
	if themeName != "" {
		theme, ok := ThemeByName(themeName)
		if !ok {
			available := strings.Join(ThemeNames(), ", ")
			return fmt.Errorf("unknown theme %q (available: %s)", themeName, available)
		}
		cfg.Theme = theme
	}
	if errs := Errors(cfg); len(errs) > 0 {
		return fmt.Errorf("%s is invalid:\n  - %s", path, strings.Join(errs, "\n  - "))
	}
	html, err := Render(cfg)
	if err != nil {
		return err
	}
	dir := filepath.Dir(output)
	if dir != "." && dir != "" {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			return fmt.Errorf("create %s: %w", dir, err)
		}
	}
	if err := os.WriteFile(output, html, 0o644); err != nil {
		return fmt.Errorf("write %s: %w", output, err)
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

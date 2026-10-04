// Package theme provides the HTML template and static assets pagify renders
// every site with. Assets are embedded into the binary, so building a site
// needs no Node.js, no network and no files beside the executable.
package theme

import (
	"bytes"
	"embed"
	"fmt"
	"html/template"
	"io/fs"
)

//go:embed default/template.html
var templateSource embed.FS

//go:embed default/styles.css default/script.js default/search.js default/favicon.svg
var assetSource embed.FS

// AssetDir is the output-relative directory theme assets are written to. The
// templates reference the same path, so the two cannot drift apart.
const AssetDir = "assets"

// Theme renders pages with one template and a set of assets.
type Theme struct {
	templates *template.Template
	assets    fs.FS
}

// Default returns the theme pagify ships with.
func Default() (*Theme, error) {
	source, err := fs.ReadFile(templateSource, "default/template.html")
	if err != nil {
		return nil, fmt.Errorf("read embedded template: %w", err)
	}
	templates, err := template.New("page").Parse(string(source))
	if err != nil {
		return nil, fmt.Errorf("parse embedded template: %w", err)
	}

	assets, err := fs.Sub(assetSource, "default")
	if err != nil {
		return nil, fmt.Errorf("open embedded assets: %w", err)
	}
	return &Theme{templates: templates, assets: assets}, nil
}

// Execute renders the "page" template with data.
func (t *Theme) Execute(data any) ([]byte, error) {
	var out bytes.Buffer
	if err := t.templates.ExecuteTemplate(&out, "page", data); err != nil {
		return nil, fmt.Errorf("render page template: %w", err)
	}
	return out.Bytes(), nil
}

// Assets returns the theme's asset files, already rooted so each file sits
// directly inside AssetDir once copied.
func (t *Theme) Assets() fs.FS {
	return t.assets
}

// Package build turns a directory of Markdown into a deployable static site:
// it renders every page through the theme template, writes the navigation,
// copies assets and emits a search index.
package build

import (
	"fmt"
	"os"
	"path/filepath"

	"pagify/internal/markdown"
	"pagify/internal/site"
	"pagify/internal/theme"
)

// Options configures one build.
type Options struct {
	// ContentDir is the directory holding the Markdown to publish.
	ContentDir string
	// OutputDir is the directory the built site is written to. It is replaced
	// wholesale, so a build never leaves stale pages behind.
	OutputDir string
}

// Result reports what a build produced, for the CLI summary line.
type Result struct {
	// Pages is the number of HTML pages written.
	Pages int
	// Assets is the number of non-Markdown files copied.
	Assets int
}

// Build renders the site described by opts. Config is loaded first because the
// base path it may declare changes the URLs every page is published at.
func Build(opts Options) (Result, error) {
	content, err := site.Discover(opts.ContentDir)
	if err != nil {
		return Result{}, fmt.Errorf("discover content: %w", err)
	}
	config, err := LoadConfig(opts.ContentDir, content.IndexFrontmatter)
	if err != nil {
		return Result{}, err
	}
	selected, err := theme.Default()
	if err != nil {
		return Result{}, err
	}
	if err := clearOutput(opts.OutputDir); err != nil {
		return Result{}, err
	}

	resolver := site.LinkResolverFor(content.Pages, content.Assets, config.prefix)
	pages, err := renderPages(content.Pages, markdown.NewRenderer(), resolver)
	if err != nil {
		return Result{}, err
	}
	if err := writePages(opts.OutputDir, selected, config, pages); err != nil {
		return Result{}, err
	}
	index, err := writeSearchIndex(opts.OutputDir, config, pages)
	if err != nil {
		return Result{}, err
	}
	assets, err := writeAssets(opts.OutputDir, selected, content.Assets)
	if err != nil {
		return Result{}, err
	}
	return Result{Pages: len(pages), Assets: assets + index}, nil
}

// clearOutput removes a previous build so deleted pages do not survive.
func clearOutput(outputDir string) error {
	if err := os.RemoveAll(outputDir); err != nil {
		return fmt.Errorf("clear output directory %s: %w", outputDir, err)
	}
	return os.MkdirAll(outputDir, 0o755)
}

// renderPages converts every page's Markdown to HTML, filling in Body and
// Outline while leaving the rest of the page untouched.
func renderPages(pages site.Pages, renderer *markdown.Renderer, resolver site.ResolverFor) (site.Pages, error) {
	for _, page := range pages {
		document, err := renderer.Render(page.Content, resolver(page.Dir))
		if err != nil {
			return nil, fmt.Errorf("render %s: %w", page.Source, err)
		}
		page.HTML = string(document.HTML)
		page.Outline = document.Outline
		page.AdoptHeadingTitle(document.Title)
	}
	return pages, nil
}

// writeFile writes data to path relative to outputDir, creating parents.
func writeFile(outputDir, name string, data []byte) error {
	target := filepath.Join(outputDir, filepath.FromSlash(name))
	if err := os.MkdirAll(filepath.Dir(target), 0o755); err != nil {
		return fmt.Errorf("create directory for %s: %w", name, err)
	}
	if err := os.WriteFile(target, data, 0o644); err != nil {
		return fmt.Errorf("write %s: %w", name, err)
	}
	return nil
}

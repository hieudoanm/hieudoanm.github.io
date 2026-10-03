package landify

import (
	"bytes"
	"fmt"
	"html"
	"net/url"
	"path/filepath"
	"strings"
	"text/template"

	"landify/static"
)

// OGCard is the resolved input of the social card: the copy already wrapped to
// fit the frame, the pills already laid out, and the colors the page theme
// derives. Fields are grouped the way the template walks the card — frame,
// copy, type, panel, colors.
type OGCard struct {
	Frame OGFrame
	Type  OGType
	Panel OGPanel

	Site     string // brand name in the header row
	Monogram string // one or two letters for the tiles
	Kicker   string // small uppercase line above the title
	Host     string // host of site.og.url
	Title    string // unwrapped, for the SVG <title>
	Lines    []string
	Desc     string // unwrapped, for the SVG <desc>
	DescRuns []string
	Tags     []string
	Pills    []OGPill

	Colors OGColor
}

// OGCardPath returns where RenderOG's SVG belongs for a page written to
// output — BuildFile writes exactly there.
func OGCardPath(output string) string {
	return filepath.Join(filepath.Dir(output), "og", "og.svg")
}

// RenderOG renders the 1200 × 630 social card for cfg as SVG. It is the
// source of truth for the PNG: rasterise it with any SVG renderer.
func RenderOG(cfg *Config) ([]byte, error) {
	card, err := ogCard(cfg)
	if err != nil {
		return nil, err
	}
	tmpl, err := template.New("og.tmpl").Funcs(template.FuncMap{
		"esc":   html.EscapeString,
		"plus":  func(a, b int) int { return a + b },
		"lineY": func(start, step, i int) int { return start + i*step },
	}).ParseFS(static.FS, "og.tmpl")
	if err != nil {
		return nil, fmt.Errorf("parse og template: %w", err)
	}
	var buf bytes.Buffer
	if err := tmpl.Execute(&buf, card); err != nil {
		return nil, fmt.Errorf("render og card: %w", err)
	}
	return buf.Bytes(), nil
}

// ogCard resolves the card: copy from site.og with site-level fallbacks,
// colors from Tokens, then the layout. Every color comes from the page theme,
// so the card matches the site it was built from.
func ogCard(cfg *Config) (OGCard, error) {
	tokens, err := Tokens(cfg.Theme)
	if err != nil {
		return OGCard{}, fmt.Errorf("og theme: %w", err)
	}
	colors, err := ogColors(tokens)
	if err != nil {
		return OGCard{}, err
	}
	og := cfg.Social()
	title := strings.TrimSpace(og.Title)
	description := ogTrimDescription(og.Description)
	card := OGCard{
		Frame:    ogFrame(),
		Type:     ogScale(),
		Panel:    ogPanelBox(),
		Site:     cfg.Site.Name,
		Monogram: ogMonogram(cfg.Site.Name),
		Kicker:   strings.ToUpper(strings.TrimSpace(og.Kicker)),
		Host:     ogHost(og.URL),
		Title:    title,
		Lines:    ogWrap(title, ogTitleSize, ogColumn, ogTitleLines),
		Desc:     description,
		DescRuns: ogWrap(description, ogDescSize, ogColumn, ogDescLines),
		Tags:     og.Tags,
		Colors:   colors,
	}
	ogCenterText(&card)
	ogPills(&card)
	return card, nil
}

// ogTrimDescription flattens a folded or multi-line description onto the
// single line the card draws.
func ogTrimDescription(description string) string {
	return strings.Join(strings.Fields(description), " ")
}

// ogHost returns the host of a URL for the card header; an unparsable or
// relative value falls back to the value itself, so the card is never blank
// just because the URL is unusual.
func ogHost(rawURL string) string {
	rawURL = strings.TrimSpace(rawURL)
	if rawURL == "" {
		return ""
	}
	parsed, err := url.Parse(rawURL)
	if err != nil || parsed.Host == "" {
		return rawURL
	}
	return strings.TrimPrefix(parsed.Host, "www.")
}

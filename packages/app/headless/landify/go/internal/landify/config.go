// Package landify turns a single YAML file into a flat landing page.
package landify

import (
	"bytes"
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

// Config is the top-level schema for landify.yaml.
type Config struct {
	Theme    Theme    `yaml:"theme"`
	Site     Site     `yaml:"site"`
	Hero     Hero     `yaml:"hero"`
	Features Features `yaml:"features"`
	Demo     Demo     `yaml:"demo"`
	CTA      CTA      `yaml:"cta"`
	Footer   Footer   `yaml:"footer"`
}

// Theme is the design input. Only the base colors are authored; every other
// :root token (surfaces, borders, text-on-accent, dark/tint variants) is
// derived from them by Tokens. Radius is a CSS value, not a color.
type Theme struct {
	Base      string `yaml:"base"`
	Primary   string `yaml:"primary"`
	Secondary string `yaml:"secondary"`
	Neutral   string `yaml:"neutral"`
	Info      string `yaml:"info"`
	Warning   string `yaml:"warning"`
	Success   string `yaml:"success"`
	Error     string `yaml:"error"`
	Radius    string `yaml:"radius"`
}

// DefaultTheme returns the fallback color palette used for any theme field a
// YAML leaves empty.
func DefaultTheme() Theme {
	return Theme{
		Base:      "#f7f8fa",
		Primary:   "#0d9488",
		Secondary: "#7c3aed",
		Neutral:   "#555f6e",
		Info:      "#2563eb",
		Warning:   "#d97706",
		Success:   "#16a34a",
		Error:     "#dc2626",
		Radius:    "10px",
	}
}

// mergeTheme fills empty theme fields with their defaults, so a YAML that
// omits the whole section (or individual colors) still resolves completely.
func mergeTheme(t Theme) Theme {
	d := DefaultTheme()
	if t.Base == "" {
		t.Base = d.Base
	}
	if t.Primary == "" {
		t.Primary = d.Primary
	}
	if t.Secondary == "" {
		t.Secondary = d.Secondary
	}
	if t.Neutral == "" {
		t.Neutral = d.Neutral
	}
	if t.Info == "" {
		t.Info = d.Info
	}
	if t.Warning == "" {
		t.Warning = d.Warning
	}
	if t.Success == "" {
		t.Success = d.Success
	}
	if t.Error == "" {
		t.Error = d.Error
	}
	if t.Radius == "" {
		t.Radius = d.Radius
	}
	return t
}

// Site holds brand identity and global navigation.
type Site struct {
	Name        string    `yaml:"name"`
	Mark        string    `yaml:"mark"`
	Description string    `yaml:"description"`
	Nav         []NavItem `yaml:"nav"`
}

// NavItem is a single link shown in the navbar and footer.
type NavItem struct {
	Label string `yaml:"label"`
	Href  string `yaml:"href"`
}

// Hero is the first section visitors see.
type Hero struct {
	Badge       string    `yaml:"badge"`
	Headline    string    `yaml:"headline"`
	Subheadline string    `yaml:"subheadline"`
	Primary     Button    `yaml:"primary"`
	Secondary   Button    `yaml:"secondary"`
	Image       HeroImage `yaml:"image"`
}

// Button is a labelled link used for call-to-action buttons.
type Button struct {
	Label string `yaml:"label"`
	Href  string `yaml:"href"`
}

// HeroImage is the required 16:9 hero image shown in the hero section.
type HeroImage struct {
	Src string `yaml:"src"`
	Alt string `yaml:"alt"`
}

// Features is a grid of feature cards.
type Features struct {
	Heading string    `yaml:"heading"`
	Sub     string    `yaml:"sub"`
	Items   []Feature `yaml:"items"`
}

// Feature is a single card with an emoji icon.
type Feature struct {
	Icon  string `yaml:"icon"`
	Title string `yaml:"title"`
	Body  string `yaml:"body"`
}

// Demo is a video walkthrough rendered in a 16:9 frame.
type Demo struct {
	Heading string `yaml:"heading"`
	Sub     string `yaml:"sub"`
	Video   Video  `yaml:"video"`
}

// Video is the required demo video; Poster is an optional frame shown before
// playback.
type Video struct {
	Src    string `yaml:"src"`
	Poster string `yaml:"poster"`
}

// CTA is the closing call to action.
type CTA struct {
	Icon    string `yaml:"icon"`
	Heading string `yaml:"heading"`
	Body    string `yaml:"body"`
	Button  Button `yaml:"button"`
}

// Footer holds the copyright line and a set of links.
type Footer struct {
	Copyright string    `yaml:"copyright"`
	Links     []NavItem `yaml:"links"`
}

// Load parses data as a Config, rejecting unknown fields so typos in the
// YAML surface as errors instead of being silently ignored. A nil Theme falls
// back to the defaults.
func Load(data []byte) (*Config, error) {
	dec := yaml.NewDecoder(bytes.NewReader(data))
	dec.KnownFields(true)
	var cfg Config
	if err := dec.Decode(&cfg); err != nil {
		return nil, fmt.Errorf("parse yaml: %w", err)
	}
	cfg.Theme = mergeTheme(cfg.Theme)
	return &cfg, nil
}

// LoadFile reads and parses the YAML file at path.
func LoadFile(path string) (*Config, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read %s: %w", path, err)
	}
	return Load(data)
}

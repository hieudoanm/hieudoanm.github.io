package landify

import (
	"strings"
	"testing"
)

const validDoc = `
site:
  name: Landify
  mark: "🌄"
  description: A landing page.
  nav:
    - label: Features
      href: "#features"
hero:
  badge: "🚀 New"
  headline: Your headline goes here.
  subheadline: Describe what you offer.
  primary:
    label: Get started
    href: "#cta"
  secondary:
    label: Learn more
    href: "#demo"
  image:
    src: "assets/hero.png"
    alt: Product image or screenshot
features:
  heading: Features
  items:
    - icon: "⚡"
      title: Zero build step
      body: Open index.html anywhere.
demo:
  heading: Demo
  video:
    src: "assets/demo.mp4"
    poster: "assets/demo.jpg"
cta:
  icon: "🪄"
  heading: Make your mark.
  body: Go live today.
  button:
    label: Get the template
    href: https://example.com
footer:
  copyright: "© 2026 Landify"
  links:
    - label: Features
      href: "#features"
`

func TestLoadValid(t *testing.T) {
	cfg, err := Load([]byte(validDoc))
	if err != nil {
		t.Fatalf("Load: %v", err)
	}
	if cfg.Site.Name != "Landify" {
		t.Fatalf("site.name = %q, want Landify", cfg.Site.Name)
	}
	if len(cfg.Features.Items) != 1 {
		t.Fatalf("features.items = %d, want 1", len(cfg.Features.Items))
	}
	if !Valid(cfg) {
		t.Fatalf("Valid = false, want true: %v", Errors(cfg))
	}
}

func TestThemeDefaultsFillMissingFields(t *testing.T) {
	cfg, err := Load([]byte(validDoc))
	if err != nil {
		t.Fatal(err)
	}
	if got := cfg.Theme.Primary; got != "#0d9488" {
		t.Errorf("theme.primary = %q, want default", got)
	}
	if got := cfg.Theme.Base; got != "#f7f8fa" {
		t.Errorf("theme.base = %q, want default", got)
	}
	if got := cfg.Theme.Radius; got != "10px" {
		t.Errorf("theme.radius = %q, want default", got)
	}
	tokens, err := Tokens(cfg.Theme)
	if err != nil {
		t.Fatal(err)
	}
	for _, key := range []string{"base-100", "base-200", "base-300", "base-content",
		"primary", "primary-dark", "primary-soft", "primary-content",
		"secondary", "secondary-content", "neutral", "neutral-faint",
		"border", "border-soft", "info", "warning", "success", "error", "radius"} {
		if tokens[key] == "" {
			t.Errorf("tokens[%q] is empty, want derived value", key)
		}
	}
}

func TestThemeOverrideIsMergedOverDefaults(t *testing.T) {
	doc := "theme:\n  primary: \"#ff00aa\"\n  radius: \"12px\"\n" + validDoc
	cfg, err := Load([]byte(doc))
	if err != nil {
		t.Fatal(err)
	}
	if got := cfg.Theme.Primary; got != "#ff00aa" {
		t.Errorf("theme.primary = %q, want override", got)
	}
	if got := cfg.Theme.Radius; got != "12px" {
		t.Errorf("theme.radius = %q, want override", got)
	}
	if got := cfg.Theme.Secondary; got != "#7c3aed" {
		t.Errorf("theme.secondary = %q, want preserved default", got)
	}
}

func TestThemeRejectsUnknownKeys(t *testing.T) {
	doc := "theme:\n  custom-token: \"#123456\"\n" + validDoc
	if _, err := Load([]byte(doc)); err == nil {
		t.Fatal("Load with unknown theme key: want error, got nil")
	}
}

func TestThemeRejectsInvalidColor(t *testing.T) {
	doc := "theme:\n  primary: \"not-a-color\"\n" + validDoc
	cfg, err := Load([]byte(doc))
	if err != nil {
		t.Fatal(err)
	}
	if errs := Errors(cfg); len(errs) != 1 || !strings.Contains(errs[0], "theme.primary") {
		t.Fatalf("Errors = %v, want one theme.primary color error", errs)
	}
}

func TestLoadRejectsUnknownFields(t *testing.T) {
	_, err := Load([]byte(strings.Replace(validDoc, "landing page.", "landing page.\n  typo: nope", 1)))
	if err == nil {
		t.Fatal("Load with unknown field: want error, got nil")
	}
}

func TestErrorsReportsRequiredFields(t *testing.T) {
	cfg, err := Load([]byte(validDoc))
	if err != nil {
		t.Fatal(err)
	}
	cfg.Site.Name = " "
	cfg.Hero.Headline = ""
	cfg.Features.Items = nil
	errs := Errors(cfg)
	if len(errs) != 3 {
		t.Fatalf("Errors = %d (%v), want 3", len(errs), errs)
	}
}

func TestValidateFileEmpty(t *testing.T) {
	err := ValidateFile("does-not-exist.yaml")
	if err == nil {
		t.Fatal("ValidateFile: want error for missing file, got nil")
	}
}

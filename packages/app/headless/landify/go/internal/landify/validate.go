package landify

import (
	"fmt"
	"strings"
)

// Errors reports every schema problem found in cfg. A slice with no entries
// means the config is valid.
func Errors(cfg *Config) []string {
	var errs []string
	add := func(format string, args ...any) {
		errs = append(errs, fmt.Sprintf(format, args...))
	}
	require := func(value, field string) {
		if strings.TrimSpace(value) == "" {
			add("%s is required", field)
		}
	}

	require(cfg.Site.Name, "site.name")
	require(cfg.Site.Description, "site.description")

	if len(cfg.Site.Nav) == 0 {
		add("site.nav must contain at least one link")
	}
	for i, item := range cfg.Site.Nav {
		require(item.Label, fmt.Sprintf("site.nav[%d].label", i))
		require(item.Href, fmt.Sprintf("site.nav[%d].href", i))
	}

	require(cfg.Hero.Headline, "hero.headline")
	require(cfg.Hero.Subheadline, "hero.subheadline")
	require(cfg.Hero.Primary.Label, "hero.primary.label")
	require(cfg.Hero.Primary.Href, "hero.primary.href")
	require(cfg.Hero.Image.Src, "hero.image.src")

	require(cfg.Demo.Video.Src, "demo.video.src")

	if len(cfg.Features.Items) == 0 {
		add("features.items must contain at least one feature")
	}
	for i, f := range cfg.Features.Items {
		require(f.Title, fmt.Sprintf("features.items[%d].title", i))
		require(f.Body, fmt.Sprintf("features.items[%d].body", i))
	}

	require(cfg.CTA.Heading, "cta.heading")
	require(cfg.CTA.Body, "cta.body")
	require(cfg.CTA.Button.Label, "cta.button.label")
	require(cfg.CTA.Button.Href, "cta.button.href")

	require(cfg.Footer.Copyright, "footer.copyright")

	for name, value := range map[string]string{
		"base":      cfg.Theme.Base,
		"primary":   cfg.Theme.Primary,
		"secondary": cfg.Theme.Secondary,
		"neutral":   cfg.Theme.Neutral,
		"info":      cfg.Theme.Info,
		"warning":   cfg.Theme.Warning,
		"success":   cfg.Theme.Success,
		"error":     cfg.Theme.Error,
	} {
		if _, _, _, err := parseHex(value); err != nil {
			add("theme.%s (%s) must be a #RRGGBB color", name, value)
		}
	}

	return errs
}

// Valid reports whether cfg satisfies the schema.
func Valid(cfg *Config) bool {
	return len(Errors(cfg)) == 0
}

// ValidateFile loads path, parses it strictly, and returns a single combined
// error describing every problem found, or nil when the file is valid.
func ValidateFile(path string) error {
	cfg, err := LoadFile(path)
	if err != nil {
		return err
	}
	if errs := Errors(cfg); len(errs) > 0 {
		return fmt.Errorf("%s is invalid:\n  - %s", path, strings.Join(errs, "\n  - "))
	}
	return nil
}

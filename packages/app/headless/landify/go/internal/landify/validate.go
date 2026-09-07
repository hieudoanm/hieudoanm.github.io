package landify

import (
	"fmt"
	"strings"
)

// KnownTypes returns the supported page types in alphabetical order.
func KnownTypes() []string {
	return []string{"app", "docs", "download", "event", "portfolio", "pricing", "product", "waitlist"}
}

// NormalizeType returns cfg.Type canonicalized: empty maps to the default
// "product" type; unknown values pass through so validation can reject them.
func NormalizeType(typ string) string {
	switch typ {
	case "", "product":
		return "product"
	default:
		return typ
	}
}

func isKnownType(typ string) bool {
	for _, t := range KnownTypes() {
		if t == typ {
			return true
		}
	}
	return false
}

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

	kind := NormalizeType(cfg.Type)
	if !isKnownType(kind) {
		add("type %q is not supported (available: %s)", kind, strings.Join(KnownTypes(), ", "))
		return errs
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

	require(cfg.Footer.Copyright, "footer.copyright")

	switch kind {
	case "waitlist":
		require(cfg.Hero.Headline, "hero.headline")
		require(cfg.Hero.Subheadline, "hero.subheadline")
		require(cfg.Waitlist.Launches, "waitlist.launches")
		require(cfg.Waitlist.Heading, "waitlist.heading")
		require(cfg.Waitlist.Body, "waitlist.body")
		require(cfg.Waitlist.Form.Action, "waitlist.form.action")
		require(cfg.Waitlist.Form.Button, "waitlist.form.button")
		for i, s := range cfg.Waitlist.Social {
			require(s.Label, fmt.Sprintf("waitlist.social[%d].label", i))
			require(s.Href, fmt.Sprintf("waitlist.social[%d].href", i))
		}
	case "event":
		require(cfg.Hero.Headline, "hero.headline")
		require(cfg.Hero.Subheadline, "hero.subheadline")
		require(cfg.Event.Date, "event.date")
		require(cfg.Event.Venue.Name, "event.venue.name")
		require(cfg.Event.Primary.Label, "event.primary.label")
		require(cfg.Event.Primary.Href, "event.primary.href")
		if len(cfg.Event.Agenda) == 0 {
			add("event.agenda must contain at least one item")
		}
		for i, item := range cfg.Event.Agenda {
			require(item.Time, fmt.Sprintf("event.agenda[%d].time", i))
			require(item.Title, fmt.Sprintf("event.agenda[%d].title", i))
		}
		if len(cfg.Event.Speakers) == 0 {
			add("event.speakers must contain at least one speaker")
		}
		for i, sp := range cfg.Event.Speakers {
			require(sp.Name, fmt.Sprintf("event.speakers[%d].name", i))
			require(sp.Role, fmt.Sprintf("event.speakers[%d].role", i))
		}
	case "download":
		require(cfg.Hero.Headline, "hero.headline")
		require(cfg.Hero.Subheadline, "hero.subheadline")
		require(cfg.Download.Version, "download.version")
		require(cfg.Download.Repo, "download.repo")
		if len(cfg.Download.Platforms) == 0 {
			add("download.platforms must contain at least one platform")
		}
		for i, p := range cfg.Download.Platforms {
			require(p.Name, fmt.Sprintf("download.platforms[%d].name", i))
			require(p.Href, fmt.Sprintf("download.platforms[%d].href", i))
		}
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
	case "app":
		require(cfg.Hero.Headline, "hero.headline")
		require(cfg.Hero.Subheadline, "hero.subheadline")
		if len(cfg.App.Stores) == 0 {
			add("app.stores must contain at least one store")
		}
		for i, s := range cfg.App.Stores {
			require(s.Name, fmt.Sprintf("app.stores[%d].name", i))
			require(s.Href, fmt.Sprintf("app.stores[%d].href", i))
		}
		for i, sh := range cfg.App.Shots {
			require(sh.Src, fmt.Sprintf("app.shots[%d].src", i))
		}
	case "docs":
		require(cfg.Hero.Headline, "hero.headline")
		require(cfg.Hero.Subheadline, "hero.subheadline")
		if len(cfg.Docs.Packages) == 0 {
			add("docs.packages must contain at least one card")
		}
		for i, c := range cfg.Docs.Packages {
			require(c.Title, fmt.Sprintf("docs.packages[%d].title", i))
			require(c.Href, fmt.Sprintf("docs.packages[%d].href", i))
		}
	case "portfolio":
		require(cfg.Portfolio.Name, "portfolio.name")
		require(cfg.Portfolio.About, "portfolio.about")
		if len(cfg.Portfolio.Projects) == 0 {
			add("portfolio.projects must contain at least one project")
		}
		for i, p := range cfg.Portfolio.Projects {
			require(p.Title, fmt.Sprintf("portfolio.projects[%d].title", i))
			require(p.Body, fmt.Sprintf("portfolio.projects[%d].body", i))
			require(p.Href, fmt.Sprintf("portfolio.projects[%d].href", i))
		}
	case "pricing":
		require(cfg.Hero.Headline, "hero.headline")
		require(cfg.Hero.Subheadline, "hero.subheadline")
		if len(cfg.Pricing.Tiers) == 0 {
			add("pricing.tiers must contain at least one tier")
		}
		for i, t := range cfg.Pricing.Tiers {
			require(t.Name, fmt.Sprintf("pricing.tiers[%d].name", i))
			require(t.Price, fmt.Sprintf("pricing.tiers[%d].price", i))
			require(t.CTA.Label, fmt.Sprintf("pricing.tiers[%d].cta.label", i))
			require(t.CTA.Href, fmt.Sprintf("pricing.tiers[%d].cta.href", i))
		}
	default: // product — the original layout keeps its original requirements.
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
	}

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

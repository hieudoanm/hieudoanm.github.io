package gui

import (
	"strings"
	"testing"
)

func TestContentSections(t *testing.T) {
	product := ContentSections("product")
	if len(product) < 3 {
		t.Fatalf("product should have hero, cta and other sections, got %d", len(product))
	}
	labels := []string{}
	for _, s := range product {
		labels = append(labels, s.Label)
	}
	for _, want := range []string{"Hero", "Features", "CTA", "Footer"} {
		if !contains(labels, want) {
			t.Errorf("product sections missing %q (got %v)", want, labels)
		}
	}

	linktree := ContentSections("linktree")
	if len(linktree) == 0 {
		t.Fatal("linktree should have site/footer/linktree sections")
	}
	for _, s := range linktree {
		if s.Label == "Hero" {
			t.Fatal("linktree is the one type without a hero section")
		}
	}
}

func TestSectionsForTypeFallback(t *testing.T) {
	sections := sectionsForType("unknown")
	if len(sections) == 0 {
		t.Fatal("unknown types should fall back to a section list")
	}
}

func TestCollectionBasics(t *testing.T) {
	if got := CollectionLabel("features.items"); got == "" {
		t.Fatal("features.items should have a label")
	}
	if got := CollectionLabel("no.such.path"); got != "no.such.path" {
		t.Fatalf("unknown path should fall back to the path, got %q", got)
	}

	if IsScalarCollection("portfolio.skills") != true {
		t.Fatal("portfolio.skills should be a scalar collection")
	}
	if IsScalarCollection("features.items") {
		t.Fatal("features.items should not be scalar")
	}

	keys := CollectionKeys("pricing.tiers")
	seen := map[string]bool{}
	for _, k := range keys {
		if seen[k] {
			t.Fatalf("duplicate key %q in pricing.tiers", k)
		}
		seen[k] = true
	}
	wanted := []string{"name", "price", "cta.label", "cta.href"}
	for _, w := range wanted {
		if !seen[w] {
			t.Errorf("pricing.tiers keys missing %q", w)
		}
	}
}

func TestCollectionTemplateNestedCta(t *testing.T) {
	tmpl := CollectionTemplate("pricing.tiers")
	cta, ok := tmpl["cta"].(map[string]any)
	if !ok {
		t.Fatalf("pricing.tiers template should nest a cta map, got %#v", tmpl["cta"])
	}
	if cta["label"] != "" || cta["href"] != "" {
		t.Fatalf("nested cta template should have empty label/href, got %#v", cta)
	}
	if len(tmpl) == 0 {
		t.Fatal("pricing.tiers should have a template")
	}
}

func TestMediaHints(t *testing.T) {
	if len(MediaHints("product")) == 0 {
		t.Fatal("product should require hero + demo video media")
	}
	if len(MediaHints("app")) == 0 {
		t.Fatal("app should require screenshot media")
	}
	if MediaHints("faq") != nil {
		t.Fatal("faq should have no media requirements")
	}
}

func TestApplySectionFields(t *testing.T) {
	const base = `
site:
  name: Old
hero:
  headline: old headline
`
	next, err := ApplySectionFields(base, map[string]string{
		"site.name":         "New Site",
		"hero.headline":     "New Headline",
		"nonexistent.field": "ignored",
	})
	if err != nil {
		t.Fatal(err)
	}
	for _, want := range []string{"New Site", "New Headline"} {
		if !strings.Contains(next, want) {
			t.Errorf("expected %q in output:\n%s", want, next)
		}
	}
}

func contains(slice []string, s string) bool {
	for _, v := range slice {
		if v == s {
			return true
		}
	}
	return false
}

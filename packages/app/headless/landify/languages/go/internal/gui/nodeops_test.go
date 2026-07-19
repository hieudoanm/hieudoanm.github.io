package gui

import (
	"strings"
	"testing"
)

const nodeTestYAML = `
site:
  name: Test
  nav:
    - label: Home
      href: /
    - label: Docs
      href: /docs
features:
  items:
    - icon: "🚀"
      title: Fast
      body: Really fast.
pricing:
  tiers:
    - name: Basic
      price: "$0"
      cta:
        label: Start
        href: /start
portfolio:
  skills:
    - Go
    - Kotlin
`

func TestCollectionCount(t *testing.T) {
	cases := map[string]int{
		"site.nav":         2,
		"features.items":   1,
		"pricing.tiers":    1,
		"portfolio.skills": 2,
	}
	for path, want := range cases {
		got, err := CollectionCount(nodeTestYAML, path)
		if err != nil {
			t.Fatalf("%s: %v", path, err)
		}
		if got != want {
			t.Errorf("%s: want %d, got %d", path, want, got)
		}
	}
}

func TestAddItem(t *testing.T) {
	next, err := AddItem(nodeTestYAML, "site.nav", CollectionTemplate("site.nav"))
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(next, "- label: \"\"") && !strings.Contains(next, "label: \"\"") {
		t.Fatalf("new nav item should be empty, output:\n%s", next)
	}
	got, err := CollectionCount(next, "site.nav")
	if err != nil {
		t.Fatal(err)
	}
	if got != 3 {
		t.Fatalf("want 3 nav items, got %d", got)
	}
}

func TestAddItemCreatesPath(t *testing.T) {
	next, err := AddItem(nodeTestYAML, "team.members", CollectionTemplate("team.members"))
	if err != nil {
		t.Fatal(err)
	}
	got, err := CollectionCount(next, "team.members")
	if err != nil {
		t.Fatal(err)
	}
	if got != 1 {
		t.Fatalf("want 1 member, got %d", got)
	}
}

func TestRemoveItem(t *testing.T) {
	next, err := RemoveItem(nodeTestYAML, "site.nav", 0)
	if err != nil {
		t.Fatal(err)
	}
	got, _ := CollectionCount(next, "site.nav")
	if got != 1 {
		t.Fatalf("want 1 nav item, got %d", got)
	}
	items, err := GetItem(next, "site.nav", 0)
	if err != nil {
		t.Fatal(err)
	}
	if items["label"] != "Docs" {
		t.Fatalf("first remaining nav label should be Docs, got %q", items["label"])
	}

	if _, err := RemoveItem(nodeTestYAML, "site.nav", 9); err == nil {
		t.Fatal("expected out of range error")
	}
}

func TestMoveItem(t *testing.T) {
	next, err := MoveItem(nodeTestYAML, "site.nav", 0, 1)
	if err != nil {
		t.Fatal(err)
	}
	first, _ := GetItem(next, "site.nav", 0)
	if first["label"] != "Docs" {
		t.Fatalf("after move-down, first label should be Docs, got %q", first["label"])
	}

	// Bounds no-op: moving first item up changes nothing.
	same, err := MoveItem(nodeTestYAML, "site.nav", 0, -1)
	if err != nil {
		t.Fatal(err)
	}
	if same != nodeTestYAML {
		t.Fatal("expected no-op when moving out of bounds")
	}
}

func TestGetAndSetItem(t *testing.T) {
	values, err := GetItem(nodeTestYAML, "pricing.tiers", 0)
	if err != nil {
		t.Fatal(err)
	}
	if values["cta.label"] != "Start" {
		t.Fatalf("expected nested cta.label Start, got %q", values["cta.label"])
	}

	next, err := SetItem(nodeTestYAML, "pricing.tiers", 0,
		CollectionTemplate("pricing.tiers"),
		map[string]string{"name": "Pro", "cta.label": "Upgrade"})
	if err != nil {
		t.Fatal(err)
	}
	updated, err := GetItem(next, "pricing.tiers", 0)
	if err != nil {
		t.Fatal(err)
	}
	if updated["name"] != "Pro" || updated["cta.label"] != "Upgrade" {
		t.Fatalf("updated tier wrong: %#v", updated)
	}
}

func TestScalarCollection(t *testing.T) {
	// Add a string item into a scalar list.
	next, err := AddItem(nodeTestYAML, "portfolio.skills", nil)
	if err != nil {
		t.Fatal(err)
	}
	got, _ := CollectionCount(next, "portfolio.skills")
	if got != 3 {
		t.Fatalf("want 3 skills, got %d", got)
	}
	// Set its value through the scalar item path.
	next, err = SetItem(next, "portfolio.skills", 2, nil, map[string]string{"": "Rust"})
	if err != nil {
		t.Fatal(err)
	}
	values, err := GetItem(next, "portfolio.skills", 2)
	if err != nil {
		t.Fatal(err)
	}
	if values[""] != "Rust" {
		t.Fatalf("expected skill Rust, got %q", values[""])
	}
}

func TestSetPathValues(t *testing.T) {
	next, err := setPathValues(nodeTestYAML, map[string]string{
		"site.name":     "Acme",
		"hero.headline": "Hello",
		"site.nav":      "broken", // non-mapping guard: ignored
	})
	if err != nil {
		t.Fatal(err)
	}
	for _, want := range []string{"Acme", "Hello"} {
		if !strings.Contains(next, want) {
			t.Fatalf("expected %q in output:\n%s", want, next)
		}
	}
	if !strings.Contains(next, "headline: Hello") {
		t.Fatalf("expected hero.headline to be set:\n%s", next)
	}
}

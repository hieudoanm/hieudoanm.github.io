package docsify

import (
	"testing"
)

func TestWikiLinkRe_basic(t *testing.T) {
	matches := wikiLinkRe.FindAllStringSubmatch("Here is [[page]] link", -1)
	if len(matches) != 1 {
		t.Fatalf("expected 1 match, got %d", len(matches))
	}
	if matches[0][1] != "page" {
		t.Errorf("expected page name %q, got %q", "page", matches[0][1])
	}
}

func TestWikiLinkRe_withAlias(t *testing.T) {
	matches := wikiLinkRe.FindAllStringSubmatch("See [[target|display text]] here", -1)
	if len(matches) != 1 {
		t.Fatalf("expected 1 match, got %d", len(matches))
	}
	if matches[0][1] != "target" {
		t.Errorf("expected target %q, got %q", "target", matches[0][1])
	}
}

func TestWikiLinkRe_multiple(t *testing.T) {
	src := "Links: [[one]], [[two|alias]], and [[three]]"
	matches := wikiLinkRe.FindAllStringSubmatch(src, -1)
	if len(matches) != 3 {
		t.Fatalf("expected 3 matches, got %d", len(matches))
	}

	expected := []string{"one", "two", "three"}
	for i, m := range matches {
		if m[1] != expected[i] {
			t.Errorf("match %d: expected %q, got %q", i, expected[i], m[1])
		}
	}
}

func TestWikiLinkRe_noMatch(t *testing.T) {
	tests := []string{
		"No brackets here",
		"Just [text] in brackets",
		"[[incomplete",
		"no closing]]",
		"[[]]",
		"[a]",
	}
	for _, s := range tests {
		if wikiLinkRe.MatchString(s) {
			t.Errorf("expected no match for %q", s)
		}
	}
}

func TestWikiLinkRe_invalidPipe(t *testing.T) {
	matches := wikiLinkRe.FindAllStringSubmatch("[[page|]]", -1)
	// empty alias after | does not match [^\]|]+
	if len(matches) != 0 {
		t.Errorf("expected 0 matches for empty alias, got %d", len(matches))
	}
}

func TestWikiLinkRe_nestedBrackets(t *testing.T) {
	matches := wikiLinkRe.FindAllStringSubmatch("Not [[page [inner]] match", -1)
	if len(matches) != 1 {
		t.Fatalf("expected 1 match, got %d", len(matches))
	}
	if matches[0][1] != "page [inner" {
		t.Errorf("expected %q, got %q", "page [inner", matches[0][1])
	}
}

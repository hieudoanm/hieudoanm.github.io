package chesscom

import (
	"testing"
)

func TestTitles_ContainsExpected(t *testing.T) {
	expected := []string{"GM", "IM", "FM", "CM", "NM", "WGM", "WIM", "WFM", "WCM", "WNM"}
	if len(Titles) != len(expected) {
		t.Errorf("expected %d titles, got %d", len(expected), len(Titles))
	}

	got := make(map[string]bool)
	for _, title := range Titles {
		got[title] = true
	}
	for _, want := range expected {
		if !got[want] {
			t.Errorf("expected title %q not found in Titles", want)
		}
	}
}

func TestTitles_NoDuplicates(t *testing.T) {
	seen := make(map[string]bool)
	for _, title := range Titles {
		if seen[title] {
			t.Errorf("duplicate title found: %q", title)
		}
		seen[title] = true
	}
}

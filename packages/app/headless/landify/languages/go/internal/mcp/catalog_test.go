package mcp

import (
	"strings"
	"testing"

	"landify/internal/landify"
)

func TestTypesToolListsEveryKnownType(t *testing.T) {
	ws, _ := testWorkspace(t)

	var result typesResult
	decodeText(t, callToolText(t, ws, ToolTypes, `{}`), &result)

	known := landify.KnownTypes()
	if result.Count != len(known) {
		t.Fatalf("expected %d types, got %d", len(known), result.Count)
	}
	for i, entry := range result.Types {
		if entry.Name != known[i] {
			t.Fatalf("expected type %d to be %q, got %q", i, known[i], entry.Name)
		}
		if strings.TrimSpace(entry.Description) == "" {
			t.Fatalf("type %q has no description, so a model cannot choose it", entry.Name)
		}
	}
}

func TestThemesToolListsAndFiltersThePresets(t *testing.T) {
	ws, _ := testWorkspace(t)

	var all themesResult
	decodeText(t, callToolText(t, ws, ToolThemes, `{}`), &all)
	if all.Total != 64 {
		t.Fatalf("expected 64 presets in the catalogue, got %d", all.Total)
	}
	if all.Count != 64 {
		t.Fatalf("expected an unfiltered listing to return all 64, got %d", all.Count)
	}
	for i := 1; i < len(all.Themes); i++ {
		if all.Themes[i-1].Name >= all.Themes[i].Name {
			t.Fatalf("themes should be sorted, %q came before %q", all.Themes[i-1].Name, all.Themes[i].Name)
		}
	}

	var filtered themesResult
	decodeText(t, callToolText(t, ws, ToolThemes, `{"query":"midnight"}`), &filtered)
	if filtered.Count == 0 {
		t.Fatal("expected the midnight filter to match at least one preset")
	}
	if filtered.Count >= filtered.Total {
		t.Fatalf("expected the filter to narrow the list, got %d of %d", filtered.Count, filtered.Total)
	}
}

func TestThemesToolFilterThatMatchesNothing(t *testing.T) {
	ws, _ := testWorkspace(t)

	var result themesResult
	decodeText(t, callToolText(t, ws, ToolThemes, `{"query":"no-such-preset"}`), &result)
	if result.Count != 0 {
		t.Fatalf("expected no matches, got %d", result.Count)
	}
	if result.Total != 64 {
		t.Fatalf("the catalogue size should still be reported, got %d", result.Total)
	}
}

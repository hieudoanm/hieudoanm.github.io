package landify

import "testing"

func TestThemeByNameResolvesEveryPreset(t *testing.T) {
	names := []string{
		"ocean", "forest", "sunset", "royal", "rose", "slate", "sand", "midnight",
		"lagoon", "seafoam", "glacier", "sky", "cobalt", "arctic", "sapphire", "teal",
		"emerald", "jade", "mint", "moss", "fern", "graphite", "steel", "iron",
		"pearl", "silver", "concrete", "indigo", "violet", "lavender", "orchid", "iris",
		"periwinkle", "carnation", "magenta", "peony", "fuchsia", "blush", "cherry", "crimson",
		"tomato", "amber", "apricot", "tangerine", "pumpkin", "gold", "honey", "marigold",
		"mocha", "coffee", "caramel", "olive", "lime", "chartreuse", "plum", "wine",
		"burgundy", "noir", "eclipse", "nebula", "abyss", "obsidian", "fog", "frost",
	}
	wantPrimary := map[string]string{
		"ocean":    "#0e7490",
		"forest":   "#15803d",
		"sunset":   "#ea580c",
		"royal":    "#6d28d9",
		"rose":     "#be185d",
		"slate":    "#1e293b",
		"sand":     "#a16207",
		"midnight": "#22d3ee",
	}
	if len(wantPrimary) != 8 {
		t.Fatalf("primary contract covers %d themes, want 8", len(wantPrimary))
	}

	got := Themes()
	if len(got) != len(names) {
		t.Fatalf("Themes() = %d, want %d", len(got), len(names))
	}
	seen := make(map[string]bool, len(got))
	for i, nt := range got {
		if nt.Name == "" {
			t.Fatalf("themes[%d]: empty name", i)
		}
		if seen[nt.Name] {
			t.Fatalf("themes[%d]: duplicate name %q", i, nt.Name)
		}
		seen[nt.Name] = true
		if nt.Name != names[i] {
			t.Errorf("themes[%d].name = %q, want %q", i, nt.Name, names[i])
		}
		theme, ok := ThemeByName(nt.Name)
		if !ok {
			t.Fatalf("ThemeByName(%q): not found", nt.Name)
		}
		if want, ok := wantPrimary[nt.Name]; ok && theme.Primary != want {
			t.Errorf("theme.primary = %q, want %q", theme.Primary, want)
		}
		if _, ok := ThemeByName(up(nt.Name)); !ok {
			t.Errorf("ThemeByName(%q): case-insensitive lookup failed", up(nt.Name))
		}
	}
}

func TestThemeByNameUnknown(t *testing.T) {
	if _, ok := ThemeByName("not-a-theme"); ok {
		t.Fatal("ThemeByName(unknown): want false, got true")
	}
}

func TestEveryPresetRendersTokens(t *testing.T) {
	for _, nt := range Themes() {
		t.Run(nt.Name, func(t *testing.T) {
			if _, err := Tokens(nt.Theme); err != nil {
				t.Fatalf("Tokens(%s): %v", nt.Name, err)
			}
		})
	}
}

func up(s string) string {
	b := []byte(s)
	for i, c := range b {
		if c >= 'a' && c <= 'z' {
			b[i] = c - 32
		}
	}
	return string(b)
}

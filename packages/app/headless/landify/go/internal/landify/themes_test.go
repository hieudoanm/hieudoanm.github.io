package landify

import "testing"

func TestThemeByNameResolvesEveryPreset(t *testing.T) {
	tests := []struct {
		name        string
		wantPrimary string
	}{
		{"ocean", "#0e7490"},
		{"forest", "#15803d"},
		{"sunset", "#ea580c"},
		{"royal", "#6d28d9"},
		{"rose", "#be185d"},
		{"slate", "#1e293b"},
		{"sand", "#a16207"},
		{"midnight", "#22d3ee"},
	}
	if got := len(Themes()); got != len(tests) {
		t.Fatalf("Themes() = %d, want %d", got, len(tests))
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			theme, ok := ThemeByName(tt.name)
			if !ok {
				t.Fatalf("ThemeByName(%q): not found", tt.name)
			}
			if theme.Primary != tt.wantPrimary {
				t.Errorf("theme.primary = %q, want %q", theme.Primary, tt.wantPrimary)
			}
			if _, ok := ThemeByName(up(tt.name)); !ok {
				t.Errorf("ThemeByName(%q): case-insensitive lookup failed", up(tt.name))
			}
		})
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

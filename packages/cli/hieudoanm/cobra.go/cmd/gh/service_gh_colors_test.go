package gh

import (
	"testing"
)

func TestLanguageColors(t *testing.T) {
	tests := []struct {
		lang string
		hex  string
	}{
		{"Go", "#00ADD8"},
		{"TypeScript", "#3178C6"},
		{"Rust", "#DEA584"},
		{"Python", "#3572A5"},
		{"JavaScript", "#F7DF1E"},
		{"Java", "#B07219"},
		{"C", "#555555"},
		{"C++", "#F34B7D"},
		{"Ruby", "#701516"},
	}

	for _, tt := range tests {
		got, ok := LanguageColors[tt.lang]
		if !ok {
			t.Errorf("LanguageColors missing entry for %q", tt.lang)
			continue
		}
		if got != tt.hex {
			t.Errorf("LanguageColors[%q] = %q, want %q", tt.lang, got, tt.hex)
		}
	}
}

package chess

import (
	"testing"
)

func Test_country_lookup(t *testing.T) {
	tests := []struct {
		name     string
		url      string
		wantCode string
		wantName string
	}{
		{"US country URL", "https://api.chess.com/pub/country/US", "US", "United States"},
		{"Russia URL", "https://api.chess.com/pub/country/RU", "RU", "Russia"},
		{"VN URL", "https://api.chess.com/pub/country/VN", "VN", "Viet Nam"},
		{"lowercase code", "https://api.chess.com/pub/country/vn", "VN", "Viet Nam"},
		{"trailing slash", "https://api.chess.com/pub/country/US/", "US", "United States"},
		{"empty URL", "", "-", "-"},
		{"unknown country code", "https://api.chess.com/pub/country/XX", "XX", "-"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotCode, gotName := country(tt.url)
			if gotCode != tt.wantCode {
				t.Errorf("country(%q) code = %q, want %q", tt.url, gotCode, tt.wantCode)
			}
			if gotName != tt.wantName {
				t.Errorf("country(%q) name = %q, want %q", tt.url, gotName, tt.wantName)
			}
		})
	}
}

func Test_country_emptyURL(t *testing.T) {
	code, name := country("")
	if code != "-" || name != "-" {
		t.Errorf("country('') = (%q, %q), want (\"-\", \"-\")", code, name)
	}
}

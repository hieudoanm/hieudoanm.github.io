package headless

import (
	"strings"
	"testing"
)

func TestValidateURL(t *testing.T) {
	tests := []struct {
		name string
		raw  string
		want string
		// wantErr is compared exactly; wantErrContains covers the parse-failure
		// branch, whose message embeds the parser's own wording.
		wantErr         string
		wantErrContains string
	}{
		{"https", "https://example.com/page", "https://example.com/page", "", ""},
		{"http", "http://example.com", "http://example.com", "", ""},
		{"query preserved", "https://example.com/?a=1&b=2", "https://example.com/?a=1&b=2", "", ""},
		{"no scheme", "example.com/page", "", "invalid url", ""},
		{"file scheme", "file:///etc/passwd", "", "unsupported scheme: file", ""},
		{"data scheme", "data:text/html,<h1>x</h1>", "", "unsupported scheme: data", ""},
		{"javascript scheme", "javascript:alert(1)", "", "unsupported scheme: javascript", ""},
		{"empty", "", "", "invalid url", ""},
		{"control characters", "https://example.com/\x7f", "", "", "invalid control character"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			got, err := ValidateURL(test.raw)

			if test.wantErr != "" || test.wantErrContains != "" {
				if err == nil {
					t.Fatalf("ValidateURL(%q) = %q, want an error", test.raw, got)
				}
				if test.wantErr != "" && err.Error() != test.wantErr {
					t.Errorf("error = %q, want %q", err, test.wantErr)
				}
				if test.wantErrContains != "" && !strings.Contains(err.Error(), test.wantErrContains) {
					t.Errorf("error = %q, want it to mention %q", err, test.wantErrContains)
				}
				return
			}
			if err != nil {
				t.Fatalf("ValidateURL(%q): %v", test.raw, err)
			}
			if got != test.want {
				t.Errorf("ValidateURL(%q) = %q, want %q", test.raw, got, test.want)
			}
		})
	}
}

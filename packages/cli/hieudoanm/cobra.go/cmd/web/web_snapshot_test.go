package web

import (
	"testing"
)

func Test_hostnameSlug(t *testing.T) {
	tests := []struct {
		name string
		url  string
		want string
	}{
		{"simple host", "https://example.com", "example_com"},
		{"www subdomain", "https://www.example.com", "www_example_com"},
		{"path ignored", "https://example.com/path/to/page", "example_com"},
		{"query ignored", "https://example.com/page?q=1", "example_com"},
		{"port number", "https://example.com:8080", "example_com_8080"},
		{"no scheme", "example.com", "snapshot"},
		{"invalid URL", "://invalid", "snapshot"},
		{"empty string", "", "snapshot"},
		{"multiple subdomains", "https://deep.sub.domain.example.com", "deep_sub_domain_example_com"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := hostnameSlug(tt.url)
			if got != tt.want {
				t.Errorf("hostnameSlug(%q) = %q, want %q", tt.url, got, tt.want)
			}
		})
	}
}

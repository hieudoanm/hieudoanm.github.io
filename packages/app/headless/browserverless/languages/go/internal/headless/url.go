package headless

import (
	"errors"
	"fmt"
	"net/url"
)

// ValidateURL checks that raw is an absolute http or https URL and returns its
// normalised form. Rendering targets arrive from untrusted callers on both the
// HTTP API and the MCP tools, so both share this single validation point.
//
// Error strings are the exact bodies the HTTP API has always returned; the
// server package relies on them.
func ValidateURL(raw string) (string, error) {
	parsed, err := url.Parse(raw)
	if err != nil {
		return "", fmt.Errorf("invalid url: %w", err)
	}
	if parsed.Scheme == "" {
		return "", errors.New("invalid url")
	}
	switch parsed.Scheme {
	case "http", "https":
		return parsed.String(), nil
	default:
		return "", fmt.Errorf("unsupported scheme: %s", parsed.Scheme)
	}
}

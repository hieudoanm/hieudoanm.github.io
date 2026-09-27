package mcp

import (
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/hieudoanm/browserverless/internal/headless"
)

// renderArgs are the arguments shared by the scrape and screenshot tools.
type renderArgs struct {
	URL       string `json:"url"`
	TimeoutMS int    `json:"timeout_ms"`
}

// parseRenderArgs decodes and validates tool arguments, returning the
// normalised URL and the deadline to layer onto the session context.
//
// A zero timeout means "use the backend's own load timeout", so timeout_ms is
// only enforced when a caller sets it explicitly.
func parseRenderArgs(raw json.RawMessage) (string, time.Duration, error) {
	var args renderArgs
	if len(raw) > 0 {
		if err := json.Unmarshal(raw, &args); err != nil {
			return "", 0, fmt.Errorf("invalid arguments: %w", err)
		}
	}
	if args.URL == "" {
		return "", 0, errors.New("missing required argument: url")
	}
	if args.TimeoutMS < 0 {
		return "", 0, fmt.Errorf("timeout_ms must not be negative, got %d", args.TimeoutMS)
	}
	url, err := headless.ValidateURL(args.URL)
	if err != nil {
		return "", 0, err
	}
	return url, time.Duration(args.TimeoutMS) * time.Millisecond, nil
}

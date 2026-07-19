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

// maxTimeoutMS bounds timeout_ms. Multiplying milliseconds into a time.Duration
// converts them to nanoseconds, so a large enough value would wrap around and
// silently become a short or negative deadline instead of a long one.
const maxTimeoutMS = (1<<63 - 1) / int64(time.Millisecond)

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
	if int64(args.TimeoutMS) > maxTimeoutMS {
		return "", 0, fmt.Errorf("timeout_ms is too large, got %d", args.TimeoutMS)
	}
	url, err := headless.ValidateURL(args.URL)
	if err != nil {
		return "", 0, err
	}
	return url, time.Duration(args.TimeoutMS) * time.Millisecond, nil
}

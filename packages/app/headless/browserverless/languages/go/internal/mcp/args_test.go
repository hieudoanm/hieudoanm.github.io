package mcp

import (
	"errors"
	"strings"
	"testing"
	"time"

	"github.com/hieudoanm/browserverless/internal/headless"
)

func TestRenderToolArgumentErrors(t *testing.T) {
	tests := []struct {
		name    string
		tool    string
		args    any
		wantMsg string
	}{
		{"missing url", ToolScrape, map[string]any{}, "missing required argument: url"},
		{"unsupported scheme", ToolScrape, map[string]any{"url": "ftp://host/x"}, "unsupported scheme: ftp"},
		{"schemeless url", ToolScrape, map[string]any{"url": "example.com"}, "invalid url"},
		{"negative timeout", ToolScrape, map[string]any{"url": "https://e.com", "timeout_ms": -1}, "timeout_ms must not be negative"},
		{"overflowing timeout", ToolScrape, map[string]any{"url": "https://e.com", "timeout_ms": 1 << 62}, "timeout_ms is too large"},
		{"wrong argument type", ToolScrape, map[string]any{"url": 42}, "invalid arguments"},
		{"missing url on screenshot", ToolScreenshot, map[string]any{}, "missing required argument: url"},
		{"bad scheme on screenshot", ToolScreenshot, map[string]any{"url": "file:///etc/passwd"}, "unsupported scheme: file"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			renderer := newFakeRenderer()
			responses := driveServer(t, renderer, callToolFrame(test.tool, test.args))

			result := decodeToolResult(t, responses[0])
			if !result.IsError {
				t.Fatalf("want a tool error, got success: %+v", result)
			}
			if !strings.Contains(result.Content[0].Text, test.wantMsg) {
				t.Errorf("text = %q, want it to mention %q", result.Content[0].Text, test.wantMsg)
			}
			if renderer.lastURL != "" {
				t.Errorf("renderer was called with %q despite invalid arguments", renderer.lastURL)
			}
		})
	}
}

func TestRenderToolBackendErrors(t *testing.T) {
	tests := []struct {
		name    string
		err     error
		tool    string
		wantMsg string
	}{
		{"timeout is named", &headless.TimeoutError{Err: errors.New("deadline")}, ToolScrape, "scrape timed out"},
		{"timeout on screenshot", &headless.TimeoutError{Err: errors.New("deadline")}, ToolScreenshot, "screenshot timed out"},
		{"other failures", errors.New("connection refused"), ToolScrape, "scrape failed: connection refused"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			renderer := newFakeRenderer()
			renderer.err = test.err
			responses := driveServer(t, renderer, callToolFrame(test.tool, map[string]any{"url": "https://example.com"}))

			result := decodeToolResult(t, responses[0])
			if !result.IsError {
				t.Fatalf("want a tool error, got success: %+v", result)
			}
			if !strings.Contains(result.Content[0].Text, test.wantMsg) {
				t.Errorf("text = %q, want it to mention %q", result.Content[0].Text, test.wantMsg)
			}
		})
	}
}

func TestTimeoutArgumentBecomesContextDeadline(t *testing.T) {
	renderer := newFakeRenderer()
	responses := driveServer(t, renderer,
		callToolFrame(ToolScrape, map[string]any{"url": "https://example.com", "timeout_ms": 5000}))

	if result := decodeToolResult(t, responses[0]); result.IsError {
		t.Fatalf("unexpected tool error: %s", result.Content[0].Text)
	}
	if renderer.lastLimit <= 0 || renderer.lastLimit > 5*time.Second {
		t.Errorf("context deadline = %v, want at most the requested 5s", renderer.lastLimit)
	}
}

func TestOmittedTimeoutLeavesBackendDefault(t *testing.T) {
	renderer := newFakeRenderer()
	responses := driveServer(t, renderer, callToolFrame(ToolScrape, map[string]any{"url": "https://example.com"}))

	if result := decodeToolResult(t, responses[0]); result.IsError {
		t.Fatalf("unexpected tool error: %s", result.Content[0].Text)
	}
	if renderer.lastLimit != 0 {
		t.Errorf("context deadline = %v, want none so the backend default applies", renderer.lastLimit)
	}
}

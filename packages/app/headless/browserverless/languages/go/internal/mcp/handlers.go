package mcp

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"time"

	"github.com/hieudoanm/browserverless/internal/headless"
	"github.com/hieudoanm/browserverless/internal/version"
)

// versionInfo is the payload of the version tool.
type versionInfo struct {
	Server  string `json:"server"`
	Version string `json:"version"`
}

// handleScrape renders a URL and returns its HTML as text.
func handleScrape(renderer Renderer) ToolHandler {
	return func(ctx context.Context, args json.RawMessage) *ToolResult {
		rawurl, timeout, err := parseRenderArgs(args)
		if err != nil {
			return NewToolResultError(err.Error())
		}

		renderCtx, cancel := rendererTimeout(ctx, timeout)
		defer cancel()

		outcome, err := renderer.Scrape(renderCtx, rawurl)
		if err != nil {
			return NewToolResultError(renderFailure("scrape", err))
		}
		return NewToolResultText(marshalOutcome(outcome))
	}
}

// handleScreenshot renders a URL and returns the PNG as an image content block
// alongside a short text summary.
func handleScreenshot(renderer Renderer) ToolHandler {
	return func(ctx context.Context, args json.RawMessage) *ToolResult {
		rawurl, timeout, err := parseRenderArgs(args)
		if err != nil {
			return NewToolResultError(err.Error())
		}

		renderCtx, cancel := rendererTimeout(ctx, timeout)
		defer cancel()

		outcome, err := renderer.Screenshot(renderCtx, rawurl)
		if err != nil {
			return NewToolResultError(renderFailure("screenshot", err))
		}
		return screenshotResult(outcome)
	}
}

// handleVersion reports the binary version, mirroring GET /api/v1/version.
func handleVersion() ToolHandler {
	return func(context.Context, json.RawMessage) *ToolResult {
		return NewToolResultText(marshalOutcome(versionInfo{
			Server:  ServerName,
			Version: version.Version,
		}))
	}
}

// screenshotResult pairs a text summary with the PNG as an image content block.
// Encoding the image in its own block keeps megabytes of base64 out of the
// text a model has to read.
func screenshotResult(outcome ScreenshotOutcome) *ToolResult {
	return &ToolResult{
		Content: []ContentItem{
			{Type: "text", Text: marshalOutcome(outcome)},
			{
				Type:     "image",
				Data:     base64.StdEncoding.EncodeToString(outcome.PNG),
				MimeType: "image/png",
			},
		},
	}
}

// rendererTimeout layers a per-call deadline onto ctx. A zero timeout keeps the
// backend's own load timeout, matching the CLI's default behaviour.
func rendererTimeout(ctx context.Context, timeout time.Duration) (context.Context, context.CancelFunc) {
	if timeout <= 0 {
		return context.WithCancel(ctx)
	}
	return context.WithTimeout(ctx, timeout)
}

// renderFailure turns a backend error into model-readable text. Timeouts are
// named explicitly because they are the most common recoverable failure.
func renderFailure(verb string, err error) string {
	if headless.IsTimeout(err) {
		return fmt.Sprintf("%s timed out: %v", verb, err)
	}
	return fmt.Sprintf("%s failed: %v", verb, err)
}

// marshalOutcome renders a tool payload as indented JSON.
func marshalOutcome(outcome any) string {
	data, err := json.MarshalIndent(outcome, "", "  ")
	if err != nil {
		return fmt.Sprintf("could not encode result: %v", err)
	}
	return string(data)
}

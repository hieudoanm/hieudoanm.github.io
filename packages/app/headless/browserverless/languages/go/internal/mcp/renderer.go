package mcp

import (
	"context"

	"github.com/hieudoanm/browserverless/internal/headless"
)

// Renderer produces page content for the MCP tools. Two backends implement it:
// localRenderer renders in this process through internal/headless, and
// httpRenderer proxies an already-running `browserverless serve` over HTTP. The
// tool surface is identical either way, so tools never branch on backend.
type Renderer interface {
	Scrape(ctx context.Context, rawurl string) (ScrapeOutcome, error)
	Screenshot(ctx context.Context, rawurl string) (ScreenshotOutcome, error)
}

// ScrapeOutcome is the JSON payload of the scrape tool. HTML is the rendered
// document exactly as internal/headless produced it.
type ScrapeOutcome struct {
	URL        string `json:"url"`
	Title      string `json:"title"`
	HTML       string `json:"html"`
	TimedOut   bool   `json:"timed_out"`
	DurationMS int64  `json:"duration_ms"`
	MemoryKB   uint64 `json:"memory_kb"`
}

// ScreenshotOutcome is the JSON payload of the screenshot tool. The PNG travels
// as a separate image content block, so only its size is reported here.
type ScreenshotOutcome struct {
	URL        string `json:"url"`
	Title      string `json:"title"`
	PNGBytes   int    `json:"png_bytes"`
	TimedOut   bool   `json:"timed_out"`
	DurationMS int64  `json:"duration_ms"`
	MemoryKB   uint64 `json:"memory_kb"`

	// PNG is excluded from the text payload; the handler base64-encodes it into
	// an image content block instead of inlining megabytes of text.
	PNG []byte `json:"-"`
}

// localRenderer renders pages in this process. It is the default backend, so
// `mcp serve` works with no server running.
type localRenderer struct {
	browser *headless.Browser
}

// NewLocalRenderer returns a Renderer backed by an in-process engine.
func NewLocalRenderer(config headless.Config) Renderer {
	return &localRenderer{browser: headless.New(config)}
}

func (r *localRenderer) Scrape(ctx context.Context, rawurl string) (ScrapeOutcome, error) {
	result, err := r.browser.Scrape(ctx, rawurl)
	if err != nil {
		return ScrapeOutcome{}, err
	}
	return ScrapeOutcome{
		URL:        result.URL,
		Title:      result.Title,
		HTML:       result.HTML,
		TimedOut:   result.TimedOut,
		DurationMS: result.DurationMS,
		MemoryKB:   result.MemoryKB,
	}, nil
}

func (r *localRenderer) Screenshot(ctx context.Context, rawurl string) (ScreenshotOutcome, error) {
	result, err := r.browser.Screenshot(ctx, rawurl)
	if err != nil {
		return ScreenshotOutcome{}, err
	}
	return ScreenshotOutcome{
		URL:        result.URL,
		Title:      result.Title,
		PNGBytes:   len(result.PNG),
		TimedOut:   result.TimedOut,
		DurationMS: result.DurationMS,
		MemoryKB:   result.MemoryKB,
		PNG:        result.PNG,
	}, nil
}

package mcp

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"

	"github.com/hieudoanm/browserverless/internal/headless"
)

const (
	maxResponseBytes = 32 << 20
	maxErrorBytes    = 64 << 10
)

// requestBody is the JSON payload both render endpoints accept.
type requestBody struct {
	URL string `json:"url"`
}

// httpRenderer proxies a running `browserverless serve`, selected by
// `mcp serve --addr`. Several clients can then share one warm engine instead of
// paying browser start-up per process.
type httpRenderer struct {
	baseURL string
	client  *http.Client
}

// NewHTTPRenderer returns a Renderer that talks to the server at baseURL.
func NewHTTPRenderer(baseURL string) Renderer {
	return &httpRenderer{
		baseURL: strings.TrimRight(baseURL, "/"),
		client:  &http.Client{},
	}
}

func (r *httpRenderer) Scrape(ctx context.Context, rawurl string) (ScrapeOutcome, error) {
	resp, err := r.post(ctx, "/api/v1/scrape", rawurl)
	if err != nil {
		return ScrapeOutcome{}, err
	}
	defer func() { _ = resp.Body.Close() }()

	body, err := io.ReadAll(io.LimitReader(resp.Body, maxResponseBytes))
	if err != nil {
		return ScrapeOutcome{}, fmt.Errorf("read scrape response: %w", err)
	}
	meta := parseMeta(resp.Header)
	return ScrapeOutcome{
		URL:        meta.URL,
		Title:      meta.Title,
		HTML:       string(body),
		TimedOut:   meta.TimedOut,
		DurationMS: meta.DurationMS,
		MemoryKB:   meta.MemoryKB,
	}, nil
}

func (r *httpRenderer) Screenshot(ctx context.Context, rawurl string) (ScreenshotOutcome, error) {
	resp, err := r.post(ctx, "/api/v1/screenshot", rawurl)
	if err != nil {
		return ScreenshotOutcome{}, err
	}
	defer func() { _ = resp.Body.Close() }()

	png, err := io.ReadAll(io.LimitReader(resp.Body, maxResponseBytes))
	if err != nil {
		return ScreenshotOutcome{}, fmt.Errorf("read screenshot response: %w", err)
	}
	meta := parseMeta(resp.Header)
	return ScreenshotOutcome{
		URL:        meta.URL,
		Title:      meta.Title,
		PNGBytes:   len(png),
		TimedOut:   meta.TimedOut,
		DurationMS: meta.DurationMS,
		MemoryKB:   meta.MemoryKB,
		PNG:        png,
	}, nil
}

// post sends a render request and returns the 200 response. The caller closes
// the body. Any other status becomes an error, so callers never inspect codes.
func (r *httpRenderer) post(ctx context.Context, path, rawurl string) (*http.Response, error) {
	payload, err := json.Marshal(requestBody{URL: rawurl})
	if err != nil {
		return nil, fmt.Errorf("encode request: %w", err)
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, r.baseURL+path, bytes.NewReader(payload))
	if err != nil {
		return nil, fmt.Errorf("build request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := r.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("reach %s: %w", r.baseURL, err)
	}
	if resp.StatusCode == http.StatusOK {
		return resp, nil
	}
	defer func() { _ = resp.Body.Close() }()
	return nil, remoteError(resp)
}

// remoteError converts a non-200 response into an error. 504 becomes a
// headless.TimeoutError so callers classify it with headless.IsTimeout exactly
// as they would for the in-process backend.
func remoteError(resp *http.Response) error {
	var body struct {
		Error string `json:"error"`
	}
	if err := json.NewDecoder(io.LimitReader(resp.Body, maxErrorBytes)).Decode(&body); err != nil {
		return fmt.Errorf("server returned %s", resp.Status)
	}
	if resp.StatusCode == http.StatusGatewayTimeout {
		return &headless.TimeoutError{Err: errors.New(body.Error)}
	}
	return fmt.Errorf("server returned %s: %s", resp.Status, body.Error)
}

// renderMeta carries the x-browserverless-* response headers. The server
// sanitises header values, so a proxied URL or title may read '?' where the
// original had whitespace or a control character.
type renderMeta struct {
	URL        string
	Title      string
	TimedOut   bool
	DurationMS int64
	MemoryKB   uint64
}

func parseMeta(header http.Header) renderMeta {
	durationMS, _ := strconv.ParseInt(header.Get("x-browserverless-duration-ms"), 10, 64)
	memoryKB, _ := strconv.ParseUint(header.Get("x-browserverless-memory-kb"), 10, 64)
	return renderMeta{
		URL:        header.Get("x-browserverless-url"),
		Title:      header.Get("x-browserverless-title"),
		TimedOut:   header.Get("x-browserverless-load-status") == "partial",
		DurationMS: durationMS,
		MemoryKB:   memoryKB,
	}
}

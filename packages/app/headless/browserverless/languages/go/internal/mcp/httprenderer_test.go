package mcp

import (
	"context"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/hieudoanm/browserverless/internal/headless"
	"github.com/hieudoanm/browserverless/internal/server"
)

// stubServerRenderer backs a real server.Handler with canned render results, so
// these tests exercise the actual HTTP contract rather than a hand-written fake
// of it.
type stubServerRenderer struct {
	scrape     headless.ScrapeResult
	screenshot headless.ScreenshotResult
	err        error
}

func (s stubServerRenderer) Scrape(context.Context, string) (headless.ScrapeResult, error) {
	if s.err != nil {
		return headless.ScrapeResult{}, s.err
	}
	return s.scrape, nil
}

func (s stubServerRenderer) Screenshot(context.Context, string) (headless.ScreenshotResult, error) {
	if s.err != nil {
		return headless.ScreenshotResult{}, s.err
	}
	return s.screenshot, nil
}

func newServerStub() stubServerRenderer {
	return stubServerRenderer{
		scrape: headless.ScrapeResult{
			HTML:       "<html><head><title>Proxied</title></head><body>ok</body></html>",
			URL:        "https://example.com/final",
			Title:      "Proxied",
			DurationMS: 17,
			MemoryKB:   900,
		},
		screenshot: headless.ScreenshotResult{
			PNG:        []byte{0x89, 'P', 'N', 'G', 0x0d},
			URL:        "https://example.com/final",
			Title:      "Proxied",
			DurationMS: 21,
			MemoryKB:   1500,
		},
	}
}

// startServerStub runs a real browserverless HTTP API over loopback.
func startServerStub(t *testing.T, stub stubServerRenderer) string {
	t.Helper()

	srv := httptest.NewServer(server.NewHandler(stub, nil))
	t.Cleanup(srv.Close)
	return srv.URL
}

func TestHTTPRendererScrapesThroughTheServerAPI(t *testing.T) {
	renderer := NewHTTPRenderer(startServerStub(t, newServerStub()))

	outcome, err := renderer.Scrape(context.Background(), "https://example.com")
	if err != nil {
		t.Fatalf("Scrape: %v", err)
	}
	if !strings.Contains(outcome.HTML, "ok") {
		t.Errorf("html = %q, want the served document", outcome.HTML)
	}
	if outcome.URL != "https://example.com/final" || outcome.Title != "Proxied" {
		t.Errorf("meta headers not mapped: %+v", outcome)
	}
	if outcome.TimedOut {
		t.Error("timed_out = true, want false for a complete render")
	}
	if outcome.DurationMS != 17 || outcome.MemoryKB != 900 {
		t.Errorf("metrics = %dms/%dkB, want 17ms/900kB", outcome.DurationMS, outcome.MemoryKB)
	}
}

func TestHTTPRendererScreenshotsThroughTheServerAPI(t *testing.T) {
	renderer := NewHTTPRenderer(startServerStub(t, newServerStub()))

	outcome, err := renderer.Screenshot(context.Background(), "https://example.com")
	if err != nil {
		t.Fatalf("Screenshot: %v", err)
	}
	if outcome.PNGBytes != len(outcome.PNG) {
		t.Errorf("png_bytes = %d, want the %d bytes received", outcome.PNGBytes, len(outcome.PNG))
	}
	if outcome.PNG[0] != 0x89 {
		t.Errorf("png = %v, want the PNG signature", outcome.PNG)
	}
	if outcome.URL != "https://example.com/final" || outcome.DurationMS != 21 {
		t.Errorf("meta headers not mapped: %+v", outcome)
	}
}

func TestHTTPRendererReportsPartialRenders(t *testing.T) {
	stub := newServerStub()
	stub.scrape.TimedOut = true
	stub.screenshot.TimedOut = true
	renderer := NewHTTPRenderer(startServerStub(t, stub))

	scraped, err := renderer.Scrape(context.Background(), "https://example.com")
	if err != nil {
		t.Fatalf("Scrape: %v", err)
	}
	shot, err := renderer.Screenshot(context.Background(), "https://example.com")
	if err != nil {
		t.Fatalf("Screenshot: %v", err)
	}
	if !scraped.TimedOut || !shot.TimedOut {
		t.Error("a partial render must survive the proxy as timed_out = true")
	}
}

// The proxy client must carry its own deadline. A per-call timeout_ms only
// bounds the context, so a backend that accepts the connection and then stalls
// would otherwise hang the tool for good.
func TestHTTPRendererClientHasADeadline(t *testing.T) {
	renderer, ok := NewHTTPRenderer("http://127.0.0.1:1").(*httpRenderer)
	if !ok {
		t.Fatal("NewHTTPRenderer did not return the HTTP backend")
	}
	if renderer.client.Timeout <= 0 {
		t.Errorf("client timeout = %v, want a positive backstop", renderer.client.Timeout)
	}
}

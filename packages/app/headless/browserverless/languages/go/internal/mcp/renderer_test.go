package mcp

import (
	"context"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/hieudoanm/browserverless/internal/headless"
)

const localFixtureHTML = `<!doctype html>
<html>
<head><title>Local Fixture</title></head>
<body><h1>Rendered in process</h1></body>
</html>`

// newLocalFixture serves a page immediately, so render tests need no network.
func newLocalFixture(t *testing.T) string {
	t.Helper()

	return serveFixture(t, 0)
}

// newSlowFixture serves a page only after delay, so deadline handling can be
// exercised deterministically.
func newSlowFixture(t *testing.T, delay time.Duration) string {
	t.Helper()

	return serveFixture(t, delay)
}

func serveFixture(t *testing.T, delay time.Duration) string {
	t.Helper()

	handler := http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		if delay > 0 {
			time.Sleep(delay)
		}
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		_, _ = w.Write([]byte(localFixtureHTML))
	})

	srv := httptest.NewServer(handler)
	t.Cleanup(srv.Close)
	return srv.URL
}

func TestLocalRendererScrapesInProcess(t *testing.T) {
	renderer := NewLocalRenderer(headless.DefaultConfig())

	outcome, err := renderer.Scrape(context.Background(), newLocalFixture(t))
	if err != nil {
		t.Fatalf("Scrape: %v", err)
	}
	if !strings.Contains(outcome.HTML, "Rendered in process") {
		t.Errorf("html = %q, want the rendered fixture", outcome.HTML)
	}
	if outcome.Title != "Local Fixture" {
		t.Errorf("title = %q, want the fixture title", outcome.Title)
	}
	if outcome.TimedOut {
		t.Error("timed_out = true, want false")
	}
}

func TestLocalRendererScreenshotsInProcess(t *testing.T) {
	renderer := NewLocalRenderer(headless.DefaultConfig())

	outcome, err := renderer.Screenshot(context.Background(), newLocalFixture(t))
	if err != nil {
		t.Fatalf("Screenshot: %v", err)
	}
	if len(outcome.PNG) == 0 {
		t.Fatal("no PNG bytes returned")
	}
	if outcome.PNGBytes != len(outcome.PNG) {
		t.Errorf("png_bytes = %d, want the %d bytes rendered", outcome.PNGBytes, len(outcome.PNG))
	}
	if string(outcome.PNG[1:4]) != "PNG" {
		t.Errorf("png = %q, want a PNG signature", outcome.PNG[:4])
	}
}

func TestLocalRendererHonoursConfiguredTimeout(t *testing.T) {
	config := headless.DefaultConfig()
	config.LoadTimeout = 50 * time.Millisecond
	renderer := NewLocalRenderer(config)

	_, err := renderer.Scrape(context.Background(), newSlowFixture(t, 2*time.Second))
	if err == nil {
		t.Fatal("want a timeout error, got nil")
	}
	if !headless.IsTimeout(err) {
		t.Errorf("IsTimeout(%v) = false, want true so tools can name the timeout", err)
	}
}

func TestLocalRendererHonoursContextDeadline(t *testing.T) {
	renderer := NewLocalRenderer(headless.DefaultConfig())
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	_, err := renderer.Scrape(ctx, newSlowFixture(t, 2*time.Second))
	if err == nil {
		t.Fatal("want a deadline error, got nil")
	}
	if !headless.IsTimeout(err) {
		t.Errorf("IsTimeout(%v) = false, want true", err)
	}
}

func TestBackendConstructorsReturnTheirOwnType(t *testing.T) {
	if _, ok := NewLocalRenderer(headless.DefaultConfig()).(*localRenderer); !ok {
		t.Error("NewLocalRenderer did not return the in-process backend")
	}
	if _, ok := NewHTTPRenderer("http://127.0.0.1:8080").(*httpRenderer); !ok {
		t.Error("NewHTTPRenderer did not return the proxy backend")
	}
}

func TestHTTPRendererNormalisesTrailingSlash(t *testing.T) {
	renderer, ok := NewHTTPRenderer("http://127.0.0.1:8080/").(*httpRenderer)
	if !ok {
		t.Fatal("NewHTTPRenderer did not return the proxy backend")
	}
	if renderer.baseURL != "http://127.0.0.1:8080" {
		t.Errorf("baseURL = %q, want the trailing slash removed", renderer.baseURL)
	}
}

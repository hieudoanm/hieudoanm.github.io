package headless

import (
	"context"
	"errors"
	"image"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func TestDefaultConfig(t *testing.T) {
	cfg := DefaultConfig()
	if cfg.ViewportWidth != 1280 {
		t.Errorf("ViewportWidth = %d, want 1280", cfg.ViewportWidth)
	}
	if cfg.ViewportHeight != 720 {
		t.Errorf("ViewportHeight = %d, want 720", cfg.ViewportHeight)
	}
	if cfg.LoadTimeout != 30*time.Second {
		t.Errorf("LoadTimeout = %v, want 30s", cfg.LoadTimeout)
	}
}

func TestViewport(t *testing.T) {
	cfg := Config{ViewportWidth: 800, ViewportHeight: 600}
	want := image.Rect(0, 0, 800, 600)
	if got := cfg.viewport(); got != want {
		t.Errorf("viewport() = %v, want %v", got, want)
	}
}

func TestIsTimeout(t *testing.T) {
	tests := []struct {
		name string
		err  error
		want bool
	}{
		{"nil", nil, false},
		{"deadline", context.DeadlineExceeded, true},
		{"wrapped deadline", &TimeoutError{Err: context.DeadlineExceeded}, true},
		{"other", errors.New("boom"), false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := IsTimeout(tt.err); got != tt.want {
				t.Errorf("IsTimeout(%v) = %v, want %v", tt.err, got, tt.want)
			}
		})
	}
}

func newTestServer(t *testing.T, html string) *httptest.Server {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		_, _ = w.Write([]byte(html))
	}))
	t.Cleanup(srv.Close)
	return srv
}

const testHTML = `<!doctype html>
<html>
<head><title>Browserverless Test</title></head>
<body><h1>Hello Browserverless</h1></body>
</html>`

func TestScrape(t *testing.T) {
	srv := newTestServer(t, testHTML)
	b := New(Config{ViewportWidth: 640, ViewportHeight: 480, LoadTimeout: 30 * time.Second})

	result, err := b.Scrape(context.Background(), srv.URL)
	if err != nil {
		t.Fatalf("Scrape: %v", err)
	}
	if result.URL != srv.URL {
		t.Errorf("URL = %q, want %q", result.URL, srv.URL)
	}
	if result.Title != "Browserverless Test" {
		t.Errorf("Title = %q, want %q", result.Title, "Browserverless Test")
	}
	if !strings.Contains(result.HTML, "Hello Browserverless") {
		t.Errorf("HTML missing marker: %q", result.HTML)
	}
	if result.DurationMS < 0 {
		t.Errorf("DurationMS = %d, want >= 0", result.DurationMS)
	}
}

func TestScreenshot(t *testing.T) {
	srv := newTestServer(t, testHTML)
	b := New(Config{ViewportWidth: 640, ViewportHeight: 480, LoadTimeout: 30 * time.Second})

	result, err := b.Screenshot(context.Background(), srv.URL)
	if err != nil {
		t.Fatalf("Screenshot: %v", err)
	}
	if len(result.PNG) == 0 {
		t.Error("PNG is empty")
	}
	if result.Title != "Browserverless Test" {
		t.Errorf("Title = %q, want %q", result.Title, "Browserverless Test")
	}
	if len(result.PNG) < 8 || string(result.PNG[:8]) != "\x89PNG\r\n\x1a\n" {
		t.Errorf("PNG lacks PNG signature")
	}
}

func TestScrapeTimeout(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(2 * time.Second)
	}))
	t.Cleanup(srv.Close)

	b := New(Config{LoadTimeout: 50 * time.Millisecond})
	_, err := b.Scrape(context.Background(), srv.URL)
	if err == nil {
		t.Fatal("Scrape succeeded, want timeout error")
	}
	if !IsTimeout(err) {
		t.Errorf("IsTimeout(%v) = false, want true", err)
	}
}

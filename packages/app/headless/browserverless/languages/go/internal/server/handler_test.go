package server

import (
	"context"
	"errors"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/hieudoanm/browserverless/internal/headless"
)

type fakeRenderer struct {
	scrapeFunc func(ctx context.Context, url string) (headless.ScrapeResult, error)
	shotFunc   func(ctx context.Context, url string) (headless.ScreenshotResult, error)
}

func (f *fakeRenderer) Scrape(ctx context.Context, url string) (headless.ScrapeResult, error) {
	if f.scrapeFunc == nil {
		return headless.ScrapeResult{}, errors.New("scrape not stubbed")
	}
	return f.scrapeFunc(ctx, url)
}

func (f *fakeRenderer) Screenshot(ctx context.Context, url string) (headless.ScreenshotResult, error) {
	if f.shotFunc == nil {
		return headless.ScreenshotResult{}, errors.New("screenshot not stubbed")
	}
	return f.shotFunc(ctx, url)
}

func doRequest(t *testing.T, handler http.Handler, method, path, body string) *httptest.ResponseRecorder {
	t.Helper()
	var reader io.Reader
	if body != "" {
		reader = strings.NewReader(body)
	}
	req := httptest.NewRequest(method, path, reader)
	if body != "" {
		req.Header.Set("Content-Type", "application/json")
	}
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)
	return rec
}

func TestHealth(t *testing.T) {
	h := NewHandler(&fakeRenderer{}, nil)
	rec := doRequest(t, h, http.MethodGet, "/api/v1/health", "")
	if rec.Code != 200 {
		t.Errorf("status = %d, want 200", rec.Code)
	}
	if body := rec.Body.String(); body != `{"status":"ok"}` {
		t.Errorf("body = %q, want {\"status\":\"ok\"}", body)
	}
}

func TestVersion(t *testing.T) {
	h := NewHandler(&fakeRenderer{}, nil)
	rec := doRequest(t, h, http.MethodGet, "/api/v1/version", "")
	if rec.Code != 200 {
		t.Errorf("status = %d, want 200", rec.Code)
	}
	if body := rec.Body.String(); body != "0.1.0" {
		t.Errorf("body = %q, want 0.1.0", body)
	}
}

func TestScrapeSuccess(t *testing.T) {
	r := &fakeRenderer{
		scrapeFunc: func(ctx context.Context, url string) (headless.ScrapeResult, error) {
			return headless.ScrapeResult{
				HTML:       "<html><head><title>X</title></head><body>hi</body></html>",
				URL:        "https://example.com/",
				Title:      "X",
				TimedOut:   false,
				DurationMS: 12,
				MemoryKB:   34,
			}, nil
		},
	}
	h := NewHandler(r, nil)
	rec := doRequest(t, h, http.MethodPost, "/api/v1/scrape", `{"url":"https://example.com/"}`)
	if rec.Code != 200 {
		t.Fatalf("status = %d, want 200: %s", rec.Code, rec.Body.String())
	}
	if ct := rec.Header().Get("Content-Type"); !strings.HasPrefix(ct, "text/html") {
		t.Errorf("Content-Type = %q, want text/html", ct)
	}
	checks := map[string]string{
		"x-browserverless-url":         "https://example.com/",
		"x-browserverless-title":       "X",
		"x-browserverless-load-status": "ok",
		"x-browserverless-memory-kb":   "34",
		"x-browserverless-duration-ms": "12",
	}
	for name, want := range checks {
		if got := rec.Header().Get(name); got != want {
			t.Errorf("%s = %q, want %q", name, got, want)
		}
	}
	if body := rec.Body.String(); !strings.Contains(body, "hi") {
		t.Errorf("body missing marker: %q", body)
	}
}

func TestScreenshotSuccess(t *testing.T) {
	png := []byte("\x89PNG\r\n\x1a\nfake")
	r := &fakeRenderer{
		shotFunc: func(ctx context.Context, url string) (headless.ScreenshotResult, error) {
			return headless.ScreenshotResult{
				PNG:        png,
				URL:        "https://example.com/",
				Title:      "X",
				TimedOut:   false,
				DurationMS: 5,
				MemoryKB:   1,
			}, nil
		},
	}
	h := NewHandler(r, nil)
	rec := doRequest(t, h, http.MethodPost, "/api/v1/screenshot", `{"url":"https://example.com/"}`)
	if rec.Code != 200 {
		t.Fatalf("status = %d, want 200", rec.Code)
	}
	if ct := rec.Header().Get("Content-Type"); ct != "image/png" {
		t.Errorf("Content-Type = %q, want image/png", ct)
	}
	if body := rec.Body.Bytes(); string(body) != string(png) {
		t.Errorf("body = %q, want PNG bytes", body)
	}
}

func TestBadRequests(t *testing.T) {
	r := &fakeRenderer{}
	h := NewHandler(r, nil)

	tests := []struct {
		name   string
		method string
		path   string
		body   string
		status int
		msg    string
	}{
		{"empty body", http.MethodPost, "/api/v1/scrape", "", 400, "invalid json body"},
		{"malformed json", http.MethodPost, "/api/v1/scrape", `{`, 400, "invalid json body"},
		{"missing url", http.MethodPost, "/api/v1/scrape", `{}`, 400, "missing 'url'"},
		{"url not string", http.MethodPost, "/api/v1/scrape", `{"url":42}`, 400, "invalid json body"},
		{"bad scheme", http.MethodPost, "/api/v1/scrape", `{"url":"file:///etc/passwd"}`, 400, "unsupported scheme: file"},
		{"missing scheme", http.MethodPost, "/api/v1/screenshot", `{"url":"foo"}`, 400, "invalid url"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			rec := doRequest(t, h, tt.method, tt.path, tt.body)
			if rec.Code != tt.status {
				t.Fatalf("status = %d, want %d: %s", rec.Code, tt.status, rec.Body.String())
			}
			if !strings.Contains(rec.Body.String(), tt.msg) {
				t.Errorf("body = %s, want it to contain %q", rec.Body.String(), tt.msg)
			}
		})
	}
}

func TestMethodNotAllowed(t *testing.T) {
	for _, path := range []string{"/api/v1/scrape", "/api/v1/screenshot"} {
		rec := doRequest(t, NewHandler(&fakeRenderer{}, nil), http.MethodGet, path, "")
		if rec.Code != 405 {
			t.Errorf("GET %s status = %d, want 405", path, rec.Code)
		}
	}
}

func TestNotFound(t *testing.T) {
	rec := doRequest(t, NewHandler(&fakeRenderer{}, nil), http.MethodGet, "/nope", "")
	if rec.Code != 404 {
		t.Errorf("status = %d, want 404", rec.Code)
	}
}

func TestScrapeTimeout(t *testing.T) {
	r := &fakeRenderer{
		scrapeFunc: func(ctx context.Context, url string) (headless.ScrapeResult, error) {
			return headless.ScrapeResult{}, &headless.TimeoutError{Err: context.DeadlineExceeded}
		},
	}
	rec := doRequest(t, NewHandler(r, nil), http.MethodPost, "/api/v1/scrape", `{"url":"https://example.com/"}`)
	if rec.Code != 504 {
		t.Fatalf("status = %d, want 504", rec.Code)
	}
	if !strings.Contains(rec.Body.String(), "render timed out") {
		t.Errorf("body = %s, want render timed out", rec.Body.String())
	}
}

func TestScrapeInternalError(t *testing.T) {
	r := &fakeRenderer{
		scrapeFunc: func(ctx context.Context, url string) (headless.ScrapeResult, error) {
			return headless.ScrapeResult{}, errors.New("boom")
		},
	}
	rec := doRequest(t, NewHandler(r, nil), http.MethodPost, "/api/v1/scrape", `{"url":"https://example.com/"}`)
	if rec.Code != 500 {
		t.Fatalf("status = %d, want 500", rec.Code)
	}
	if !strings.Contains(rec.Body.String(), "boom") {
		t.Errorf("body = %s, want it to contain boom", rec.Body.String())
	}
}

func TestHeaderSafe(t *testing.T) {
	tests := []struct {
		in   string
		want string
	}{
		{"caf\u00c3\u00a9\u0001F600", "caf???F600"},
		{"a\nb\r\nc", "a?b??c"},
		{"https://example.com/a?b=c", "https://example.com/a?b=c"},
	}
	for _, tt := range tests {
		if got := headerSafe(tt.in); got != tt.want {
			t.Errorf("headerSafe(%q) = %q, want %q", tt.in, got, tt.want)
		}
	}
}

func TestOpenAPISpec(t *testing.T) {
	spec := openapiSpec()
	if !strings.Contains(spec, `"version": "0.1.0"`) {
		t.Errorf("openapi version not substituted: %s", spec[:120])
	}
}

func TestLogging(t *testing.T) {
	var gotID uint64
	var gotStatus int
	h := NewHandler(&fakeRenderer{}, func(id uint64, method, path string, status int, durationMS int64) {
		gotID = id
		gotStatus = status
	})
	rec := doRequest(t, h, http.MethodGet, "/api/v1/health", "")
	if rec.Code != 200 {
		t.Fatalf("status = %d, want 200", rec.Code)
	}
	if gotID < 1 || gotStatus != 200 {
		t.Errorf("logged id/status = %d/%d, want id>=1 and 200", gotID, gotStatus)
	}
}

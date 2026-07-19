package tests

import (
	"encoding/json"
	"net/http"
	"strings"
	"testing"
)

func TestHealth(t *testing.T) {
	binPath := buildBinary(t)
	baseURL, stop := startServer(t, binPath)
	defer stop()

	resp := doRequest(t, http.MethodGet, baseURL, "/api/v1/health", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d: %s", resp.StatusCode, readBody(t, resp))
	}
	body := readBody(t, resp)
	var result map[string]any
	if err := json.Unmarshal([]byte(body), &result); err != nil {
		t.Fatal(err)
	}
	if result["status"] != "ok" {
		t.Fatalf("expected status ok, got %v", result["status"])
	}
}

func TestVersion(t *testing.T) {
	binPath := buildBinary(t)
	baseURL, stop := startServer(t, binPath)
	defer stop()

	resp := doRequest(t, http.MethodGet, baseURL, "/api/v1/version", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d: %s", resp.StatusCode, readBody(t, resp))
	}
	body := readBody(t, resp)
	if !strings.Contains(body, "0.1.") {
		t.Fatalf("expected version string, got %q", body)
	}
}

func TestDocsAndOpenAPI(t *testing.T) {
	binPath := buildBinary(t)
	baseURL, stop := startServer(t, binPath)
	defer stop()

	resp := doRequest(t, http.MethodGet, baseURL, "/docs", "")
	if resp.StatusCode != 200 {
		t.Fatalf("docs: expected 200, got %d: %s", resp.StatusCode, readBody(t, resp))
	}
	if ct := resp.Header.Get("Content-Type"); !strings.HasPrefix(ct, "text/html") {
		t.Fatalf("docs content-type = %q, want text/html", ct)
	}
	if body := readBody(t, resp); !strings.Contains(body, "redoc") {
		t.Fatalf("docs body missing redoc script")
	}

	resp = doRequest(t, http.MethodGet, baseURL, "/api/v1/openapi.json", "")
	if resp.StatusCode != 200 {
		t.Fatalf("openapi: expected 200, got %d: %s", resp.StatusCode, readBody(t, resp))
	}
	if body := readBody(t, resp); !strings.Contains(body, "Browserverless") {
		t.Fatalf("openapi body missing title")
	}
}

func TestScrape(t *testing.T) {
	binPath := buildBinary(t)
	baseURL, stop := startServer(t, binPath)
	defer stop()
	fixture := newFixture(t)

	resp := doRequest(t, http.MethodPost, baseURL, "/api/v1/scrape",
		`{"url":"`+fixture.URL+`/`+`"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d: %s", resp.StatusCode, readBody(t, resp))
	}
	if ct := resp.Header.Get("Content-Type"); !strings.HasPrefix(ct, "text/html") {
		t.Fatalf("content-type = %q, want text/html", ct)
	}
	checked := map[string]string{
		"x-browserverless-url":         fixture.URL + "/",
		"x-browserverless-title":       "Browserverless Fixture",
		"x-browserverless-load-status": "ok",
	}
	for name, want := range checked {
		if got := resp.Header.Get(name); got != want {
			t.Fatalf("%s = %q, want %q", name, got, want)
		}
	}
	if resp.Header.Get("x-browserverless-duration-ms") == "" {
		t.Fatal("missing x-browserverless-duration-ms header")
	}
	if resp.Header.Get("x-browserverless-memory-kb") == "" {
		t.Fatal("missing x-browserverless-memory-kb header")
	}
	if body := readBody(t, resp); !strings.Contains(body, "Integration Fixture Content") {
		t.Fatalf("scrape body missing fixture marker: %q", body)
	}
}

func TestScreenshot(t *testing.T) {
	binPath := buildBinary(t)
	baseURL, stop := startServer(t, binPath)
	defer stop()
	fixture := newFixture(t)

	resp := doRequest(t, http.MethodPost, baseURL, "/api/v1/screenshot",
		`{"url":"`+fixture.URL+`/`+`"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d: %s", resp.StatusCode, readBody(t, resp))
	}
	if ct := resp.Header.Get("Content-Type"); ct != "image/png" {
		t.Fatalf("content-type = %q, want image/png", ct)
	}
	body := readBody(t, resp)
	if len(body) < 8 || body[:8] != "\x89PNG\r\n\x1a\n" {
		t.Fatalf("response is not a PNG (len %d)", len(body))
	}
	if got := resp.Header.Get("x-browserverless-load-status"); got != "ok" {
		t.Fatalf("load-status = %q, want ok", got)
	}
}

func TestBadRequests(t *testing.T) {
	binPath := buildBinary(t)
	baseURL, stop := startServer(t, binPath)
	defer stop()

	tests := []struct {
		name string
		body string
	}{
		{"empty body", ""},
		{"malformed json", `{`},
		{"missing url", `{}`},
		{"url not string", `{"url":42}`},
		{"bad scheme", `{"url":"file:///etc/passwd"}`},
		{"missing scheme", `{"url":"foo"}`},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resp := doRequest(t, http.MethodPost, baseURL, "/api/v1/scrape", tt.body)
			if resp.StatusCode != 400 {
				t.Fatalf("expected 400, got %d: %s", resp.StatusCode, readBody(t, resp))
			}
			if body := readBody(t, resp); !strings.Contains(body, "error") {
				t.Fatalf("expected json error body, got %q", body)
			}
		})
	}
}

func TestMethodNotAllowed(t *testing.T) {
	binPath := buildBinary(t)
	baseURL, stop := startServer(t, binPath)
	defer stop()

	for _, path := range []string{"/api/v1/scrape", "/api/v1/screenshot"} {
		resp := doRequest(t, http.MethodGet, baseURL, path, "")
		if resp.StatusCode != 405 {
			t.Fatalf("GET %s: expected 405, got %d: %s", path, resp.StatusCode, readBody(t, resp))
		}
		readBody(t, resp)
	}
}

func TestNotFound(t *testing.T) {
	binPath := buildBinary(t)
	baseURL, stop := startServer(t, binPath)
	defer stop()

	resp := doRequest(t, http.MethodGet, baseURL, "/nope", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d: %s", resp.StatusCode, readBody(t, resp))
	}
	readBody(t, resp)
}

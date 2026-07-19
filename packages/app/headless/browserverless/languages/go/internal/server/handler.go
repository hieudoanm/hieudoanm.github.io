package server

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"sync/atomic"
	"time"

	"github.com/hieudoanm/browserverless/internal/headless"
	"github.com/hieudoanm/browserverless/internal/version"
)

const maxBodyBytes = 64 * 1024

var requestID atomic.Uint64

type Renderer interface {
	Scrape(ctx context.Context, rawurl string) (headless.ScrapeResult, error)
	Screenshot(ctx context.Context, rawurl string) (headless.ScreenshotResult, error)
}

type Handler struct {
	renderer Renderer
	log      func(id uint64, method, path string, status int, durationMS int64)
}

func NewHandler(renderer Renderer, logFn func(id uint64, method, path string, status int, durationMS int64)) *Handler {
	return &Handler{renderer: renderer, log: logFn}
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
	id := requestID.Add(1)

	status, contentType, headers, body := h.route(w, r)

	w.Header().Set("Content-Type", contentType)
	for _, hdr := range headers {
		w.Header().Set(hdr[0], hdr[1])
	}
	w.WriteHeader(status)
	_, _ = w.Write(body)

	if h.log != nil {
		h.log(id, r.Method, r.URL.Path, status, time.Since(start).Milliseconds())
	}
}

func (h *Handler) route(w http.ResponseWriter, r *http.Request) (int, string, [][2]string, []byte) {
	path := r.URL.Path

	switch {
	case r.Method == http.MethodGet && path == "/api/v1/health":
		return 200, jsonContentType, nil, []byte(`{"status":"ok"}`)
	case r.Method == http.MethodGet && path == "/api/v1/version":
		return 200, textContentType, nil, []byte(version.Version)
	case r.Method == http.MethodGet && path == "/api/v1/openapi.json":
		return 200, jsonContentType, nil, []byte(openapiSpec())
	case r.Method == http.MethodGet && path == "/docs":
		return 200, htmlContentType, nil, []byte(docsPage())
	case r.Method == http.MethodPost && path == "/api/v1/scrape":
		return h.scrapeTarget(w, r)
	case r.Method == http.MethodPost && path == "/api/v1/screenshot":
		return h.screenshotTarget(w, r)
	case (path == "/api/v1/scrape" || path == "/api/v1/screenshot") && r.Method != http.MethodPost:
		return 405, jsonContentType, nil, errorBody("method not allowed")
	default:
		return 404, jsonContentType, nil, errorBody("not found")
	}
}

const (
	jsonContentType = "application/json; charset=utf-8"
	textContentType = "text/plain; charset=utf-8"
	htmlContentType = "text/html; charset=utf-8"
	pngContentType  = "image/png"
)

func (h *Handler) scrapeTarget(w http.ResponseWriter, r *http.Request) (int, string, [][2]string, []byte) {
	rawURL, status, body, err := parseURLFromJSON(w, r)
	if err != nil {
		return status, jsonContentType, nil, body
	}

	result, err := h.renderer.Scrape(r.Context(), rawURL)
	if err != nil {
		return renderError(err, "render failed")
	}

	headers := metaHeaders(result.URL, result.Title, result.TimedOut, result.MemoryKB, result.DurationMS)
	return 200, htmlContentType, headers, []byte(result.HTML)
}

func (h *Handler) screenshotTarget(w http.ResponseWriter, r *http.Request) (int, string, [][2]string, []byte) {
	rawURL, status, body, err := parseURLFromJSON(w, r)
	if err != nil {
		return status, jsonContentType, nil, body
	}

	result, err := h.renderer.Screenshot(r.Context(), rawURL)
	if err != nil {
		return renderError(err, "screenshot failed")
	}

	headers := metaHeaders(result.URL, result.Title, result.TimedOut, result.MemoryKB, result.DurationMS)
	return 200, pngContentType, headers, result.PNG
}

func renderError(err error, verb string) (int, string, [][2]string, []byte) {
	if headless.IsTimeout(err) {
		return 504, jsonContentType, nil, errorBody("render timed out")
	}
	return 500, jsonContentType, nil, errorBody(fmt.Sprintf("%s: %v", verb, err))
}

type requestBody struct {
	URL string `json:"url"`
}

func parseURLFromJSON(w http.ResponseWriter, r *http.Request) (string, int, []byte, error) {
	r.Body = http.MaxBytesReader(w, r.Body, maxBodyBytes)
	b, err := io.ReadAll(r.Body)
	if err != nil {
		return "", 400, errorBody("failed to read body"), err
	}

	var req requestBody
	if err := json.Unmarshal(b, &req); err != nil {
		return "", 400, errorBody(fmt.Sprintf("invalid json body: %v", err)), err
	}
	if req.URL == "" {
		return "", 400, errorBody("missing 'url' in json body"), fmt.Errorf("missing 'url'")
	}

	return validateURL(req.URL)
}

func validateURL(raw string) (string, int, []byte, error) {
	parsed, err := url.Parse(raw)
	if err != nil {
		return "", 400, errorBody(fmt.Sprintf("invalid url: %v", err)), err
	}
	if parsed.Scheme == "" {
		return "", 400, errorBody("invalid url"), fmt.Errorf("invalid url: missing scheme")
	}
	switch parsed.Scheme {
	case "http", "https":
		return parsed.String(), 200, nil, nil
	default:
		return "", 400, errorBody(fmt.Sprintf("unsupported scheme: %s", parsed.Scheme)), fmt.Errorf("unsupported scheme")
	}
}

func headerSafe(value string) string {
	var b strings.Builder
	for _, r := range value {
		if r == ' ' || (r >= 0x21 && r <= 0x7e) {
			b.WriteRune(r)
		} else {
			b.WriteByte('?')
		}
	}
	return b.String()
}

func metaHeaders(finalURL, title string, timedOut bool, memoryKB uint64, durationMS int64) [][2]string {
	status := "ok"
	if timedOut {
		status = "partial"
	}
	return [][2]string{
		{"x-browserverless-url", headerSafe(finalURL)},
		{"x-browserverless-title", headerSafe(title)},
		{"x-browserverless-load-status", status},
		{"x-browserverless-memory-kb", fmt.Sprintf("%d", memoryKB)},
		{"x-browserverless-duration-ms", fmt.Sprintf("%d", durationMS)},
	}
}

func errorBody(message string) []byte {
	body, _ := json.Marshal(map[string]string{"error": message})
	return body
}

func openapiSpec() string {
	return strings.ReplaceAll(openapiJSON, "0.0.0", version.Version)
}

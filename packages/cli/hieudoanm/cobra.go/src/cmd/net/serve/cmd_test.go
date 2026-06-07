package serve

import (
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
)

func TestCORSMiddleware_Options(t *testing.T) {
	handler := corsMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t.Error("next handler should not be called for OPTIONS")
	}))
	req := httptest.NewRequest(http.MethodOptions, "/", nil)
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)
	if rec.Code != http.StatusNoContent {
		t.Errorf("status = %d, want %d", rec.Code, http.StatusNoContent)
	}
	if rec.Header().Get("Access-Control-Allow-Origin") != "*" {
		t.Error("missing Access-Control-Allow-Origin header")
	}
	if rec.Header().Get("Access-Control-Allow-Methods") != "GET, OPTIONS" {
		t.Error("missing or wrong Access-Control-Allow-Methods header")
	}
	if rec.Header().Get("Access-Control-Allow-Headers") != "*" {
		t.Error("missing Access-Control-Allow-Headers header")
	}
}

func TestCORSMiddleware_POST(t *testing.T) {
	var called bool
	handler := corsMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		called = true
	}))
	req := httptest.NewRequest(http.MethodPost, "/", nil)
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)
	if !called {
		t.Error("next handler was not called for POST")
	}
	if rec.Header().Get("Access-Control-Allow-Origin") != "*" {
		t.Error("missing CORS header")
	}
}

func TestCORSMiddleware_GET(t *testing.T) {
	var called bool
	handler := corsMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		called = true
	}))
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)
	if !called {
		t.Error("next handler was not called for GET")
	}
	if rec.Header().Get("Access-Control-Allow-Origin") != "*" {
		t.Error("missing CORS header")
	}
}

func TestNewServeCmd_RunE_NonExistentDir(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("dir", "/tmp/nonexistent-test-serve-dir-99999")
	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for non-existent directory")
	}
	if !strings.Contains(err.Error(), "directory error") {
		t.Errorf("unexpected error: %v", err)
	}
}

func TestNewServeCmd_RunE_FileIsNotDir(t *testing.T) {
	tmpFile, err := os.CreateTemp("", "serve-test-*")
	if err != nil {
		t.Fatal(err)
	}
	tmpFile.Close()
	defer os.Remove(tmpFile.Name())

	cmd := NewCmd()
	cmd.Flags().Set("dir", tmpFile.Name())
	err = cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for file passed as dir")
	}
	if !strings.Contains(err.Error(), "is not a directory") {
		t.Errorf("unexpected error: %v", err)
	}
}

func TestNewServeCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "serve" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "Start an HTTP file server" {
		t.Errorf("Short = %q", cmd.Short)
	}
	wantLong := "Serve static files over HTTP with optional CORS, directory listing, and TLS support."
	if cmd.Long != wantLong {
		t.Errorf("Long = %q, want %q", cmd.Long, wantLong)
	}
	wantExample := "  serve\n  serve --port 9000 --dir ./public\n  serve --port 443 --cert cert.pem --key key.pem"
	if cmd.Example != wantExample {
		t.Errorf("Example = %q, want %q", cmd.Example, wantExample)
	}
	for _, name := range []string{"port", "dir", "cors", "cert", "key", "json"} {
		if cmd.Flag(name) == nil {
			t.Errorf("missing flag: --%s", name)
		}
	}
}

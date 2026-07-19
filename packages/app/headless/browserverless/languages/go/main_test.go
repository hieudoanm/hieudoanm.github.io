package main

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func runTest(t *testing.T, args ...string) (int, string, string) {
	t.Helper()
	var stdout, stderr bytes.Buffer
	code := run(args, &stdout, &stderr)
	return code, stdout.String(), stderr.String()
}

func TestVersion(t *testing.T) {
	for _, arg := range []string{"version", "--version"} {
		code, out, _ := runTest(t, arg)
		if code != 0 {
			t.Errorf("%s exit = %d, want 0", arg, code)
		}
		if !strings.Contains(out, "browserverless") {
			t.Errorf("%s out = %q, want version string", arg, out)
		}
	}
}

func TestHelp(t *testing.T) {
	for _, arg := range []string{"help", "-h", "--help"} {
		code, out, _ := runTest(t, arg)
		if code != 0 {
			t.Errorf("%s exit = %d, want 0", arg, code)
		}
		if !strings.Contains(out, "screenshot") || !strings.Contains(out, "scrape") || !strings.Contains(out, "serve") {
			t.Errorf("help out missing commands: %q", out)
		}
	}
}

func TestNoArgs(t *testing.T) {
	code, out, _ := runTest(t)
	if code != 0 {
		t.Errorf("exit = %d, want 0", code)
	}
	if !strings.Contains(out, "Usage") {
		t.Errorf("out = %q, want usage text", out)
	}
}

func TestUnknownCommand(t *testing.T) {
	code, _, err := runTest(t, "frobnicate")
	if code != 2 {
		t.Errorf("exit = %d, want 2", code)
	}
	if !strings.Contains(err, "unknown command") {
		t.Errorf("stderr = %q, want unknown command", err)
	}
}

func TestScreenshotMissingURL(t *testing.T) {
	code, _, err := runTest(t, "screenshot")
	if code != 2 {
		t.Errorf("exit = %d, want 2", code)
	}
	if !strings.Contains(err, "is required") {
		t.Errorf("stderr = %q, want missing url error", err)
	}
}

func TestScrapeMissingURL(t *testing.T) {
	code, _, err := runTest(t, "scrape")
	if code != 2 {
		t.Errorf("exit = %d, want 2", code)
	}
	if !strings.Contains(err, "is required") {
		t.Errorf("stderr = %q, want missing url error", err)
	}
}

func TestScreenshotFlagHelp(t *testing.T) {
	code, _, _ := runTest(t, "screenshot", "-h")
	if code != 0 {
		t.Errorf("exit = %d, want 0", code)
	}
}

func TestHealth(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"status":"ok"}`))
	}))
	t.Cleanup(srv.Close)

	code, out, stderr := runTest(t, "health", "--base", srv.URL)
	if code != 0 {
		t.Errorf("exit = %d, want 0: %s", code, stderr)
	}
	if strings.TrimSpace(out) != "ok" {
		t.Errorf("out = %q, want \"ok\"", out)
	}
}

func TestHealthFailure(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusInternalServerError)
	}))
	t.Cleanup(srv.Close)

	code, _, stderr := runTest(t, "health", "--base", srv.URL)
	if code != 1 {
		t.Errorf("exit = %d, want 1", code)
	}
	if !strings.Contains(stderr, "500") {
		t.Errorf("stderr = %q, want status in it", stderr)
	}
}

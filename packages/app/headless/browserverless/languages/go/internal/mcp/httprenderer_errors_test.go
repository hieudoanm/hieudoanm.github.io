package mcp

import (
	"context"
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/hieudoanm/browserverless/internal/headless"
)

func TestHTTPRendererClassifiesServerFailures(t *testing.T) {
	tests := []struct {
		name    string
		err     error
		want    string
		timeout bool
	}{
		{
			name:    "gateway timeout becomes a timeout error",
			err:     &headless.TimeoutError{Err: errors.New("engine gave up")},
			want:    "render timed out",
			timeout: true,
		},
		{
			name: "other render failures stay plain errors",
			err:  errors.New("engine exploded"),
			want: "engine exploded",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			stub := newServerStub()
			stub.err = test.err
			renderer := NewHTTPRenderer(startServerStub(t, stub))

			_, err := renderer.Scrape(context.Background(), "https://example.com")
			if err == nil {
				t.Fatal("want an error, got nil")
			}
			if !strings.Contains(err.Error(), test.want) {
				t.Errorf("error = %v, want it to mention %q", err, test.want)
			}
			if got := headless.IsTimeout(err); got != test.timeout {
				t.Errorf("IsTimeout = %v, want %v", got, test.timeout)
			}
		})
	}
}

func TestHTTPRendererSurfacesUnusableResponses(t *testing.T) {
	tests := []struct {
		name    string
		status  int
		body    string
		wantMsg string
	}{
		{"client error from a mismatched server", http.StatusNotFound, `{"error":"not found"}`, "404"},
		{"server error with no json body", http.StatusBadGateway, "<html>gateway down</html>", "502"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
				w.WriteHeader(test.status)
				_, _ = w.Write([]byte(test.body))
			}))
			defer srv.Close()

			_, err := NewHTTPRenderer(srv.URL).Scrape(context.Background(), "https://example.com")
			if err == nil {
				t.Fatal("want an error, got nil")
			}
			if !strings.Contains(err.Error(), test.wantMsg) {
				t.Errorf("error = %v, want it to mention %q", err, test.wantMsg)
			}
		})
	}
}

func TestHTTPRendererReportsUnreachableServer(t *testing.T) {
	// Port 0 is never listening, so the connection attempt fails immediately.
	_, err := NewHTTPRenderer("http://127.0.0.1:0").Scrape(context.Background(), "https://example.com")
	if err == nil {
		t.Fatal("want an error, got nil")
	}
	if !strings.Contains(err.Error(), "reach") {
		t.Errorf("error = %v, want it to name the unreachable address", err)
	}
}

package server

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"pagify/internal/workspace"
)

// apiHandlerFor builds an API handler rooted at a temporary directory holding
// the given files, keyed by slash-separated relative path.
func apiHandlerFor(t *testing.T, files map[string]string) http.Handler {
	t.Helper()
	root := t.TempDir()
	for name, content := range files {
		path := filepath.Join(root, filepath.FromSlash(name))
		if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
			t.Fatalf("create directory for %s: %v", name, err)
		}
		if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
			t.Fatalf("write %s: %v", name, err)
		}
	}
	ws, err := workspace.NewWorkspace(root)
	if err != nil {
		t.Fatalf("NewWorkspace: %v", err)
	}
	return apiHandler(ws)
}

func post(handler http.Handler, path, body string) *httptest.ResponseRecorder {
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodPost, path, strings.NewReader(body))
	handler.ServeHTTP(recorder, request)
	return recorder
}

func TestHealthReportsOK(t *testing.T) {
	handler := apiHandlerFor(t, nil)
	recorder := httptest.NewRecorder()
	handler.ServeHTTP(recorder, httptest.NewRequest(http.MethodGet, "/api/v1/health", nil))

	if recorder.Code != http.StatusOK {
		t.Fatalf("GET /api/v1/health = %d, want %d", recorder.Code, http.StatusOK)
	}
	var body map[string]string
	if err := json.Unmarshal(recorder.Body.Bytes(), &body); err != nil {
		t.Fatalf("invalid JSON: %v", err)
	}
	if body["status"] != "ok" {
		t.Errorf("status = %q, want %q", body["status"], "ok")
	}
}

func TestBuildRendersPageAsHTML(t *testing.T) {
	handler := apiHandlerFor(t, map[string]string{"index.md": "# Home\n", "guide/index.md": "# Guide\n"})

	recorder := post(handler, "/api/v1/build", `{"path":"/guide/"}`)
	if recorder.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", recorder.Code, http.StatusOK)
	}
	if got := recorder.Header().Get("Content-Type"); got != "text/html; charset=utf-8" {
		t.Errorf("Content-Type = %q, want HTML", got)
	}
	if !strings.Contains(recorder.Body.String(), "Guide") {
		t.Errorf("body does not contain the rendered page:\n%s", recorder.Body.String())
	}
}

func TestBuildDefaultsToRootPage(t *testing.T) {
	handler := apiHandlerFor(t, map[string]string{"index.md": "# Home\n"})

	recorder := post(handler, "/api/v1/build", `{}`)
	if recorder.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", recorder.Code, http.StatusOK)
	}
	if !strings.Contains(recorder.Body.String(), "Home") {
		t.Error("an omitted path did not render the site root")
	}
}

func TestBuildScopesToRequestedContentDir(t *testing.T) {
	handler := apiHandlerFor(t, map[string]string{"docs/index.md": "# Docs Home\n"})

	recorder := post(handler, "/api/v1/build", `{"content":"docs","path":"/"}`)
	if recorder.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", recorder.Code, http.StatusOK)
	}
	if !strings.Contains(recorder.Body.String(), "Docs Home") {
		t.Error("the content field did not select the inner directory")
	}
}

func TestBuildFailureStatuses(t *testing.T) {
	handler := apiHandlerFor(t, map[string]string{"index.md": "# Home\n"})

	tests := []struct {
		name string
		path string
		body string
		want int
	}{
		{name: "unknown page", path: "/api/v1/build", body: `{"path":"/absent/"}`, want: http.StatusNotFound},
		{name: "missing content directory", path: "/api/v1/build", body: `{"content":"absent"}`, want: http.StatusNotFound},
		{name: "escaping content directory", path: "/api/v1/build", body: `{"content":"../secret"}`, want: http.StatusBadRequest},
		{name: "invalid JSON", path: "/api/v1/build", body: `{`, want: http.StatusBadRequest},
		{name: "unknown field", path: "/api/v1/build", body: `{"oops":1}`, want: http.StatusBadRequest},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if got := post(handler, test.path, test.body).Code; got != test.want {
				t.Errorf("POST %s = %d, want %d", test.path, got, test.want)
			}
		})
	}
}

func TestBuildRejectsNonPost(t *testing.T) {
	handler := apiHandlerFor(t, map[string]string{"index.md": "# Home\n"})

	recorder := httptest.NewRecorder()
	handler.ServeHTTP(recorder, httptest.NewRequest(http.MethodGet, "/api/v1/build", nil))

	if recorder.Code != http.StatusMethodNotAllowed {
		t.Errorf("GET /api/v1/build = %d, want %d", recorder.Code, http.StatusMethodNotAllowed)
	}
}

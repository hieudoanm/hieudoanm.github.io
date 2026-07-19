package server

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"pagify/internal/workspace"
)

func TestOpenAPIHandlerReturnsValidV3Document(t *testing.T) {
	rec := httptest.NewRecorder()
	handleOpenAPI(rec, httptest.NewRequest(http.MethodGet, "/openapi.json", nil))

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}
	if got := rec.Header().Get("Content-Type"); got != "application/json" {
		t.Errorf("Content-Type = %q, want %q", got, "application/json")
	}

	var doc map[string]any
	if err := json.Unmarshal(rec.Body.Bytes(), &doc); err != nil {
		t.Fatalf("invalid JSON: %v", err)
	}
	if version, _ := doc["openapi"].(string); !strings.HasPrefix(version, "3.0") {
		t.Errorf("openapi = %q, want a 3.0.x version", version)
	}
}

func TestSwaggerUIHandlerServesHTMLPointingAtSpec(t *testing.T) {
	rec := httptest.NewRecorder()
	handleSwaggerUI(rec, httptest.NewRequest(http.MethodGet, "/api/v1/docs", nil))

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}
	if got := rec.Header().Get("Content-Type"); got != "text/html; charset=utf-8" {
		t.Errorf("Content-Type = %q, want %q", got, "text/html; charset=utf-8")
	}
	if body := rec.Body.String(); !strings.Contains(body, "SwaggerUIBundle") || !strings.Contains(body, "/api/v1/openapi.json") {
		t.Errorf("Swagger UI HTML should boot from /api/v1/openapi.json:\n%s", body)
	}
}

func TestAPIHandlerServesDocsEndpoints(t *testing.T) {
	ws, err := workspace.NewWorkspace(t.TempDir())
	if err != nil {
		t.Fatalf("NewWorkspace: %v", err)
	}
	handler := apiHandler(ws)

	for _, path := range []string{"/api/v1/openapi.json", "/api/v1/docs"} {
		rec := httptest.NewRecorder()
		handler.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, path, nil))
		if rec.Code != http.StatusOK {
			t.Errorf("GET %s = %d, want %d", path, rec.Code, http.StatusOK)
		}
	}
}

func TestPreviewDoesNotServeDocsEndpoints(t *testing.T) {
	_, request := preview(t, map[string]string{"index.md": "# Home\n"})

	for _, path := range []string{"/api/v1/openapi.json", "/api/v1/docs"} {
		if got := request(path).Code; got != http.StatusNotFound {
			t.Errorf("GET %s = %d, want %d; preview serves static files only", path, got, http.StatusNotFound)
		}
	}
}

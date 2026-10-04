package server

import (
	"fmt"
	"net"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"pagify/internal/build"
)

// serve starts a preview handler over the given content and returns its root
// directory plus a recorder for issuing requests.
func serve(t *testing.T, files map[string]string) (root string, request func(path string) *httptest.ResponseRecorder) {
	t.Helper()
	base := t.TempDir()
	contentDir := filepath.Join(base, "docs")
	root = filepath.Join(base, "dist")

	if err := os.MkdirAll(contentDir, 0o755); err != nil {
		t.Fatalf("create content directory: %v", err)
	}
	for name, content := range files {
		path := filepath.Join(contentDir, filepath.FromSlash(name))
		if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
			t.Fatalf("create directory for %s: %v", name, err)
		}
		if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
			t.Fatalf("write %s: %v", name, err)
		}
	}

	handler := previewHandler(contentDir, root)
	return root, func(path string) *httptest.ResponseRecorder {
		recorder := httptest.NewRecorder()
		handler.ServeHTTP(recorder, httptest.NewRequest(http.MethodGet, path, nil))
		return recorder
	}
}

func TestServeResolvesDirectoryURLs(t *testing.T) {
	files := map[string]string{
		"index.md":       "# Home\n",
		"guide/index.md": "# Guide\n",
	}

	tests := []struct {
		url  string
		want int
	}{
		{url: "/", want: http.StatusOK},
		{url: "/guide/", want: http.StatusOK},
		{url: "/guide", want: http.StatusOK},
	}

	for _, test := range tests {
		t.Run(test.url, func(t *testing.T) {
			_, request := serve(t, files)
			if got := request(test.url).Code; got != test.want {
				t.Errorf("GET %s = %d, want %d", test.url, got, test.want)
			}
		})
	}
}

func TestServeRebuildsOnRequest(t *testing.T) {
	root, request := serve(t, map[string]string{"index.md": "# Home\n"})

	if got := request("/").Code; got != http.StatusOK {
		t.Fatalf("first request = %d, want %d", got, http.StatusOK)
	}

	edited := filepath.Join(root, "..", "docs", "index.md")
	if err := os.WriteFile(edited, []byte("# Renamed Page\n"), 0o644); err != nil {
		t.Fatalf("edit content: %v", err)
	}

	body := request("/").Body.String()
	if !containsText(body, "Renamed Page") {
		t.Error("the second request did not serve the edited content")
	}
}

func TestServeServesThemeAssets(t *testing.T) {
	_, request := serve(t, map[string]string{"index.md": "# Home\n"})

	response := request("/assets/styles.css")
	if response.Code != http.StatusOK {
		t.Fatalf("GET /assets/styles.css = %d, want %d", response.Code, http.StatusOK)
	}
	if contentType := response.Header().Get("Content-Type"); contentType == "" {
		t.Error("no Content-Type on the stylesheet response")
	}
}

func TestServeRendersNotFound(t *testing.T) {
	files := map[string]string{"index.md": "# Home\n"}

	tests := []struct {
		name string
		url  string
	}{
		{name: "absent page", url: "/absent-page"},
		{name: "absent nested page", url: "/guide/absent/"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			_, request := serve(t, files)
			response := request(test.url)
			if response.Code != http.StatusNotFound {
				t.Fatalf("GET %s = %d, want %d", test.url, response.Code, http.StatusNotFound)
			}
			if contentType := response.Header().Get("Content-Type"); contentType != "text/html; charset=utf-8" {
				t.Errorf("Content-Type = %q, want HTML", contentType)
			}
			if !containsText(response.Body.String(), "404") {
				t.Errorf("the 404 body does not mention 404:\n%s", response.Body.String())
			}
		})
	}
}

func TestServeAppliesBasePath(t *testing.T) {
	files := map[string]string{
		"index.md":       "# Home\n",
		"guide/index.md": "# Guide\n",
		"pagify.yaml":    "basePath: /my-repo\n",
	}

	tests := []struct {
		name string
		url  string
		want int
	}{
		{name: "site root", url: "/my-repo/", want: http.StatusOK},
		{name: "base path without a slash", url: "/my-repo", want: http.StatusOK},
		{name: "page under the base path", url: "/my-repo/guide/", want: http.StatusOK},
		{name: "asset under the base path", url: "/my-repo/assets/styles.css", want: http.StatusOK},
		{name: "outside the base path", url: "/", want: http.StatusNotFound},
		{name: "a longer prefix is not the base path", url: "/my-repository/", want: http.StatusNotFound},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			_, request := serve(t, files)
			if got := request(test.url).Code; got != test.want {
				t.Errorf("GET %s = %d, want %d", test.url, got, test.want)
			}
		})
	}
}

func TestServeFailsOnMissingContentDirectory(t *testing.T) {
	base := t.TempDir()
	handler := previewHandler(filepath.Join(base, "absent"), filepath.Join(base, "dist"))

	recorder := httptest.NewRecorder()
	handler.ServeHTTP(recorder, httptest.NewRequest(http.MethodGet, "/", nil))

	if recorder.Code != http.StatusNotFound {
		t.Errorf("status = %d, want %d when the content directory is missing", recorder.Code, http.StatusNotFound)
	}
}

func TestServeAnnouncesTheURLItListensOn(t *testing.T) {
	announced := make(chan string, 1)
	go func() {
		// Port zero asks the OS for a free port, so nothing can collide.
		err := Serve(t.TempDir(), Options{Port: 0, Announce: func(url string) { announced <- url }})
		if err != nil {
			t.Errorf("Serve: %v", err)
		}
	}()

	select {
	case url := <-announced:
		if !strings.HasPrefix(url, "http://127.0.0.1:") {
			t.Errorf("announced %q, want a loopback URL", url)
		}
	case <-time.After(5 * time.Second):
		t.Fatal("Serve never announced its URL")
	}
}

func TestServeReportsABusyPort(t *testing.T) {
	held, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("reserve a port: %v", err)
	}
	defer func() { _ = held.Close() }()

	port := held.Addr().(*net.TCPAddr).Port
	err = Serve(t.TempDir(), Options{Port: port})
	if err == nil {
		t.Fatal("Serve accepted a port that was already in use")
	}
	if !strings.Contains(err.Error(), fmt.Sprintf("%d", port)) {
		t.Errorf("error %q does not name the port that was busy", err)
	}
}

func TestBuildIsUsableThroughServe(t *testing.T) {
	contentDir := filepath.Join(t.TempDir(), "docs")
	outputDir := filepath.Join(t.TempDir(), "dist")

	if err := os.MkdirAll(contentDir, 0o755); err != nil {
		t.Fatalf("create content directory: %v", err)
	}
	if err := os.WriteFile(filepath.Join(contentDir, "index.md"), []byte("# Home\n"), 0o644); err != nil {
		t.Fatalf("write index: %v", err)
	}

	if _, err := build.Build(build.Options{ContentDir: contentDir, OutputDir: outputDir}); err != nil {
		t.Fatalf("Build: %v", err)
	}
}

// containsText reports whether needle appears in haystack.
func containsText(haystack, needle string) bool {
	return strings.Contains(haystack, needle)
}

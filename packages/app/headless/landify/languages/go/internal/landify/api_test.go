package landify

import (
	"context"
	"encoding/json"
	"io"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

// validConfigYAML is the smallest config that passes validation: the base site
// fields plus one faq item.
const validConfigYAML = `type: faq
site:
  name: Example
  description: An example site
  nav:
    - label: Home
      href: /
footer:
  copyright: "(c) 2026 Example"
hero:
  headline: Hello
  subheadline: World
faq:
  items:
    - question: Is it fast?
      answer: Yes.
`

func startAPI(t *testing.T, root string) (string, func()) {
	t.Helper()
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	ctx, cancel := context.WithCancel(context.Background())
	done := make(chan error, 1)
	go func() { done <- ServeAPI(ctx, root, ln) }()

	stop := func() {
		cancel()
		select {
		case <-done:
		case <-time.After(5 * time.Second):
			t.Fatal("ServeAPI did not stop after cancel")
		}
	}
	return "http://" + ln.Addr().String(), stop
}

func seedFile(t *testing.T, root, name, content string) {
	t.Helper()
	if err := os.WriteFile(filepath.Join(root, name), []byte(content), 0o644); err != nil {
		t.Fatal(err)
	}
}

func postJSON(t *testing.T, base, path, body string) (*http.Response, []byte) {
	t.Helper()
	resp, err := http.Post(base+path, "application/json", strings.NewReader(body))
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()
	data, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Fatal(err)
	}
	return resp, data
}

func TestAPIHealthReportsOK(t *testing.T) {
	base, stop := startAPI(t, t.TempDir())
	defer stop()

	resp, err := http.Get(base + "/api/v1/health")
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("health = %d, want 200", resp.StatusCode)
	}
}

func TestAPIBuildReturnsRenderedHTML(t *testing.T) {
	root := t.TempDir()
	seedFile(t, root, "landify.yaml", validConfigYAML)
	base, stop := startAPI(t, root)
	defer stop()

	resp, data := postJSON(t, base, "/api/v1/build", `{}`)
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("build = %d, want 200: %s", resp.StatusCode, data)
	}
	if got := resp.Header.Get("Content-Type"); got != "text/html; charset=utf-8" {
		t.Errorf("Content-Type = %q, want text/html", got)
	}
	if !strings.Contains(string(data), "Hello") {
		t.Errorf("rendered page should contain the headline:\n%s", data)
	}
}

func TestAPIBuildRejectsEscapingPaths(t *testing.T) {
	root := t.TempDir()
	seedFile(t, root, "landify.yaml", validConfigYAML)
	base, stop := startAPI(t, root)
	defer stop()

	for _, file := range []string{"../outside.yaml", "/etc/passwd"} {
		body := `{"file":"` + file + `"}`
		resp, _ := postJSON(t, base, "/api/v1/build", body)
		if resp.StatusCode != http.StatusBadRequest {
			t.Errorf("build file=%q = %d, want 400", file, resp.StatusCode)
		}
	}
}

func TestAPIBuildMissingConfigIsNotFound(t *testing.T) {
	base, stop := startAPI(t, t.TempDir())
	defer stop()

	resp, _ := postJSON(t, base, "/api/v1/build", `{"file":"absent.yaml"}`)
	if resp.StatusCode != http.StatusNotFound {
		t.Errorf("build missing = %d, want 404", resp.StatusCode)
	}
}

func TestAPIValidateReportsSchemaErrors(t *testing.T) {
	root := t.TempDir()
	seedFile(t, root, "bad.yaml", "type: nonsense\n")
	base, stop := startAPI(t, root)
	defer stop()

	resp, data := postJSON(t, base, "/api/v1/validate", `{"file":"bad.yaml"}`)
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("validate = %d, want 200", resp.StatusCode)
	}
	var result validateResponse
	if err := json.Unmarshal(data, &result); err != nil {
		t.Fatalf("invalid JSON: %v", err)
	}
	if result.Valid || len(result.Errors) == 0 {
		t.Errorf("invalid config should report errors, got %+v", result)
	}
}

func TestAPIValidateAcceptsValidConfig(t *testing.T) {
	root := t.TempDir()
	seedFile(t, root, "landify.yaml", validConfigYAML)
	base, stop := startAPI(t, root)
	defer stop()

	resp, data := postJSON(t, base, "/api/v1/validate", `{}`)
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("validate = %d, want 200", resp.StatusCode)
	}
	var result validateResponse
	if err := json.Unmarshal(data, &result); err != nil {
		t.Fatalf("invalid JSON: %v", err)
	}
	if !result.Valid {
		t.Errorf("valid config reported invalid: %v", result.Errors)
	}
}

func TestAPIThemesListsEveryPreset(t *testing.T) {
	base, stop := startAPI(t, t.TempDir())
	defer stop()

	resp, err := http.Get(base + "/api/v1/themes")
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("themes = %d, want 200", resp.StatusCode)
	}
	var payload struct {
		Themes []themeInfo `json:"themes"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&payload); err != nil {
		t.Fatalf("invalid JSON: %v", err)
	}
	if len(payload.Themes) != 64 {
		t.Errorf("themes = %d, want 64", len(payload.Themes))
	}
}

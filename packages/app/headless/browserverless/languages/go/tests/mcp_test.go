package tests

import (
	"encoding/base64"
	"encoding/json"
	"strings"
	"testing"
)

func TestMCPInitializeAndListTools(t *testing.T) {
	session := startMCP(t, buildFreshBinary(t))

	session.send(t, `{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","clientInfo":{"name":"e2e","version":"1.0"}}}`)
	var initialized struct {
		ProtocolVersion string `json:"protocolVersion"`
		ServerInfo      struct {
			Name    string `json:"name"`
			Version string `json:"version"`
		} `json:"serverInfo"`
	}
	response := session.receive(t)
	if err := json.Unmarshal(response.Result, &initialized); err != nil {
		t.Fatalf("decode initialize: %v", err)
	}
	if initialized.ServerInfo.Name != "browserverless-mcp" {
		t.Errorf("server name = %q, want browserverless-mcp", initialized.ServerInfo.Name)
	}
	if initialized.ServerInfo.Version == "" {
		t.Error("server version is empty")
	}
	if initialized.ProtocolVersion != "2025-11-25" {
		t.Errorf("protocol version = %q, want 2025-11-25", initialized.ProtocolVersion)
	}

	session.send(t, `{"jsonrpc":"2.0","method":"notifications/initialized"}`)

	session.send(t, `{"jsonrpc":"2.0","id":2,"method":"tools/list"}`)
	var listed struct {
		Tools []struct {
			Name        string `json:"name"`
			InputSchema struct {
				Type       string   `json:"type"`
				Required   []string `json:"required"`
				Properties map[string]struct {
					Type        string `json:"type"`
					Description string `json:"description"`
				} `json:"properties"`
			} `json:"inputSchema"`
		} `json:"tools"`
	}
	if err := json.Unmarshal(session.receive(t).Result, &listed); err != nil {
		t.Fatalf("decode tools/list: %v", err)
	}

	want := []string{"browserverless_scrape", "browserverless_screenshot", "browserverless_version"}
	if len(listed.Tools) != len(want) {
		t.Fatalf("got %d tools, want %d", len(listed.Tools), len(want))
	}
	for i, name := range want {
		if listed.Tools[i].Name != name {
			t.Errorf("tool[%d] = %q, want %q", i, listed.Tools[i].Name, name)
		}
	}
	if _, ok := listed.Tools[0].InputSchema.Properties["url"]; !ok {
		t.Error("scrape schema has no url property")
	}
	if listed.Tools[0].InputSchema.Properties["url"].Description == "" {
		t.Error("url property has no description for the model to read")
	}
}

func TestMCPVersionTool(t *testing.T) {
	session := startMCP(t, buildFreshBinary(t))

	result := session.callTool(t, 1, "browserverless_version", nil)
	if result.IsError {
		t.Fatalf("version tool errored: %s", result.Content[0].Text)
	}
	if !strings.Contains(result.Content[0].Text, "browserverless-mcp") {
		t.Errorf("version payload = %q, want the server name", result.Content[0].Text)
	}
}

func TestMCPInProcessRenderTools(t *testing.T) {
	fixture := newFixture(t)
	session := startMCP(t, buildFreshBinary(t))

	scraped := session.callTool(t, 1, "browserverless_scrape", map[string]any{"url": fixture.URL})
	if scraped.IsError {
		t.Fatalf("scrape errored: %s", scraped.Content[0].Text)
	}
	if !strings.Contains(scraped.Content[0].Text, "Integration Fixture Content") {
		t.Errorf("scrape text = %q, want the rendered fixture", scraped.Content[0].Text)
	}

	shot := session.callTool(t, 2, "browserverless_screenshot", map[string]any{"url": fixture.URL})
	if shot.IsError {
		t.Fatalf("screenshot errored: %s", shot.Content[0].Text)
	}
	if len(shot.Content) != 2 {
		t.Fatalf("got %d content blocks, want text and image", len(shot.Content))
	}
	if shot.Content[1].Type != "image" || shot.Content[1].MimeType != "image/png" {
		t.Fatalf("second block = %+v, want a png image", shot.Content[1])
	}
	png, err := base64.StdEncoding.DecodeString(shot.Content[1].Data)
	if err != nil {
		t.Fatalf("image data is not base64: %v", err)
	}
	if len(png) < 8 || string(png[1:4]) != "PNG" {
		t.Errorf("decoded image = %d bytes, want a PNG", len(png))
	}
}

func TestMCPToolErrorsAreReportedNotFatal(t *testing.T) {
	session := startMCP(t, buildFreshBinary(t))

	tests := []struct {
		name    string
		tool    string
		args    any
		wantMsg string
	}{
		{"missing url", "browserverless_scrape", map[string]any{}, "missing required argument: url"},
		{"unsupported scheme", "browserverless_scrape", map[string]any{"url": "ftp://host"}, "unsupported scheme"},
		{"unreachable host", "browserverless_scrape", map[string]any{"url": "http://127.0.0.1:1"}, "scrape failed"},
	}

	id := 1
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			result := session.callTool(t, id, test.tool, test.args)
			id++
			if !result.IsError {
				t.Fatalf("want a tool error, got success: %+v", result)
			}
			if !strings.Contains(result.Content[0].Text, test.wantMsg) {
				t.Errorf("text = %q, want it to mention %q", result.Content[0].Text, test.wantMsg)
			}
		})
	}

	// The session must still work after those failures.
	if result := session.callTool(t, 90, "browserverless_version", nil); result.IsError {
		t.Errorf("session unusable after tool errors: %s", result.Content[0].Text)
	}
}

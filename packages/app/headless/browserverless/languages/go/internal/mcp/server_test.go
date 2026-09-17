package mcp

import (
	"bytes"
	"context"
	"encoding/json"
	"strings"
	"testing"

	"github.com/hieudoanm/browserverless/internal/version"
)

// driveServer registers the tool surface on a fresh server, feeds frames, and
// returns the decoded responses. Tests assert on responses rather than on
// transport details.
func driveServer(t *testing.T, renderer Renderer, frames ...string) []Response {
	t.Helper()

	var out bytes.Buffer
	server := NewServerWithIO(&out)
	Register(server, renderer)

	input := strings.Join(frames, "\n") + "\n"
	if err := server.runWithReader(context.Background(), strings.NewReader(input)); err != nil {
		t.Fatalf("runWithReader: %v", err)
	}

	var responses []Response
	for _, line := range strings.Split(strings.TrimSpace(out.String()), "\n") {
		if line == "" {
			continue
		}
		var response Response
		if err := json.Unmarshal([]byte(line), &response); err != nil {
			t.Fatalf("decode response %q: %v", line, err)
		}
		responses = append(responses, response)
	}
	return responses
}

func TestInitializeAdvertisesToolsAndVersion(t *testing.T) {
	responses := driveServer(t, &fakeRenderer{},
		`{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25"}}`)

	if len(responses) != 1 {
		t.Fatalf("want 1 response, got %d", len(responses))
	}
	var result InitializeResult
	decodeResult(t, responses[0], &result)

	if result.ProtocolVersion != ProtocolVersion {
		t.Errorf("protocol version = %q, want %q", result.ProtocolVersion, ProtocolVersion)
	}
	if result.Capabilities.Tools == nil {
		t.Error("tools capability not advertised")
	}
	if result.ServerInfo.Name != ServerName {
		t.Errorf("server name = %q, want %q", result.ServerInfo.Name, ServerName)
	}
	if result.ServerInfo.Version != version.Version {
		t.Errorf("server version = %q, want %q", result.ServerInfo.Version, version.Version)
	}
}

func TestToolsListIsSortedAndComplete(t *testing.T) {
	responses := driveServer(t, &fakeRenderer{}, `{"jsonrpc":"2.0","id":1,"method":"tools/list"}`)

	var result ListToolsResult
	decodeResult(t, responses[0], &result)

	want := []string{ToolScrape, ToolScreenshot, ToolVersion}
	if len(result.Tools) != len(want) {
		t.Fatalf("got %d tools, want %d", len(result.Tools), len(want))
	}
	for i, name := range want {
		if result.Tools[i].Name != name {
			t.Errorf("tool[%d] = %q, want %q", i, result.Tools[i].Name, name)
		}
	}
	for _, tool := range result.Tools {
		if tool.Description == "" {
			t.Errorf("tool %q has no description", tool.Name)
		}
		if tool.InputSchema.Type != "object" {
			t.Errorf("tool %q schema type = %q, want object", tool.Name, tool.InputSchema.Type)
		}
	}
}

func TestProtocolErrorFrames(t *testing.T) {
	tests := []struct {
		name    string
		frame   string
		wantID  string
		wantErr int
	}{
		{"undecodable frame", `not json`, "null", ErrCodeParse},
		{"wrong jsonrpc version", `{"jsonrpc":"1.0","id":2,"method":"ping"}`, "2", ErrCodeInvalidRequest},
		{"unknown method", `{"jsonrpc":"2.0","id":3,"method":"resources/list"}`, "3", ErrCodeMethodNotFound},
		{"unknown tool", `{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"nope"}}`, "4", ErrCodeMethodNotFound},
		{"malformed params", `{"jsonrpc":"2.0","id":5,"method":"tools/call","params":"oops"}`, "5", ErrCodeInvalidParams},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			responses := driveServer(t, &fakeRenderer{}, test.frame)

			if len(responses) != 1 {
				t.Fatalf("want 1 response, got %d", len(responses))
			}
			if responses[0].Error == nil {
				t.Fatal("want error response, got success")
			}
			if responses[0].Error.Code != test.wantErr {
				t.Errorf("code = %d, want %d", responses[0].Error.Code, test.wantErr)
			}
			if string(responses[0].ID) != test.wantID {
				t.Errorf("id = %s, want %s", responses[0].ID, test.wantID)
			}
		})
	}
}

func TestNotificationsAndBlankLinesProduceNoResponse(t *testing.T) {
	responses := driveServer(t, &fakeRenderer{},
		`{"jsonrpc":"2.0","method":"notifications/initialized"}`,
		``,
		`   `,
		`{"jsonrpc":"2.0","id":9,"method":"ping"}`)

	if len(responses) != 1 {
		t.Fatalf("want 1 response for the ping only, got %d", len(responses))
	}
	if responses[0].Error != nil {
		t.Errorf("ping returned an error: %+v", responses[0].Error)
	}
}

func TestRunWithReaderStopsOnContextCancel(t *testing.T) {
	server := NewServerWithIO(&bytes.Buffer{})
	ctx, cancel := context.WithCancel(context.Background())
	cancel()

	err := server.runWithReader(ctx, strings.NewReader(""))
	if err == nil {
		t.Fatal("want context error, got nil")
	}
	if !strings.Contains(err.Error(), "context canceled") {
		t.Errorf("error = %v, want context canceled", err)
	}
}

func decodeResult(t *testing.T, response Response, target any) {
	t.Helper()

	if response.Error != nil {
		t.Fatalf("unexpected error response: %+v", response.Error)
	}
	data, err := json.Marshal(response.Result)
	if err != nil {
		t.Fatalf("marshal result: %v", err)
	}
	if err := json.Unmarshal(data, target); err != nil {
		t.Fatalf("decode result into %T: %v", target, err)
	}
}

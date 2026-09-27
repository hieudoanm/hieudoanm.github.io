package mcp

import (
	"context"
	"encoding/json"
	"strings"
	"testing"
	"time"
)

func TestServerHandlesProtocolFrames(t *testing.T) {
	tests := []struct {
		name        string
		input       string
		wantErrCode int
		wantResult  string
	}{
		{
			name:       "initialize returns server info and tool capability",
			input:      `{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}`,
			wantResult: `"protocolVersion":"2025-11-25"`,
		},
		{
			name:       "ping returns empty result",
			input:      `{"jsonrpc":"2.0","id":2,"method":"ping"}`,
			wantResult: `"result":{}`,
		},
		{
			name:        "unknown method is method-not-found",
			input:       `{"jsonrpc":"2.0","id":3,"method":"nope"}`,
			wantErrCode: ErrCodeMethodNotFound,
		},
		{
			name:        "wrong jsonrpc version is invalid-request",
			input:       `{"jsonrpc":"1.0","id":4,"method":"ping"}`,
			wantErrCode: ErrCodeInvalidRequest,
		},
		{
			name:        "malformed json is a parse error",
			input:       `{"jsonrpc":"2.0",`,
			wantErrCode: ErrCodeParse,
		},
		{
			name:        "unknown tool is method-not-found",
			input:       `{"jsonrpc":"2.0","id":5,"method":"tools/call","params":{"name":"ghost","arguments":{}}}`,
			wantErrCode: ErrCodeMethodNotFound,
		},
		{
			name:        "invalid tools/call params is invalid-params",
			input:       `{"jsonrpc":"2.0","id":6,"method":"tools/call","params":"not-an-object"}`,
			wantErrCode: ErrCodeInvalidParams,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ws, _ := testWorkspace(t)
			out := runServer(t, ws, tt.input)

			var response Response
			decode(t, out, &response)
			if response.JSONRPC != "2.0" {
				t.Fatalf("expected jsonrpc 2.0, got %q", response.JSONRPC)
			}
			if tt.wantErrCode != 0 {
				if response.Error == nil {
					t.Fatalf("expected error %d, got result %s", tt.wantErrCode, out)
				}
				if response.Error.Code != tt.wantErrCode {
					t.Fatalf("expected error %d, got %d", tt.wantErrCode, response.Error.Code)
				}
				return
			}
			if !strings.Contains(out, tt.wantResult) {
				t.Fatalf("expected output to contain %s, got %s", tt.wantResult, out)
			}
		})
	}
}

func TestServerInitializeAdvertisesToolsOnly(t *testing.T) {
	ws, _ := testWorkspace(t)
	out := runServer(t, ws, `{"jsonrpc":"2.0","id":1,"method":"initialize"}`)

	var response struct {
		Result InitializeResult `json:"result"`
	}
	decode(t, out, &response)
	if response.Result.Capabilities.Tools == nil {
		t.Fatal("initialize should advertise the tools capability")
	}
	if response.Result.ServerInfo.Name != ServerName {
		t.Fatalf("expected server name %s, got %s", ServerName, response.Result.ServerInfo.Name)
	}
}

func TestServerListToolsIsSorted(t *testing.T) {
	ws, _ := testWorkspace(t)
	out := runServer(t, ws, `{"jsonrpc":"2.0","id":1,"method":"tools/list"}`)

	var response struct {
		Result ListToolsResult `json:"result"`
	}
	decode(t, out, &response)

	names := make([]string, 0, len(response.Result.Tools))
	for _, tool := range response.Result.Tools {
		names = append(names, tool.Name)
	}
	if len(names) != 6 {
		t.Fatalf("expected 6 tools, got %d: %v", len(names), names)
	}
	for i := 1; i < len(names); i++ {
		if names[i-1] >= names[i] {
			t.Fatalf("tools should be sorted by name, %q came before %q", names[i-1], names[i])
		}
	}
}

func TestServerDoesNotAnswerNotifications(t *testing.T) {
	ws, _ := testWorkspace(t)
	input := strings.Join([]string{
		`{"jsonrpc":"2.0","method":"notifications/initialized"}`,
		`{"jsonrpc":"2.0","method":"ping"}`,
		`{"jsonrpc":"2.0","id":9,"method":"tools/call","params":{"name":"landify_types","arguments":{}}}`,
	}, "\n") + "\n"

	lines := responseLines(t, runServer(t, ws, input))
	if len(lines) != 1 {
		t.Fatalf("a notification must not be answered, got %d frames: %v", len(lines), lines)
	}
	if !strings.Contains(lines[0], `"id":9`) {
		t.Fatalf("expected the one reply to be for the request, got %s", lines[0])
	}
}

func TestServerHandlesSeveralFramesInOneSession(t *testing.T) {
	ws, _ := testWorkspace(t)
	input := strings.Join([]string{
		`{"jsonrpc":"2.0","id":1,"method":"initialize"}`,
		`{"jsonrpc":"2.0","id":2,"method":"tools/list"}`,
		`{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"landify_types","arguments":{}}}`,
	}, "\n") + "\n"

	lines := responseLines(t, runServer(t, ws, input))
	if len(lines) != 3 {
		t.Fatalf("expected 3 frames, got %d", len(lines))
	}
	for i, want := range []string{`"id":1`, `"id":2`, `"id":3`} {
		if !strings.Contains(lines[i], want) {
			t.Fatalf("frame %d should answer %s, got %s", i, want, lines[i])
		}
	}
}

func TestServerStopsWhenTheContextIsCancelled(t *testing.T) {
	ws, _ := testWorkspace(t)
	server := NewServerWithIO(nil)
	Register(server, ws)

	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	done := make(chan error, 1)
	go func() { done <- server.runWithReader(ctx, blockingReader{}) }()

	select {
	case err := <-done:
		if err == nil {
			t.Fatal("expected the cancelled context to end the session with an error")
		}
	case <-time.After(2 * time.Second):
		t.Fatal("run did not return after the context was cancelled")
	}
}

func TestServerWriteReportsUnmarshalableResults(t *testing.T) {
	var out strings.Builder
	server := NewServerWithIO(&out)
	Register(server, mustWorkspace(t))

	// A channel cannot be JSON-encoded, so the server must swallow the
	// failure instead of panicking or emitting a half-written frame.
	server.write(NewSuccessResponse(json.RawMessage("1"), make(chan int)))

	if out.String() != "" {
		t.Fatalf("expected no frame for an unmarshalable result, got %q", out.String())
	}
}

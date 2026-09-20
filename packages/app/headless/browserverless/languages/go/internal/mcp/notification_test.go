package mcp

import (
	"bytes"
	"context"
	"encoding/json"
	"strings"
	"testing"
)

// exchange feeds frames to a server and returns the reply frames it wrote.
func exchange(t *testing.T, s *Server, input string) []string {
	t.Helper()

	var out bytes.Buffer
	s.mu.Lock()
	s.out = &out
	s.mu.Unlock()

	if err := s.runWithReader(context.Background(), strings.NewReader(input)); err != nil {
		t.Fatalf("run: %v", err)
	}

	var frames []string
	for _, line := range strings.Split(out.String(), "\n") {
		if trimmed := strings.TrimSpace(line); trimmed != "" {
			frames = append(frames, trimmed)
		}
	}
	return frames
}

// replyError pulls the error out of a reply frame.
func replyError(t *testing.T, frame string) *ErrorObject {
	t.Helper()

	var response struct {
		Error *ErrorObject `json:"error"`
	}
	if err := json.Unmarshal([]byte(frame), &response); err != nil {
		t.Fatalf("unmarshal %q: %v", frame, err)
	}
	return response.Error
}

// A notification carries no id, so it must never be answered. Answering one
// desynchronises the client, so this applies to every method, not just unknown
// ones — that was the bug this covers.
func TestNotificationsAreNeverAnsweredForAnyMethod(t *testing.T) {
	frames := []struct {
		name  string
		frame string
	}{
		{"initialize", `{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2025-11-25"}}`},
		{"ping", `{"jsonrpc":"2.0","method":"ping"}`},
		{"tools/list", `{"jsonrpc":"2.0","method":"tools/list"}`},
		{"tools/call", `{"jsonrpc":"2.0","method":"tools/call","params":{"name":"browserverless_version","arguments":{}}}`},
		{"unknown", `{"jsonrpc":"2.0","method":"resources/list"}`},
		{"null id", `{"jsonrpc":"2.0","id":null,"method":"ping"}`},
	}

	for _, tt := range frames {
		t.Run(tt.name, func(t *testing.T) {
			s := NewServer()
			s.AddTool(Tool{Name: "browserverless_version", Description: "reports the version"},
				func(ctx context.Context, args json.RawMessage) *ToolResult {
					return NewToolResultText("v")
				})

			if got := exchange(t, s, tt.frame+"\n"); len(got) != 0 {
				t.Fatalf("notification %s was answered with %v", tt.name, got)
			}
		})
	}
}

// A notification must not run the tool either, so no render is triggered.
func TestNotificationDoesNotRunTheTool(t *testing.T) {
	ran := false
	s := NewServer()
	s.AddTool(Tool{Name: "browserverless_scrape", Description: "renders a page"},
		func(ctx context.Context, args json.RawMessage) *ToolResult {
			ran = true
			return NewToolResultText("rendered")
		})

	frame := `{"jsonrpc":"2.0","method":"tools/call","params":{"name":"browserverless_scrape","arguments":{"url":"http://example.com"}}}`
	if got := exchange(t, s, frame+"\n"); len(got) != 0 {
		t.Fatalf("expected no reply, got %v", got)
	}
	if ran {
		t.Fatal("a notification ran the tool, triggering a render")
	}
}

// A notification that is also malformed stays silent: the notification check
// must precede the jsonrpc version check.
func TestMalformedNotificationIsNotAnswered(t *testing.T) {
	if got := exchange(t, NewServer(), "{\"method\":\"ping\"}\n"); len(got) != 0 {
		t.Fatalf("a malformed notification was answered with %v", got)
	}
}

// An empty string is a valid JSON-RPC id, not a notification, so it must be
// answered. Treating it as a notification would silently drop real requests.
func TestEmptyStringIDIsARequestNotANotification(t *testing.T) {
	frames := exchange(t, NewServer(), `{"jsonrpc":"2.0","id":"","method":"ping"}`+"\n")
	if len(frames) != 1 {
		t.Fatalf("expected one reply, got %v", frames)
	}
	if !strings.Contains(frames[0], `"id":""`) {
		t.Fatalf("expected the id to be echoed, got %q", frames[0])
	}
}

// Absent params are tolerated and name no tool, matching the other headless MCP
// servers. A params of the wrong type is still rejected.
func TestToolsCallParamsHandling(t *testing.T) {
	tests := []struct {
		name  string
		frame string
		code  int
	}{
		{
			name:  "absent params names no tool",
			frame: `{"jsonrpc":"2.0","id":1,"method":"tools/call"}`,
			code:  ErrCodeMethodNotFound,
		},
		{
			name:  "null params names no tool",
			frame: `{"jsonrpc":"2.0","id":1,"method":"tools/call","params":null}`,
			code:  ErrCodeMethodNotFound,
		},
		{
			name:  "params of the wrong type are rejected",
			frame: `{"jsonrpc":"2.0","id":1,"method":"tools/call","params":"nope"}`,
			code:  ErrCodeInvalidParams,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			frames := exchange(t, NewServer(), tt.frame+"\n")
			if len(frames) != 1 {
				t.Fatalf("expected one reply, got %v", frames)
			}
			if err := replyError(t, frames[0]); err == nil || err.Code != tt.code {
				t.Fatalf("expected code %d, got %v", tt.code, err)
			}
		})
	}
}

// The version is echoed when the server speaks it, and the server's latest is
// offered otherwise.
func TestInitializeNegotiatesTheProtocolVersion(t *testing.T) {
	tests := []struct {
		name    string
		request string
	}{
		{"supported version is echoed", ProtocolVersion},
		{"unsupported version falls back", "1999-01-01"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			frame := `{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"` +
				tt.request + `"}}`
			frames := exchange(t, NewServer(), frame+"\n")
			if len(frames) != 1 {
				t.Fatalf("expected one reply, got %v", frames)
			}
			if !strings.Contains(frames[0], ProtocolVersion) {
				t.Fatalf("expected protocol version %q, got %q", ProtocolVersion, frames[0])
			}
		})
	}
}

// A frame larger than the cap is reported as a parse error rather than being
// buffered, and the stream resynchronises on the next newline.
func TestOverlongFrameIsAParseErrorAndTheStreamRecovers(t *testing.T) {
	oversized := `{"jsonrpc":"2.0","id":1,"method":"ping","params":{"pad":"` +
		strings.Repeat("x", MaxFrameBytes) + `"}}`
	input := oversized + "\n" + `{"jsonrpc":"2.0","id":2,"method":"ping"}` + "\n"

	frames := exchange(t, NewServer(), input)
	if len(frames) < 2 {
		t.Fatalf("expected a parse error and a ping reply, got %v", frames)
	}
	if err := replyError(t, frames[0]); err == nil || err.Code != ErrCodeParse {
		t.Fatalf("expected a parse error, got %q", frames[0])
	}
	if !strings.Contains(frames[len(frames)-1], `"id":2`) {
		t.Fatalf("the stream did not resynchronise, got %q", frames[len(frames)-1])
	}
}

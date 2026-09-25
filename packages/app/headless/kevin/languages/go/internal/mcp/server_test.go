package mcp

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"strings"
	"testing"
	"time"
)

func TestServerInitialize(t *testing.T) {
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
			out := runServer(t, tt.input, nil)

			var response Response
			if err := json.Unmarshal([]byte(out), &response); err != nil {
				t.Fatalf("unmarshal response: %v", err)
			}
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
	out := runServer(t, `{"jsonrpc":"2.0","id":1,"method":"initialize"}`, nil)

	var response struct {
		Result InitializeResult `json:"result"`
	}
	if err := json.Unmarshal([]byte(out), &response); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}
	if response.Result.Capabilities.Tools == nil {
		t.Fatal("initialize should advertise the tools capability")
	}
	if response.Result.ServerInfo.Name != ServerName {
		t.Fatalf("expected server name %s, got %s", ServerName, response.Result.ServerInfo.Name)
	}
}

func TestServerListToolsIsSortedAndComplete(t *testing.T) {
	out := runServer(t, `{"jsonrpc":"2.0","id":1,"method":"tools/list"}`, nil)

	var response struct {
		Result ListToolsResult `json:"result"`
	}
	if err := json.Unmarshal([]byte(out), &response); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}
	if len(response.Result.Tools) != len(tools) {
		t.Fatalf("expected %d tools, got %d", len(tools), len(response.Result.Tools))
	}
	for i := 1; i < len(response.Result.Tools); i++ {
		previous := response.Result.Tools[i-1].Name
		current := response.Result.Tools[i].Name
		if previous >= current {
			t.Fatalf("tools should be sorted by name, %q came before %q", previous, current)
		}
	}
}

func TestServerEveryToolDeclaresAnObjectSchema(t *testing.T) {
	for _, tool := range tools {
		t.Run(tool.Name, func(t *testing.T) {
			if tool.Description == "" {
				t.Fatal("tool should have a description so the model can choose it")
			}
			if tool.InputSchema.Type != "object" {
				t.Fatalf("expected an object schema, got %q", tool.InputSchema.Type)
			}
		})
	}
}

func TestServerNotificationGetsNoReply(t *testing.T) {
	out := runServer(t, `{"jsonrpc":"2.0","method":"notifications/initialized"}`, nil)
	if out != "" {
		t.Fatalf("a notification should produce no output, got %q", out)
	}
}

func TestServerHandlesMultipleFrames(t *testing.T) {
	input := strings.Join([]string{
		`{"jsonrpc":"2.0","id":1,"method":"initialize"}`,
		"",
		`{"jsonrpc":"2.0","id":2,"method":"ping"}`,
		`{"jsonrpc":"2.0","id":3,"method":"tools/list"}`,
	}, "\n")

	out := runServer(t, input, nil)

	lines := responseLines(t, out)
	if len(lines) != 3 {
		t.Fatalf("expected 3 responses, got %d: %s", len(lines), out)
	}
	for i, wantID := range []string{"1", "2", "3"} {
		if !strings.Contains(lines[i], `"id":`+wantID) {
			t.Fatalf("response %d should carry id %s, got %s", i, wantID, lines[i])
		}
	}
}

func TestServerHandlesFrameWithoutTrailingNewline(t *testing.T) {
	out := runServer(t, `{"jsonrpc":"2.0","id":9,"method":"ping"}`, nil)
	if !strings.Contains(out, `"id":9`) {
		t.Fatalf("a final frame without a newline should still be handled, got %q", out)
	}
}

func TestServerCallToolReturnsHandlerResult(t *testing.T) {
	server := NewServerWithIO(nil)
	server.AddTool(Tool{Name: "echo", Description: "echo"}, func(args json.RawMessage) *ToolResult {
		return NewToolResultText(string(args))
	})

	out := runServerOn(t, server, `{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"echo","arguments":{"a":1}}}`)

	if strings.Contains(out, `"isError"`) {
		t.Fatalf("a successful result should not be flagged as an error, got %s", out)
	}
	if !strings.Contains(out, `{\"a\":1}`) {
		t.Fatalf("expected the arguments to be echoed, got %s", out)
	}
}

func TestServerCallToolPropagatesIsError(t *testing.T) {
	server := NewServerWithIO(nil)
	server.AddTool(Tool{Name: "boom", Description: "boom"}, func(json.RawMessage) *ToolResult {
		return NewToolResultError("it broke")
	})

	out := runServerOn(t, server, `{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"boom","arguments":{}}}`)

	if !strings.Contains(out, `"isError":true`) {
		t.Fatalf("expected isError true, got %s", out)
	}
	if !strings.Contains(out, "it broke") {
		t.Fatalf("expected the error text, got %s", out)
	}
}

func TestServerAddToolReplacesByName(t *testing.T) {
	server := NewServerWithIO(nil)
	server.AddTool(Tool{Name: "dup", Description: "first"}, func(json.RawMessage) *ToolResult {
		return NewToolResultText("first")
	})
	server.AddTool(Tool{Name: "dup", Description: "second"}, func(json.RawMessage) *ToolResult {
		return NewToolResultText("second")
	})

	out := runServerOn(t, server, `{"jsonrpc":"2.0","id":1,"method":"tools/list"}`)

	if strings.Contains(out, "first") {
		t.Fatalf("the first registration should have been replaced, got %s", out)
	}
	if !strings.Contains(out, "second") {
		t.Fatalf("expected the second registration, got %s", out)
	}
}

func TestServerRunWithContextStopsOnCancel(t *testing.T) {
	server := NewServerWithIO(nil)

	ctx, cancel := context.WithCancel(context.Background())
	cancel()

	// A reader that never yields a frame would hang without cancellation.
	err := server.runWithReader(ctx, &blockingReader{})
	if err == nil {
		t.Fatal("expected the cancelled context to end the loop")
	}
}

func TestServerRunWithReaderReturnsNilOnEOF(t *testing.T) {
	server := NewServerWithIO(nil)
	if err := server.runWithReader(context.Background(), strings.NewReader("")); err != nil {
		t.Fatalf("expected nil on clean EOF, got %v", err)
	}
}

func TestServerRunWithReaderReturnsReadError(t *testing.T) {
	server := NewServerWithIO(nil)
	err := server.runWithReader(context.Background(), &failingReader{})
	if err == nil {
		t.Fatal("expected a read error to be surfaced")
	}
}

func TestNewServerWritesToProvidedWriter(t *testing.T) {
	var out bytes.Buffer
	server := NewServerWithIO(&out)
	RegisterTools(server, NewDBStore(newTestDB()))

	if err := server.runWithReader(context.Background(), strings.NewReader(`{"jsonrpc":"2.0","id":1,"method":"ping"}`)); err != nil {
		t.Fatalf("run: %v", err)
	}
	if !strings.Contains(out.String(), `"id":1`) {
		t.Fatalf("expected the response on the provided writer, got %q", out.String())
	}
}

// helpers

// runServer drives a server with the full KeVIN tool set registered against a
// fresh in-process store.
func runServer(t *testing.T, input string, _ any) string {
	t.Helper()
	server := NewServerWithIO(nil)
	RegisterTools(server, NewDBStore(newTestDB()))
	return runServerOn(t, server, input)
}

// runServerOn drives the given server over one session and returns its output.
func runServerOn(t *testing.T, server *Server, input string) string {
	t.Helper()

	var out bytes.Buffer
	server.mu.Lock()
	server.out = &out
	server.mu.Unlock()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.runWithReader(ctx, strings.NewReader(input)); err != nil {
		t.Fatalf("run: %v", err)
	}
	return out.String()
}

// responseLines splits captured output into non-empty response frames.
func responseLines(t *testing.T, out string) []string {
	t.Helper()
	var lines []string
	for _, line := range strings.Split(strings.TrimSpace(out), "\n") {
		if line != "" {
			lines = append(lines, line)
		}
	}
	return lines
}

// blockingReader blocks forever, modelling a client that stays connected.
type blockingReader struct{}

func (r *blockingReader) Read([]byte) (int, error) {
	select {}
}

// failingReader always errors.
type failingReader struct{}

func (r *failingReader) Read([]byte) (int, error) {
	return 0, errRead
}

// errRead is the failure failingReader reports.
var errRead = errors.New("read failed")

// A notification carries no id, so it must never be answered. Answering one
// desynchronises the client, which is a protocol violation.
func TestNotificationsAreNeverAnswered(t *testing.T) {
	methods := []string{"initialize", "ping", "tools/list", "tools/call", "resources/list"}

	for _, method := range methods {
		t.Run(method, func(t *testing.T) {
			frame := `{"jsonrpc":"2.0","method":"` + method + `","params":{"name":"kevin_flush","arguments":{"confirm":true}}}`
			if out := runServer(t, frame, nil); out != "" {
				t.Fatalf("notification %s was answered with %q", method, out)
			}
		})
	}
}

// A tools/call notification must not run the tool. Otherwise a frame that omits
// an id can flush the store with no reply to carry the result.
func TestToolsCallNotificationDoesNotRunTheTool(t *testing.T) {
	store := NewDBStore(newTestDB())
	server := NewServerWithIO(nil)
	RegisterTools(server, store)

	frame := `{"jsonrpc":"2.0","method":"tools/call","params":{"name":"kevin_set","arguments":{"key":"a","value":"b"}}}`
	if out := runServerOn(t, server, frame); out != "" {
		t.Fatalf("expected no reply, got %q", out)
	}

	if _, found, err := store.Get("a"); err != nil || found {
		t.Fatalf("a notification ran the tool: found=%v err=%v", found, err)
	}
}

// A malformed notification is still not answered: the version check must not
// precede the notification check.
func TestMalformedNotificationIsNotAnswered(t *testing.T) {
	if out := runServer(t, `{"method":"ping"}`, nil); out != "" {
		t.Fatalf("a malformed notification was answered with %q", out)
	}
}

// A frame larger than the cap is reported as a parse error rather than being
// buffered, and the stream resynchronises on the next newline.
func TestOverlongFrameIsAParseErrorAndTheStreamRecovers(t *testing.T) {
	oversized := `{"jsonrpc":"2.0","id":1,"method":"ping","params":{"pad":"` +
		strings.Repeat("x", MaxFrameBytes) + `"}}`
	input := oversized + "\n" + `{"jsonrpc":"2.0","id":2,"method":"ping"}` + "\n"

	lines := responseLines(t, runServer(t, input, nil))
	if len(lines) < 2 {
		t.Fatalf("expected a parse error and a ping reply, got %v", lines)
	}

	var first struct {
		ID    json.RawMessage `json:"id"`
		Error *ErrorObject    `json:"error"`
	}
	if err := json.Unmarshal([]byte(lines[0]), &first); err != nil {
		t.Fatalf("unmarshal %q: %v", lines[0], err)
	}
	if first.Error == nil || first.Error.Code != ErrCodeParse {
		t.Fatalf("expected a parse error, got %q", lines[0])
	}
	if !strings.Contains(lines[len(lines)-1], `"id":2`) {
		t.Fatalf("the stream did not resynchronise, got %q", lines[len(lines)-1])
	}
}

// The version is echoed when the server speaks it, and the server's latest is
// offered otherwise.
func TestInitializeNegotiatesTheProtocolVersion(t *testing.T) {
	tests := []struct {
		name    string
		request string
		want    string
	}{
		{"supported version is echoed", ProtocolVersion, ProtocolVersion},
		{"unsupported version falls back", "1999-01-01", ProtocolVersion},
		{"absent params fall back", "", ProtocolVersion},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			frame := `{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"` + tt.request + `"}}`
			if out := runServer(t, frame, nil); !strings.Contains(out, tt.want) {
				t.Fatalf("expected protocol version %q, got %q", tt.want, out)
			}
		})
	}
}

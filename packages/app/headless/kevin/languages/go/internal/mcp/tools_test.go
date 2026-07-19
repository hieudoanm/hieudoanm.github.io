package mcp

import (
	"encoding/json"
	"strings"
	"testing"
)

func TestToolsAreReachableOverTheProtocol(t *testing.T) {
	store := NewDBStore(newTestDB())
	if err := store.Set("greeting", "hello world", 0); err != nil {
		t.Fatalf("seed: %v", err)
	}
	if err := store.Set("temporary", "soon gone", 60); err != nil {
		t.Fatalf("seed: %v", err)
	}
	if err := store.Set("doomed", "bye", 0); err != nil {
		t.Fatalf("seed: %v", err)
	}

	tests := []struct {
		name      string
		call      string
		wantText  string
		wantError bool
	}{
		{
			name:     "ping",
			call:     `{"name":"kevin_ping","arguments":{}}`,
			wantText: `{"pong": true}`,
		},
		{
			name:     "set",
			call:     `{"name":"kevin_set","arguments":{"key":"fresh","value":"value"}}`,
			wantText: `{"ok": true}`,
		},
		{
			name:     "get returns a value with spaces intact",
			call:     `{"name":"kevin_get","arguments":{"key":"greeting"}}`,
			wantText: `{"found": true, "value": "hello world"}`,
		},
		{
			name:     "get reports a miss without erroring",
			call:     `{"name":"kevin_get","arguments":{"key":"absent"}}`,
			wantText: `{"found": false, "value": null}`,
		},
		{
			name:     "exists",
			call:     `{"name":"kevin_exists","arguments":{"key":"greeting"}}`,
			wantText: `{"exists": true}`,
		},
		{
			name:     "len",
			call:     `{"name":"kevin_len","arguments":{}}`,
			wantText: `{"count": 3}`,
		},
		{
			name:     "keys",
			call:     `{"name":"kevin_keys","arguments":{}}`,
			wantText: `"count": 3`,
		},
		{
			name:     "ttl of an expiring key",
			call:     `{"name":"kevin_ttl","arguments":{"key":"temporary"}}`,
			wantText: `"state": "expiring"`,
		},
		{
			name:     "ttl of a persistent key",
			call:     `{"name":"kevin_ttl","arguments":{"key":"greeting"}}`,
			wantText: `"state": "no-expiry"`,
		},
		{
			name:     "ttl of a missing key",
			call:     `{"name":"kevin_ttl","arguments":{"key":"absent"}}`,
			wantText: `"state": "missing"`,
		},
		{
			name:     "expire",
			call:     `{"name":"kevin_expire","arguments":{"key":"greeting","seconds":30}}`,
			wantText: `{"ok": true}`,
		},
		{
			name:     "del",
			call:     `{"name":"kevin_del","arguments":{"keys":["doomed"]}}`,
			wantText: `{"deleted": 1}`,
		},
		{
			name:     "flush",
			call:     `{"name":"kevin_flush","arguments":{"confirm":true}}`,
			wantText: `{"deleted": 3}`,
		},
		{
			name:      "flush without confirmation is refused",
			call:      `{"name":"kevin_flush","arguments":{"confirm":false}}`,
			wantError: true,
		},
		{
			name:      "set without a value is refused",
			call:      `{"name":"kevin_set","arguments":{"key":"k"}}`,
			wantError: true,
		},
		{
			name:      "set with a blank key is refused",
			call:      `{"name":"kevin_set","arguments":{"key":"  ","value":"v"}}`,
			wantError: true,
		},
		{
			name:      "del with no keys is refused",
			call:      `{"name":"kevin_del","arguments":{"keys":[]}}`,
			wantError: true,
		},
		{
			name:      "expire with a non-positive ttl is refused",
			call:      `{"name":"kevin_expire","arguments":{"key":"k","seconds":0}}`,
			wantError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Each case runs against its own seeded store so the flush and
			// delete cases cannot disturb their neighbours.
			seeded := NewDBStore(newTestDB())
			if err := seeded.Set("greeting", "hello world", 0); err != nil {
				t.Fatalf("seed: %v", err)
			}
			if err := seeded.Set("temporary", "soon gone", 60); err != nil {
				t.Fatalf("seed: %v", err)
			}
			if err := seeded.Set("doomed", "bye", 0); err != nil {
				t.Fatalf("seed: %v", err)
			}

			result := callTool(t, seeded, tt.call)
			if tt.wantError {
				if !result.IsError {
					t.Fatalf("expected a tool error, got %s", resultText(result))
				}
				return
			}
			if result.IsError {
				t.Fatalf("unexpected tool error: %s", resultText(result))
			}
			if !strings.Contains(resultText(result), tt.wantText) {
				t.Fatalf("expected text containing %s, got %s", tt.wantText, resultText(result))
			}
		})
	}
}

func TestToolsRejectMalformedArguments(t *testing.T) {
	store := NewDBStore(newTestDB())

	tests := []struct {
		name string
		call string
	}{
		{name: "arguments are not an object", call: `{"name":"kevin_get","arguments":"nope"}`},
		{name: "key is the wrong type", call: `{"name":"kevin_get","arguments":{"key":42}}`},
		{name: "key is explicitly null", call: `{"name":"kevin_get","arguments":{"key":null}}`},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if result := callTool(t, store, tt.call); !result.IsError {
				t.Fatalf("expected a tool error, got %s", resultText(result))
			}
		})
	}
}

func TestToolsTolerateAbsentArguments(t *testing.T) {
	// A tool that needs no arguments must still work when the client omits the
	// arguments member entirely, or sends an explicit null.
	for _, call := range []string{`{"name":"kevin_len"}`, `{"name":"kevin_len","arguments":null}`} {
		t.Run(call, func(t *testing.T) {
			result := callTool(t, NewDBStore(newTestDB()), call)
			if result.IsError {
				t.Fatalf("expected success, got %s", resultText(result))
			}
			if !strings.Contains(resultText(result), `"count": 0`) {
				t.Fatalf("expected an empty count, got %s", resultText(result))
			}
		})
	}
}

func TestHandlerForRejectsAnUnknownTool(t *testing.T) {
	handler := handlerFor("not_a_tool", NewDBStore(newTestDB()))
	result := handler(json.RawMessage(`{}`))
	if !result.IsError {
		t.Fatal("expected an error for an unknown tool")
	}
	if !strings.Contains(resultText(result), "unknown tool") {
		t.Fatalf("expected the error to name the tool, got %s", resultText(result))
	}
}

func TestEveryToolHasAHandler(t *testing.T) {
	store := NewDBStore(newTestDB())
	for _, tool := range tools {
		t.Run(tool.Name, func(t *testing.T) {
			handler := handlerFor(tool.Name, store)
			if handler == nil {
				t.Fatal("every declared tool needs a handler")
			}
		})
	}
}

func TestToolsRejectEveryRequiredArgument(t *testing.T) {
	// Each tool declares its required properties; calling it with an empty
	// argument object must not silently succeed with a nonsense result.
	tests := []struct {
		tool string
		call string
	}{
		{tool: "kevin_set", call: `{"name":"kevin_set","arguments":{}}`},
		{tool: "kevin_get", call: `{"name":"kevin_get","arguments":{}}`},
		{tool: "kevin_del", call: `{"name":"kevin_del","arguments":{}}`},
		{tool: "kevin_flush", call: `{"name":"kevin_flush","arguments":{}}`},
	}

	store := NewDBStore(newTestDB())
	for _, tt := range tests {
		t.Run(tt.tool, func(t *testing.T) {
			if result := callTool(t, store, tt.call); !result.IsError {
				t.Fatalf("expected %s to require its arguments, got %s", tt.tool, resultText(result))
			}
		})
	}
}

func TestObjectOrEmptyTreatsNullAsAnEmptyObject(t *testing.T) {
	tests := []struct {
		name   string
		params json.RawMessage
	}{
		{"absent", nil},
		{"null", json.RawMessage(`null`)},
		{"empty object", json.RawMessage(`{}`)},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var target struct {
				Key string `json:"key"`
			}
			if err := json.Unmarshal(objectOrEmpty(tt.params), &target); err != nil {
				t.Fatalf("unmarshal %q: %v", string(objectOrEmpty(tt.params)), err)
			}
			if target.Key != "" {
				t.Fatalf("expected an empty object, got key %q", target.Key)
			}
		})
	}
}

func TestToolSchemasNameTheirProperties(t *testing.T) {
	// A schema that declares required properties must describe each of them,
	// otherwise a client cannot build a valid call.
	for _, tool := range tools {
		t.Run(tool.Name, func(t *testing.T) {
			for _, required := range tool.InputSchema.Required {
				if _, ok := tool.InputSchema.Properties[required]; !ok {
					t.Fatalf("required property %q is not described in the schema", required)
				}
			}
		})
	}
}

// callTool drives a single tools/call request against store and returns the
// decoded tool result.
func callTool(t *testing.T, store Store, params string) *ToolResult {
	t.Helper()

	server := NewServerWithIO(nil)
	RegisterTools(server, store)

	frame := `{"jsonrpc":"2.0","id":1,"method":"tools/call","params":` + params + `}`
	out := runServerOn(t, server, frame)

	var response struct {
		Result *ToolResult `json:"result"`
		Error  *ErrorObject
	}
	if err := json.Unmarshal([]byte(strings.TrimSpace(out)), &response); err != nil {
		t.Fatalf("unmarshal %q: %v", out, err)
	}
	if response.Result == nil {
		t.Fatalf("expected a tool result, got %s", out)
	}
	return response.Result
}

// resultText returns the text of a tool result's first content item.
func resultText(result *ToolResult) string {
	if result == nil || len(result.Content) == 0 {
		return ""
	}
	return result.Content[0].Text
}

// A key containing JSON metacharacters must still yield a parsable result. The
// key is marshalled rather than interpolated, so quotes and newlines are safe.
func TestTTLEscapesTheKeyIntoValidJSON(t *testing.T) {
	store := NewDBStore(newTestDB())
	hostile := `quo"te` + "\n" + `back\slash`

	result := callTool(t, store, `{"name":"kevin_ttl","arguments":{"key":`+mustMarshal(t, hostile)+`}}`)
	if result.IsError {
		t.Fatalf("unexpected failure: %s", resultText(result))
	}

	var payload struct {
		Key   string `json:"key"`
		State string `json:"state"`
	}
	if err := json.Unmarshal([]byte(resultText(result)), &payload); err != nil {
		t.Fatalf("result text is not valid JSON (%v): %s", err, resultText(result))
	}
	if payload.Key != hostile {
		t.Fatalf("expected the key %q back, got %q", hostile, payload.Key)
	}
	if payload.State != "missing" {
		t.Fatalf("expected a missing key, got %q", payload.State)
	}
}

// A wrongly typed argument falls back to its default rather than failing the
// whole call, matching the Kotlin and Rust ports.
func TestWronglyTypedArgumentsFallBackToDefaults(t *testing.T) {
	store := NewDBStore(newTestDB())

	tests := []struct {
		name   string
		params string
		want   string
	}{
		{"numeric key", `{"name":"kevin_get","arguments":{"key":7}}`, "key is required and must not be blank"},
		{"string seconds", `{"name":"kevin_expire","arguments":{"key":"a","seconds":"30"}}`, "seconds is required and must be greater than 0"},
		{"string confirm", `{"name":"kevin_flush","arguments":{"confirm":"true"}}`, "confirm must be true to remove every key"},
		{"mixed list", `{"name":"kevin_del","arguments":{"keys":["a",3,null]}}`, `{"deleted": 0}`},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := resultText(callTool(t, store, tt.params))
			if got != tt.want {
				t.Fatalf("expected %q, got %q", tt.want, got)
			}
		})
	}
}

func mustMarshal(t *testing.T, value string) string {
	t.Helper()
	encoded, err := json.Marshal(value)
	if err != nil {
		t.Fatalf("marshal %q: %v", value, err)
	}
	return string(encoded)
}

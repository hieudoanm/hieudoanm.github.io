package mcp

import (
	"encoding/json"
	"testing"
)

// decodeText unmarshals the text block of a tool result into dst.
func decodeText(t *testing.T, text string, dst any) {
	t.Helper()

	if err := json.Unmarshal([]byte(text), dst); err != nil {
		t.Fatalf("unmarshal %q: %v", text, err)
	}
}

// quote renders a Go string as a JSON string literal, so a test can inline a
// YAML fixture into a tools/call frame without hand-escaping it.
func quote(value string) string {
	data, err := json.Marshal(value)
	if err != nil {
		panic("json.Marshal of a string cannot fail: " + err.Error())
	}
	return string(data)
}

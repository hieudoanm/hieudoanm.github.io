package mcp

import (
	"encoding/json"
	"strings"
)

// argField returns one member of a tool's arguments object, or nil when the
// arguments are absent or the member is missing.
func argField(args json.RawMessage, name string) json.RawMessage {
	var object map[string]json.RawMessage
	if err := json.Unmarshal(objectOrEmpty(args), &object); err != nil {
		return nil
	}
	return object[name]
}

// stringArg reads a string argument, defaulting to empty. A missing or wrongly
// typed value yields the default, so a model that sends the wrong type gets the
// documented behaviour instead of a parse failure. The Kotlin and Rust ports
// coerce identically, and all three reject a blank key in the handler.
func stringArg(args json.RawMessage, name string) string {
	var value string
	if err := json.Unmarshal(argField(args, name), &value); err != nil {
		return ""
	}
	return value
}

// intArg reads an integer argument, defaulting to zero.
func intArg(args json.RawMessage, name string) int {
	var value int
	if err := json.Unmarshal(argField(args, name), &value); err != nil {
		return 0
	}
	return value
}

// boolArg reads a boolean argument, defaulting to false.
func boolArg(args json.RawMessage, name string) bool {
	var value bool
	if err := json.Unmarshal(argField(args, name), &value); err != nil {
		return false
	}
	return value
}

// stringListArg reads an array-of-strings argument, defaulting to empty.
// Non-string entries are dropped rather than failing the whole call.
func stringListArg(args json.RawMessage, name string) []string {
	var items []json.RawMessage
	if err := json.Unmarshal(argField(args, name), &items); err != nil {
		return nil
	}

	keys := make([]string, 0, len(items))
	for _, item := range items {
		var key string
		if err := json.Unmarshal(item, &key); err != nil {
			continue
		}
		keys = append(keys, key)
	}
	return keys
}

// requireKey rejects a missing or blank key. Without this a client that omits
// the argument would silently operate on the empty key, which is never a key
// the store holds.
func requireKey(key string) *ToolResult {
	if strings.TrimSpace(key) == "" {
		return NewToolResultError("key is required and must not be blank")
	}
	return nil
}

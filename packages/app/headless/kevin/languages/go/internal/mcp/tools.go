package mcp

import (
	"encoding/json"
	"fmt"
)

// Schema property shorthands, kept here so every tool describes its arguments
// the same way. A tool that requires a property must describe it, otherwise a
// client has no type information with which to build a valid call.
func keyProperty() PropertySchema {
	return PropertySchema{Type: "string", Description: "Key to operate on."}
}

func stringProperty(description string) PropertySchema {
	return PropertySchema{Type: "string", Description: description}
}

func intProperty(description string) PropertySchema {
	return PropertySchema{Type: "integer", Description: description}
}

func boolProperty(description string) PropertySchema {
	return PropertySchema{Type: "boolean", Description: description}
}

// tools is the complete tool catalogue the server exposes to LLM clients. Each
// tool maps to a method on Store rather than the TCP protocol so that the MCP
// server can use either an in-process or remote store.
var tools = []Tool{
	{
		Name:        "kevin_ping",
		Description: "Verify the KeVIN key/value store is reachable.",
		InputSchema: Schema{
			Type:       "object",
			Properties: map[string]PropertySchema{},
		},
	},
	{
		Name:        "kevin_set",
		Description: "Store value under key, overwriting any existing value. Set ttl_seconds to expire the key automatically.",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"key":         keyProperty(),
				"value":       stringProperty("Value to store. May contain spaces."),
				"ttl_seconds": intProperty("Seconds until the key expires. Omit or use 0 for no expiry."),
			},
			Required: []string{"key", "value"},
		},
	},
	{
		Name:        "kevin_get",
		Description: "Retrieve the value stored under key. Returns found=false when the key is absent or expired.",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"key": keyProperty(),
			},
			Required: []string{"key"},
		},
	},
	{
		Name:        "kevin_del",
		Description: "Delete one or more keys and report how many were present.",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"keys": {
					Type:        "array",
					Description: "Keys to delete.",
					Items:       &PropertySchema{Type: "string"},
				},
			},
			Required: []string{"keys"},
		},
	},
	{
		Name:        "kevin_exists",
		Description: "Check whether key is present and not expired.",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"key": keyProperty(),
			},
			Required: []string{"key"},
		},
	},
	{
		Name:        "kevin_keys",
		Description: "List every present, unexpired key.",
		InputSchema: Schema{
			Type:       "object",
			Properties: map[string]PropertySchema{},
		},
	},
	{
		Name:        "kevin_len",
		Description: "Count the present, unexpired keys.",
		InputSchema: Schema{
			Type:       "object",
			Properties: map[string]PropertySchema{},
		},
	},
	{
		Name:        "kevin_ttl",
		Description: "Report the remaining lifetime of key in whole seconds, rounded up. The state is one of expiring, no-expiry, or missing.",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"key": keyProperty(),
			},
			Required: []string{"key"},
		},
	},
	{
		Name:        "kevin_expire",
		Description: "Set an expiry on an existing key, replacing any previous one. Reports ok=false when the key does not exist.",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"key":     keyProperty(),
				"seconds": intProperty("Seconds until the key expires. Must be greater than 0."),
			},
			Required: []string{"key", "seconds"},
		},
	},
	{
		Name:        "kevin_flush",
		Description: "Remove every key and report how many were removed. Destructive: requires confirm=true.",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"confirm": boolProperty("Must be true. Guards against an accidental flush."),
			},
			Required: []string{"confirm"},
		},
	},
}

// RegisterTools registers every KeVIN tool with the server.
func RegisterTools(s *Server, store Store) {
	for _, tool := range tools {
		s.AddTool(tool, handlerFor(tool.Name, store))
	}
}

// handlerFor selects a handler for the named tool.
func handlerFor(name string, store Store) ToolHandler {
	switch name {
	case "kevin_ping":
		return func(json.RawMessage) *ToolResult { return pingTool(store) }
	case "kevin_set":
		return func(args json.RawMessage) *ToolResult { return setTool(store, args) }
	case "kevin_get":
		return func(args json.RawMessage) *ToolResult { return getTool(store, args) }
	case "kevin_del":
		return func(args json.RawMessage) *ToolResult { return delTool(store, args) }
	case "kevin_exists":
		return func(args json.RawMessage) *ToolResult { return existsTool(store, args) }
	case "kevin_keys":
		return func(json.RawMessage) *ToolResult { return keysTool(store) }
	case "kevin_len":
		return func(json.RawMessage) *ToolResult { return lenTool(store) }
	case "kevin_ttl":
		return func(args json.RawMessage) *ToolResult { return ttlTool(store, args) }
	case "kevin_expire":
		return func(args json.RawMessage) *ToolResult { return expireTool(store, args) }
	case "kevin_flush":
		return func(args json.RawMessage) *ToolResult { return flushTool(store, args) }
	default:
		return func(json.RawMessage) *ToolResult {
			return NewToolResultError(fmt.Sprintf("unknown tool %q", name))
		}
	}
}

// tool helpers

func pingTool(store Store) *ToolResult {
	if err := store.Ping(); err != nil {
		return NewToolResultError(err.Error())
	}
	return NewToolResultText(`{"pong": true}`)
}

func setTool(store Store, raw json.RawMessage) *ToolResult {
	key := stringArg(raw, "key")
	if missing := requireKey(key); missing != nil {
		return missing
	}
	value := stringArg(raw, "value")
	if value == "" {
		return NewToolResultError("value is required and must not be empty")
	}
	if err := store.Set(key, value, intArg(raw, "ttl_seconds")); err != nil {
		return NewToolResultError(err.Error())
	}
	return NewToolResultText(`{"ok": true}`)
}

func getTool(store Store, raw json.RawMessage) *ToolResult {
	key := stringArg(raw, "key")
	if missing := requireKey(key); missing != nil {
		return missing
	}
	value, found, err := store.Get(key)
	if err != nil {
		return NewToolResultError(err.Error())
	}
	if !found {
		return NewToolResultText(`{"found": false, "value": null}`)
	}
	encoded, err := json.Marshal(value)
	if err != nil {
		return NewToolResultError(fmt.Sprintf("marshal value: %v", err))
	}
	return NewToolResultText(fmt.Sprintf(`{"found": true, "value": %s}`, encoded))
}

func delTool(store Store, raw json.RawMessage) *ToolResult {
	keys := stringListArg(raw, "keys")
	if len(keys) == 0 {
		return NewToolResultError("keys is required and must contain at least one key")
	}
	deleted, err := store.Del(keys)
	if err != nil {
		return NewToolResultError(err.Error())
	}
	return NewToolResultText(fmt.Sprintf(`{"deleted": %d}`, deleted))
}

func existsTool(store Store, raw json.RawMessage) *ToolResult {
	key := stringArg(raw, "key")
	if missing := requireKey(key); missing != nil {
		return missing
	}
	exists, err := store.Exists(key)
	if err != nil {
		return NewToolResultError(err.Error())
	}
	return NewToolResultText(fmt.Sprintf(`{"exists": %t}`, exists))
}

func keysTool(store Store) *ToolResult {
	keys, err := store.Keys()
	if err != nil {
		return NewToolResultError(err.Error())
	}
	encoded, err := json.Marshal(keys)
	if err != nil {
		return NewToolResultError(fmt.Sprintf("marshal keys: %v", err))
	}
	return NewToolResultText(fmt.Sprintf(`{"keys": %s, "count": %d}`, encoded, len(keys)))
}

func lenTool(store Store) *ToolResult {
	count, err := store.Len()
	if err != nil {
		return NewToolResultError(err.Error())
	}
	return NewToolResultText(fmt.Sprintf(`{"count": %d}`, count))
}

// ttlTool reports the key alongside its state. The key is marshalled rather
// than interpolated, so a key containing a quote or a newline still produces
// well-formed JSON.
func ttlTool(store Store, raw json.RawMessage) *ToolResult {
	key := stringArg(raw, "key")
	if missing := requireKey(key); missing != nil {
		return missing
	}
	seconds, state, err := store.TTL(key)
	if err != nil {
		return NewToolResultError(err.Error())
	}
	encoded, err := json.Marshal(key)
	if err != nil {
		return NewToolResultError(fmt.Sprintf("marshal key: %v", err))
	}
	return NewToolResultText(fmt.Sprintf(`{"key": %s, "seconds": %d, "state": "%s"}`, encoded, seconds, state))
}

func expireTool(store Store, raw json.RawMessage) *ToolResult {
	key := stringArg(raw, "key")
	if missing := requireKey(key); missing != nil {
		return missing
	}
	seconds := intArg(raw, "seconds")
	if seconds <= 0 {
		return NewToolResultError("seconds is required and must be greater than 0")
	}
	ok, err := store.Expire(key, seconds)
	if err != nil {
		return NewToolResultError(err.Error())
	}
	return NewToolResultText(fmt.Sprintf(`{"ok": %t}`, ok))
}

func flushTool(store Store, raw json.RawMessage) *ToolResult {
	if !boolArg(raw, "confirm") {
		return NewToolResultError("confirm must be true to remove every key")
	}
	deleted, err := store.Flush()
	if err != nil {
		return NewToolResultError(err.Error())
	}
	return NewToolResultText(fmt.Sprintf(`{"deleted": %d}`, deleted))
}

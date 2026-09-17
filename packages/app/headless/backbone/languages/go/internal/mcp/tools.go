package mcp

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
)

// jsonResult renders v as indented JSON. A value that cannot be marshalled is
// reported to the model instead of becoming a silently empty result, which
// would read as a successful call.
func jsonResult(v any) *ToolResult {
	data, err := json.MarshalIndent(v, "", "  ")
	if err != nil {
		return errorResult(fmt.Errorf("encode result: %w", err))
	}
	return textResult(string(data))
}

func textResult(text string) *ToolResult {
	return &ToolResult{Content: []ContentItem{{Type: "text", Text: text}}}
}

// errorResult reports a tool failure. A failure is carried in the result with
// isError set, rather than as a protocol error, so a model can correct the call
// instead of losing the session.
func errorResult(err error) *ToolResult {
	return &ToolResult{Content: []ContentItem{{Type: "text", Text: err.Error()}}, IsError: true}
}

// parseArgs decodes tool arguments, treating absent or null arguments as an
// empty object so a no-argument tool needs no special case.
func parseArgs[T any](raw json.RawMessage) (T, error) {
	var decoded T
	if err := json.Unmarshal(ObjectOrEmpty(raw), &decoded); err != nil {
		return decoded, fmt.Errorf("parse args: %w", err)
	}
	return decoded, nil
}

// requireObject rejects a record body that is not a JSON object. Bodies are
// stored verbatim, so a string would persist a JSON string where the caller
// meant an object. An absent or null body is rejected too: defaulting it to {}
// would store an empty record the caller never described.
func requireObject(raw json.RawMessage, tool string) error {
	missing := tool + ": data is required and must be a JSON object"

	trimmed := bytes.TrimSpace(raw)
	if len(trimmed) == 0 || string(trimmed) == "null" {
		return errors.New(missing)
	}
	var probe any
	if err := json.Unmarshal(trimmed, &probe); err != nil {
		return errors.New(missing)
	}
	if _, ok := probe.(map[string]any); !ok {
		return errors.New(missing)
	}
	return nil
}

// maxPerPage caps one page so a model cannot request a whole table at once.
const maxPerPage = 200

// Register registers every tool with the server. The names match the Rust and
// Kotlin ports, so a client can switch languages without editing its prompts.
func Register(s *Server, deps ServerDeps) {
	s.AddTool(collectionsCreateTool(), handleCollectionsCreate(deps))
	s.AddTool(collectionsDeleteTool(), handleCollectionsDelete(deps))
	s.AddTool(collectionsListTool(), handleCollectionsList(deps))
	s.AddTool(exportTool(), handleExport(deps))
	s.AddTool(healthTool(), handleHealth(deps))
	s.AddTool(importTool(), handleImport(deps))
	s.AddTool(recordsCreateTool(), handleRecordsCreate(deps))
	s.AddTool(recordsDeleteTool(), handleRecordsDelete(deps))
	s.AddTool(recordsGetTool(), handleRecordsGet(deps))
	s.AddTool(recordsListTool(), handleRecordsList(deps))
	s.AddTool(recordsUpdateTool(), handleRecordsUpdate(deps))
}

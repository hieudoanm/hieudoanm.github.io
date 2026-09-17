package mcp

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"sync"
)

// Error codes for JSON-RPC 2.0
const (
	ErrCodeParse          = -32700
	ErrCodeInvalidRequest = -32600
	ErrCodeMethodNotFound = -32601
	ErrCodeInvalidParams  = -32602
	ErrCodeInternalError  = -32603
)

// Protocol version for the MCP server
const ProtocolVersion = "2025-11-25"

// Server name for the MCP server
const ServerName = "backbone-mcp"

// Server version for the MCP server
const ServerVersion = "1.0.0"

// MaxFrameBytes caps a single JSON-RPC frame. A larger frame is reported as a
// parse error instead of being buffered, so a client cannot grow the heap
// without bound. It matches the cap the other headless MCP servers use.
const MaxFrameBytes = 8 << 20

// SupportedProtocolVersions lists the MCP revisions this server can speak,
// newest first. A client asking for one of these gets exactly that revision
// echoed back during initialize.
func SupportedProtocolVersions() []string {
	return []string{ProtocolVersion}
}

// NegotiatedVersion picks the revision to advertise to a client that requested
// the given initialize params. A revision this server speaks is echoed; anything
// else falls back to ProtocolVersion and the client is expected to disconnect if
// it cannot speak that either. Absent or non-object params negotiate nothing.
func NegotiatedVersion(params json.RawMessage) string {
	if len(params) == 0 {
		return ProtocolVersion
	}
	var decoded struct {
		ProtocolVersion string `json:"protocolVersion"`
	}
	if err := json.Unmarshal(params, &decoded); err != nil {
		return ProtocolVersion
	}
	for _, version := range SupportedProtocolVersions() {
		if decoded.ProtocolVersion == version {
			return version
		}
	}
	return ProtocolVersion
}

// ObjectOrEmpty returns params, treating an absent or JSON-null value as an
// empty object so a tools/call without params still names no tool instead of
// failing to decode.
func ObjectOrEmpty(params json.RawMessage) json.RawMessage {
	trimmed := bytes.TrimSpace(params)
	if len(trimmed) == 0 || string(trimmed) == "null" {
		return json.RawMessage(`{}`)
	}
	return params
}

// Request represents an MCP JSON-RPC 2.0 request.
type Request struct {
	JSONRPC string          `json:"jsonrpc"`
	ID      json.RawMessage `json:"id,omitempty"`
	Method  string          `json:"method"`
	Params  json.RawMessage `json:"params,omitempty"`
}

// IsNotification reports whether this frame expects no reply. A missing or
// JSON-null id marks a notification.
func (r Request) IsNotification() bool {
	trimmed := bytes.TrimSpace(r.ID)
	return len(trimmed) == 0 || string(trimmed) == "null"
}

// Response represents an MCP JSON-RPC 2.0 response.
type Response struct {
	JSONRPC string          `json:"jsonrpc"`
	ID      json.RawMessage `json:"id,omitempty"`
	Result  any             `json:"result,omitempty"`
	Error   *ErrorObject    `json:"error,omitempty"`
}

// ErrorObject represents a JSON-RPC error object.
type ErrorObject struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data,omitempty"`
}

// Tool represents an MCP tool with its name, description, and input schema.
type Tool struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	InputSchema Schema `json:"inputSchema"`
}

// Schema describes a JSON schema for tool arguments.
type Schema struct {
	Type       string                    `json:"type"`
	Properties map[string]PropertySchema `json:"properties,omitempty"`
	Required   []string                  `json:"required,omitempty"`
}

// PropertySchema describes a single property in a JSON schema.
type PropertySchema struct {
	Type        string          `json:"type,omitempty"`
	Description string          `json:"description,omitempty"`
	Enum        []string        `json:"enum,omitempty"`
	Items       *PropertySchema `json:"items,omitempty"`
}

// ToolCallParams represents the parameters for a tool call.
type ToolCallParams struct {
	Name      string          `json:"name"`
	Arguments json.RawMessage `json:"arguments,omitempty"`
}

// ToolResult represents the result of a tool call.
type ToolResult struct {
	Content []ContentItem `json:"content"`
	IsError bool          `json:"isError,omitempty"`
}

// ContentItem is a single content item in a tool result.
type ContentItem struct {
	Type string `json:"type"`
	Text string `json:"text"`
}

// ServerCapabilities represents the capabilities of the MCP server.
type ServerCapabilities struct {
	Tools *ToolsCapabilities `json:"tools,omitempty"`
}

// ToolsCapabilities represents tool-related capabilities.
type ToolsCapabilities struct {
	ListChanged bool `json:"listChanged"`
}

// ServerInfo represents information about the MCP server.
type ServerInfo struct {
	Name    string `json:"name"`
	Version string `json:"version"`
}

// ListToolsResult represents the result of a tools/list request.
type ListToolsResult struct {
	Tools []Tool `json:"tools"`
}

// InitializeResult represents the result of an initialize request.
type InitializeResult struct {
	ProtocolVersion string             `json:"protocolVersion"`
	Capabilities    ServerCapabilities `json:"capabilities"`
	ServerInfo      ServerInfo         `json:"serverInfo"`
}

// Server is the MCP server that handles JSON-RPC 2.0 over stdio.
type Server struct {
	mu       sync.Mutex
	out      io.Writer
	tools    map[string]Tool
	handlers map[string]ToolHandler
}

// ToolHandler processes a tool call and returns a ToolResult.
type ToolHandler func(args json.RawMessage) *ToolResult

// NewErrorResponse creates a new error response.
func NewErrorResponse(id json.RawMessage, code int, message string) Response {
	return Response{
		JSONRPC: "2.0",
		ID:      id,
		Error:   &ErrorObject{Code: code, Message: message},
	}
}

// NewSuccessResponse creates a new success response.
func NewSuccessResponse(id json.RawMessage, result any) Response {
	return Response{
		JSONRPC: "2.0",
		ID:      id,
		Result:  result,
	}
}

// NewToolResultText creates a new tool result with text content.
func NewToolResultText(text string) *ToolResult {
	return &ToolResult{Content: []ContentItem{{Type: "text", Text: text}}}
}

// NewToolResultError creates a new tool result with error content.
func NewToolResultError(text string) *ToolResult {
	return &ToolResult{Content: []ContentItem{{Type: "text", Text: text}}, IsError: true}
}

// write emits one response frame. Diagnostics go to stderr so that stdout
// carries nothing but JSON-RPC frames.
func (s *Server) write(response Response) {
	data, err := json.Marshal(response)
	if err != nil {
		slog.Error("could not marshal response", "err", err)
		return
	}

	s.mu.Lock()
	defer s.mu.Unlock()
	if _, err := fmt.Fprintln(s.out, string(data)); err != nil {
		slog.Error("could not write response", "err", err)
	}
}

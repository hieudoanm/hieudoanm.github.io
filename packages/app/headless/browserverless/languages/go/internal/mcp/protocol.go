// Package mcp implements a Model Context Protocol server that exposes the
// Browserverless render surface to LLM clients over a newline-delimited JSON-RPC 2.0
// stdio transport.
//
// The protocol layer is transport-agnostic and knows nothing about the store;
// the browserverless tool surface lives in tools.go and the render backends in renderer.go.
package mcp

import "encoding/json"

// ProtocolVersion is the MCP revision this server implements.
const ProtocolVersion = "2025-11-25"

// ServerName identifies this server during initialize. The reported version is
// internal/version.Version so builds stamped with -ldflags stay accurate.
const ServerName = "browserverless-mcp"

// JSON-RPC 2.0 and MCP error codes used by the server.
const (
	ErrCodeParse          = -32700
	ErrCodeInvalidRequest = -32600
	ErrCodeMethodNotFound = -32601
	ErrCodeInvalidParams  = -32602
	ErrCodeInternal       = -32603
)

// Request is an incoming JSON-RPC 2.0 message. ID is nil for notifications.
type Request struct {
	JSONRPC string          `json:"jsonrpc"`
	ID      json.RawMessage `json:"id"`
	Method  string          `json:"method"`
	Params  json.RawMessage `json:"params,omitempty"`
}

// Response is an outgoing JSON-RPC 2.0 reply. Exactly one of Result and Error
// is populated.
type Response struct {
	JSONRPC string          `json:"jsonrpc"`
	ID      json.RawMessage `json:"id"`
	Result  any             `json:"result,omitempty"`
	Error   *ErrorObject    `json:"error,omitempty"`
}

// ErrorObject is the JSON-RPC 2.0 error member.
type ErrorObject struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

// Tool is a single entry in the tools/list result.
type Tool struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	InputSchema Schema `json:"inputSchema"`
}

// Schema is a JSON Schema object restricted to the subset MCP tools need.
type Schema struct {
	Type       string                    `json:"type"`
	Properties map[string]PropertySchema `json:"properties"`
	Required   []string                  `json:"required,omitempty"`
}

// PropertySchema describes one tool input property.
type PropertySchema struct {
	Type        string          `json:"type"`
	Description string          `json:"description,omitempty"`
	Default     any             `json:"default,omitempty"`
	Enum        []string        `json:"enum,omitempty"`
	Items       *PropertySchema `json:"items,omitempty"`
}

// ToolResult is the payload of a tools/call result.
type ToolResult struct {
	Content []ContentItem `json:"content"`
	IsError bool          `json:"isError,omitempty"`
}

// ContentItem is one piece of tool output: a text block, or an image whose
// Data holds standard base64 bytes.
type ContentItem struct {
	Type     string `json:"type"`
	Text     string `json:"text,omitempty"`
	Data     string `json:"data,omitempty"`
	MimeType string `json:"mimeType,omitempty"`
}

// ToolCallParams are the params of a tools/call request.
type ToolCallParams struct {
	Name      string          `json:"name"`
	Arguments json.RawMessage `json:"arguments"`
}

// InitializeParams are the params of an initialize request.
type InitializeParams struct {
	ProtocolVersion string `json:"protocolVersion"`
	ClientInfo      struct {
		Name    string `json:"name"`
		Version string `json:"version"`
	} `json:"clientInfo"`
}

// InitializeResult is the reply to initialize.
type InitializeResult struct {
	ProtocolVersion string             `json:"protocolVersion"`
	Capabilities    ServerCapabilities `json:"capabilities"`
	ServerInfo      ServerInfo         `json:"serverInfo"`
}

// ServerCapabilities advertises the features this server implements. Only
// tools are supported; resources and prompts are not implemented.
type ServerCapabilities struct {
	Tools *ToolsCapabilities `json:"tools,omitempty"`
}

// ToolsCapabilities describes tool-related capabilities.
type ToolsCapabilities struct {
	ListChanged bool `json:"listChanged"`
}

// ServerInfo identifies the server implementation.
type ServerInfo struct {
	Name    string `json:"name"`
	Version string `json:"version"`
}

// ListToolsResult is the reply to tools/list.
type ListToolsResult struct {
	Tools      []Tool `json:"tools"`
	NextCursor string `json:"nextCursor,omitempty"`
}

// NewErrorResponse builds a JSON-RPC error reply for id.
func NewErrorResponse(id json.RawMessage, code int, message string) Response {
	return Response{
		JSONRPC: "2.0",
		ID:      id,
		Error: &ErrorObject{
			Code:    code,
			Message: message,
		},
	}
}

// NewSuccessResponse builds a JSON-RPC success reply for id.
func NewSuccessResponse(id json.RawMessage, result any) Response {
	return Response{
		JSONRPC: "2.0",
		ID:      id,
		Result:  result,
	}
}

// NewToolResultText builds a successful tool result carrying text.
func NewToolResultText(text string) *ToolResult {
	return &ToolResult{
		Content: []ContentItem{{Type: "text", Text: text}},
	}
}

// NewToolResultError builds a failed tool result carrying text. Tool failures
// are reported this way rather than as JSON-RPC errors so the model can see
// and react to them.
func NewToolResultError(text string) *ToolResult {
	return &ToolResult{
		Content: []ContentItem{{Type: "text", Text: text}},
		IsError: true,
	}
}

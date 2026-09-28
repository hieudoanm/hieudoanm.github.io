// Package mcp implements a Model Context Protocol server that exposes the
// KeVIN key/value store to LLM clients over a newline-delimited JSON-RPC 2.0
// stdio transport.
//
// The protocol layer is transport-agnostic and knows nothing about the store;
// the kevin tool surface lives in tools.go and the storage backends in store.go.
package mcp

import "encoding/json"

// ProtocolVersion is the MCP revision this server implements.
const ProtocolVersion = "2025-11-25"

// MaxFrameBytes caps a single JSON-RPC frame. A larger frame is reported as a
// parse error instead of being buffered, so a client cannot grow the process
// heap without bound.
const MaxFrameBytes = 8 << 20

// ServerName and ServerVersion identify this server during initialize.
const (
	ServerName    = "kevin-mcp"
	ServerVersion = "1.0.0"
)

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

// ContentItem is one piece of tool output. Only text is emitted.
type ContentItem struct {
	Type string `json:"type"`
	Text string `json:"text"`
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

// PingResult is the empty object a ping is answered with.
type PingResult struct{}

// supportedProtocolVersions lists the revisions this server can speak, newest
// first. A client asking for one of these gets exactly that version echoed
// back, so an older client is not forced to speak a revision it never asked for.
func supportedProtocolVersions() []string {
	return []string{ProtocolVersion}
}

// initializeResult negotiates the protocol revision and advertises the tool
// capability. When the client asks for a revision this server does not speak,
// the server's latest is offered and the client is expected to disconnect if it
// cannot speak that either.
func initializeResult(params json.RawMessage) InitializeResult {
	return InitializeResult{
		ProtocolVersion: negotiatedVersion(params),
		Capabilities: ServerCapabilities{
			Tools: &ToolsCapabilities{ListChanged: false},
		},
		ServerInfo: ServerInfo{
			Name:    ServerName,
			Version: ServerVersion,
		},
	}
}

// negotiatedVersion echoes the client's requested revision when the server
// supports it, and otherwise falls back to the server's latest. An unparsable
// or absent params object is treated as no request at all.
func negotiatedVersion(params json.RawMessage) string {
	var requested InitializeParams
	if err := json.Unmarshal(objectOrEmpty(params), &requested); err != nil {
		return ProtocolVersion
	}
	for _, version := range supportedProtocolVersions() {
		if requested.ProtocolVersion == version {
			return version
		}
	}
	return ProtocolVersion
}

// objectOrEmpty normalises absent and null params to an empty object, which is
// what the tool handlers expect. The MCP protocol typically sends an object,
// never a null.
func objectOrEmpty(params json.RawMessage) json.RawMessage {
	if len(params) == 0 || string(params) == "null" {
		return json.RawMessage("{}")
	}
	return params
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

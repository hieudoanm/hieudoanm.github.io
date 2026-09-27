package mcp

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"os"
	"sort"
	"sync"
)

// ToolHandler executes one tool call. It receives the raw JSON arguments and
// returns the tool result. Handlers report failures by returning a result
// built with NewToolResultError, not by panicking.
type ToolHandler func(args json.RawMessage) *ToolResult

// Server dispatches MCP requests to registered tools over a stdio transport.
type Server struct {
	mu       sync.Mutex
	out      io.Writer
	tools    map[string]Tool
	handlers map[string]ToolHandler
}

// NewServer returns a Server that reads requests from os.Stdin and writes
// responses to os.Stdout.
func NewServer() *Server {
	return NewServerWithIO(os.Stdout)
}

// NewServerWithIO returns a Server that writes responses to out. Callers
// supply their own input with runWithReader or RunWithContext, so tests can
// drive the full protocol without touching the process stdio.
func NewServerWithIO(out io.Writer) *Server {
	return &Server{
		out:      out,
		tools:    make(map[string]Tool),
		handlers: make(map[string]ToolHandler),
	}
}

// AddTool registers tool and its handler, replacing any previous entry with
// the same name.
func (s *Server) AddTool(tool Tool, handler ToolHandler) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.tools[tool.Name] = tool
	s.handlers[tool.Name] = handler
}

// Run serves requests from os.Stdin until EOF.
func (s *Server) Run() error {
	return s.RunWithContext(context.Background())
}

// RunWithContext serves requests from os.Stdin until EOF or ctx is done.
func (s *Server) RunWithContext(ctx context.Context) error {
	return s.runWithReader(ctx, os.Stdin)
}

// handleMessage decodes one JSON-RPC frame and dispatches it. Undecodable
// frames produce an error reply. A notification — a frame with no id — is
// never answered, whatever the method, because replying to one desynchronises
// the client.
func (s *Server) handleMessage(raw []byte) {
	var request Request
	if err := json.Unmarshal(raw, &request); err != nil {
		s.write(NewErrorResponse(nil, ErrCodeParse, "parse error: "+err.Error()))
		return
	}
	if request.JSONRPC != "2.0" {
		s.write(NewErrorResponse(request.ID, ErrCodeInvalidRequest, "invalid jsonrpc version"))
		return
	}

	isNotification := len(request.ID) == 0 || string(request.ID) == "null"
	if isNotification {
		slog.Debug("ignoring notification", "method", request.Method)
		return
	}

	switch request.Method {
	case "initialize":
		s.handleInitialize(request.ID)
	case "ping":
		s.write(NewSuccessResponse(request.ID, map[string]any{}))
	case "tools/list":
		s.handleListTools(request.ID)
	case "tools/call":
		s.handleCallTool(request.ID, request.Params)
	default:
		slog.Debug("unknown method", "method", request.Method)
		s.write(NewErrorResponse(request.ID, ErrCodeMethodNotFound, "method not found: "+request.Method))
	}
}

// handleInitialize replies with the negotiated protocol version, the tool
// capability, and this server's identity.
func (s *Server) handleInitialize(id json.RawMessage) {
	s.write(NewSuccessResponse(id, InitializeResult{
		ProtocolVersion: ProtocolVersion,
		Capabilities: ServerCapabilities{
			Tools: &ToolsCapabilities{ListChanged: false},
		},
		ServerInfo: ServerInfo{
			Name:    ServerName,
			Version: ServerVersion,
		},
	}))
}

// handleListTools replies with every registered tool, sorted by name so
// clients and tests see a stable order.
func (s *Server) handleListTools(id json.RawMessage) {
	s.mu.Lock()
	tools := make([]Tool, 0, len(s.tools))
	for _, tool := range s.tools {
		tools = append(tools, tool)
	}
	s.mu.Unlock()

	sort.Slice(tools, func(i, j int) bool { return tools[i].Name < tools[j].Name })
	s.write(NewSuccessResponse(id, ListToolsResult{Tools: tools}))
}

// handleCallTool decodes the call params and invokes the named tool handler.
func (s *Server) handleCallTool(id json.RawMessage, params json.RawMessage) {
	var call ToolCallParams
	if err := json.Unmarshal(params, &call); err != nil {
		s.write(NewErrorResponse(id, ErrCodeInvalidParams, "invalid params: "+err.Error()))
		return
	}

	s.mu.Lock()
	handler, ok := s.handlers[call.Name]
	s.mu.Unlock()
	if !ok {
		s.write(NewErrorResponse(id, ErrCodeMethodNotFound, "tool not found: "+call.Name))
		return
	}

	s.write(NewSuccessResponse(id, handler(call.Arguments)))
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

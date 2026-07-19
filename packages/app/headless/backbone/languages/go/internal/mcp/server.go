package mcp

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"io"
	"log/slog"
	"os"
	"sort"
)

// ServerDeps holds the dependencies the MCP tools need. The database is opened
// once by the command and handed in here: opening one per call would leak a
// SQLite connection and a file handle every time a model used a tool, and would
// skip MigrateDB, so a fresh data directory would fail.
type ServerDeps struct {
	DB *sql.DB
}

// db returns the injected database or an error naming the missing dependency,
// so a tool reports an actionable failure instead of dereferencing nil.
func (d ServerDeps) db() (*sql.DB, error) {
	if d.DB == nil {
		return nil, errors.New("the database is not available to the mcp server")
	}
	return d.DB, nil
}

// NewServer returns a Server that reads requests from os.Stdin and writes
// responses to os.Stdout.
func NewServer() *Server {
	return NewServerWithIO(os.Stdout)
}

// NewServerWithIO returns a Server that writes responses to out. Callers
// supply their own input with RunWithContext, so tests can
// drive the full protocol without touching the process stdio.
func NewServerWithIO(out io.Writer) *Server {
	return &Server{
		out:      out,
		tools:    make(map[string]Tool),
		handlers: make(map[string]ToolHandler),
	}
}

// AddTool registers a tool and its handler, replacing any previous entry with
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
	return runWithReader(ctx, os.Stdin, s)
}

// RunWithReader serves requests read from reader, which lets tests drive the
// full protocol without touching the process stdio.
func (s *Server) RunWithReader(ctx context.Context, reader io.Reader) error {
	return runWithReader(ctx, reader, s)
}

// handleMessage decodes one JSON-RPC frame and dispatches it. Undecodable
// frames produce an error reply. A notification — a frame with no id — is
// never answered, whatever the method, because replying to one desynchronises
// the client.
//
// The notification check precedes the version check, so a notification that is
// also malformed stays silent instead of producing a reply the client will
// never match to a request.
func (s *Server) handleMessage(raw []byte) {
	var request Request
	if err := json.Unmarshal(raw, &request); err != nil {
		s.write(NewErrorResponse(nil, ErrCodeParse, "parse error: "+err.Error()))
		return
	}

	if request.IsNotification() {
		slog.Debug("ignoring notification", "method", request.Method)
		return
	}
	if request.JSONRPC != "2.0" {
		s.write(NewErrorResponse(request.ID, ErrCodeInvalidRequest, "invalid jsonrpc version"))
		return
	}

	switch request.Method {
	case "initialize":
		s.handleInitialize(request.ID, request.Params)
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
func (s *Server) handleInitialize(id json.RawMessage, params json.RawMessage) {
	result := InitializeResult{
		ProtocolVersion: NegotiatedVersion(params),
		Capabilities: ServerCapabilities{
			Tools: &ToolsCapabilities{ListChanged: false},
		},
		ServerInfo: ServerInfo{
			Name:    ServerName,
			Version: ServerVersion,
		},
	}
	s.write(NewSuccessResponse(id, result))
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
// Absent or null params are treated as an empty object, so a call with no
// params names no tool rather than failing to decode.
func (s *Server) handleCallTool(id json.RawMessage, params json.RawMessage) {
	var call ToolCallParams
	if err := json.Unmarshal(ObjectOrEmpty(params), &call); err != nil {
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

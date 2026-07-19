package mcp

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"os"
	"strings"
	"sync"
)

// Request is a JSON-RPC 2.0 request from an MCP client.
type Request struct {
	JSONRPC string          `json:"jsonrpc"`
	ID      json.RawMessage `json:"id,omitempty"`
	Method  string          `json:"method"`
	Params  json.RawMessage `json:"params,omitempty"`
}

// Response is a JSON-RPC 2.0 response to an MCP client.
type Response struct {
	JSONRPC string          `json:"jsonrpc"`
	ID      json.RawMessage `json:"id,omitempty"`
	Result  any             `json:"result,omitempty"`
	Error   *Error          `json:"error,omitempty"`
}

// Error is a JSON-RPC 2.0 error object.
type Error struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data,omitempty"`
}

const (
	errCodeParse          = -32700
	errCodeInvalidRequest = -32600
	errCodeMethodNotFound = -32601
	errCodeInvalidParams  = -32602
	errCodeInternal       = -32603
)

// Server is a minimal MCP server that speaks JSON-RPC over stdio.
type Server struct {
	mu  sync.Mutex
	in  io.Reader
	out io.Writer
}

// NewServer returns an MCP server that reads from stdin and writes to out.
func NewServer(out io.Writer) *Server {
	return &Server{in: os.Stdin, out: out}
}

// RunWithContext serves MCP requests until the context is cancelled or the
// input stream is exhausted.
func (s *Server) RunWithContext(ctx context.Context) error {
	scanner := bufio.NewScanner(s.in)
	scanner.Buffer(make([]byte, 0, 1024*1024), 1024*1024*64)

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
		}

		if !scanner.Scan() {
			if err := scanner.Err(); err != nil {
				return err
			}
			return io.EOF
		}

		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		s.handleMessage([]byte(line))
	}
}

func (s *Server) handleMessage(raw []byte) {
	var req Request
	if err := json.Unmarshal(raw, &req); err != nil {
		s.write(newErrorResponse(nil, errCodeParse, "parse error"))
		return
	}

	switch {
	case req.Method == "initialize":
		s.write(newSuccessResponse(req.ID, initializeResult()))
	case req.Method == "ping":
		s.write(newSuccessResponse(req.ID, map[string]any{}))
	case req.Method == "tools/list":
		s.write(newSuccessResponse(req.ID, map[string]any{"tools": listTools()}))
	case req.Method == "tools/call":
		s.handleToolCall(req)
	case strings.HasPrefix(req.Method, "notifications/"):
		// Notifications expect no response.
	default:
		if len(req.ID) > 0 {
			s.write(newErrorResponse(req.ID, errCodeMethodNotFound, "method not found: "+req.Method))
		}
	}
}

func (s *Server) handleToolCall(req Request) {
	var params struct {
		Name      string                 `json:"name"`
		Arguments map[string]interface{} `json:"arguments"`
	}
	if err := json.Unmarshal(req.Params, &params); err != nil {
		s.write(newErrorResponse(req.ID, errCodeInvalidParams, err.Error()))
		return
	}

	text, err := runTool(params.Name, params.Arguments)
	if err != nil {
		s.write(newErrorResponse(req.ID, errCodeInternal, err.Error()))
		return
	}
	s.write(newSuccessResponse(req.ID, toolResult(text)))
}

func initializeResult() map[string]any {
	return map[string]any{
		"protocolVersion": "2024-11-05",
		"capabilities":    map[string]any{"tools": map[string]bool{"listChanged": false}},
		"serverInfo":      map[string]any{"name": "dbml", "version": "1.0.0"},
	}
}

func toolResult(text string) map[string]any {
	return map[string]any{
		"content": []map[string]any{{"type": "text", "text": text}},
	}
}

func newSuccessResponse(id json.RawMessage, result any) Response {
	return Response{JSONRPC: "2.0", ID: id, Result: result}
}

func newErrorResponse(id json.RawMessage, code int, message string) Response {
	return Response{JSONRPC: "2.0", ID: id, Error: &Error{Code: code, Message: message}}
}

func (s *Server) write(resp Response) {
	s.mu.Lock()
	defer s.mu.Unlock()

	data, err := json.Marshal(resp)
	if err != nil {
		slog.Error("encode MCP response", "error", err)
		return
	}
	fmt.Fprintln(s.out, string(data))
}

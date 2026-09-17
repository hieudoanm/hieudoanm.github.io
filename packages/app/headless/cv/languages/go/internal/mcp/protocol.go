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

// Basic MCP protocol types
type Request struct {
	JSONRPC string          `json:"jsonrpc"`
	ID      json.RawMessage `json:"id,omitempty"`
	Method  string          `json:"method"`
	Params  json.RawMessage `json:"params,omitempty"`
}

type Response struct {
	JSONRPC string          `json:"jsonrpc"`
	ID      json.RawMessage `json:"id,omitempty"`
	Result  any             `json:"result,omitempty"`
	Error   *Error          `json:"error,omitempty"`
}

type Error struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data,omitempty"`
}

const (
	ErrCodeParse          = -32700
	ErrCodeInvalidRequest = -32600
	ErrCodeMethodNotFound = -32601
	ErrCodeInvalidParams  = -32602
	ErrCodeInternal       = -32603
)

func NewSuccessResponse(id json.RawMessage, result any) Response {
	return Response{JSONRPC: "2.0", ID: id, Result: result}
}

func NewErrorResponse(id json.RawMessage, code int, message string) Response {
	return Response{JSONRPC: "2.0", ID: id, Error: &Error{Code: code, Message: message}}
}

type Server struct {
	mu  sync.Mutex
	out io.Writer
}

func NewServer() *Server {
	return &Server{out: os.Stdout}
}

func (s *Server) RunWithContext(ctx context.Context) error {
	scanner := bufio.NewScanner(os.Stdin)
	buf := make([]byte, 0, 1024*1024)
	scanner.Buffer(buf, 1024*1024*64)
	scanner.Split(bufio.ScanLines)

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
		s.write(NewErrorResponse(nil, ErrCodeParse, "parse error"))
		return
	}
	if req.Method == "initialize" {
		res := map[string]any{
			"protocolVersion": "2024-11-05",
			"capabilities":    map[string]any{"tools": map[string]bool{"listChanged": false}},
			"serverInfo":      map[string]any{"name": "cv", "version": "1.0.0"},
		}
		s.write(NewSuccessResponse(req.ID, res))
		return
	}
	if req.Method == "tools/list" {
		tools := []map[string]any{
			{
				"name":        "cv_init",
				"description": "Create cv.yaml with default structure",
				"inputSchema": map[string]any{"type": "object", "properties": map[string]any{}},
			},
			{
				"name":        "cv_pdf",
				"description": "Generate PDF from CV",
				"inputSchema": map[string]any{
					"type":       "object",
					"properties": map[string]any{
						"template": map[string]any{"type": "string"},
						"output":   map[string]any{"type": "string"},
					},
				},
			},
			{
				"name":        "cv_templates",
				"description": "List available templates",
				"inputSchema": map[string]any{"type": "object", "properties": map[string]any{}},
			},
		}
		s.write(NewSuccessResponse(req.ID, map[string]any{"tools": tools}))
		return
	}
	if req.Method == "tools/call" {
		var params struct {
			Name      string                 `json:"name"`
			Arguments map[string]interface{} `json:"arguments"`
		}
		if err := json.Unmarshal(req.Params, &params); err != nil {
			s.write(NewErrorResponse(req.ID, ErrCodeInvalidParams, err.Error()))
			return
		}
		s.handleTool(req.ID, params.Name, params.Arguments)
		return
	}
}

func (s *Server) handleTool(id json.RawMessage, name string, args map[string]interface{}) {
	slog.Debug("tool call", "name", name)
	res := map[string]any{"content": []map[string]any{{"type": "text", "text": "ok"}}}
	s.write(NewSuccessResponse(id, res))
}

func (s *Server) write(resp Response) {
	s.mu.Lock()
	defer s.mu.Unlock()
	data, _ := json.Marshal(resp)
	fmt.Fprintln(s.out, string(data))
}

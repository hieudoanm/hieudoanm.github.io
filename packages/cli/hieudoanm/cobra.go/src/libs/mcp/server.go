package mcp

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"strings"
)

type ToolHandler func(args json.RawMessage) *ToolResult

type Server struct {
	tools    map[string]Tool
	handlers map[string]ToolHandler
}

func NewServer() *Server {
	return &Server{
		tools:    make(map[string]Tool),
		handlers: make(map[string]ToolHandler),
	}
}

func (s *Server) AddTool(tool Tool, handler ToolHandler) {
	s.tools[tool.Name] = tool
	s.handlers[tool.Name] = handler
}

func (s *Server) Run() error {
	return s.runWithReader(context.Background(), os.Stdin)
}

func (s *Server) RunWithContext(ctx context.Context) error {
	return s.runWithReader(ctx, os.Stdin)
}

func (s *Server) runWithReader(ctx context.Context, stdin io.Reader) error {
	log.SetOutput(os.Stderr)
	log.SetPrefix("[mcp] ")

	reader := bufio.NewReader(stdin)
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
		}

		lineCh := make(chan string, 1)
		errCh := make(chan error, 1)

		go func() {
			line, err := reader.ReadString('\n')
			if err != nil {
				errCh <- err
				return
			}
			lineCh <- line
		}()

		select {
		case line := <-lineCh:
			line = strings.TrimSpace(line)
			if line == "" {
				continue
			}
			s.handleMessage([]byte(line))
		case err := <-errCh:
			if err == io.EOF {
				return nil
			}
			return fmt.Errorf("read stdin: %w", err)
		case <-ctx.Done():
			return ctx.Err()
		}
	}
}

func (s *Server) handleMessage(raw []byte) {
	var msg struct {
		ID      json.RawMessage `json:"id"`
		Method  string          `json:"method"`
		Params  json.RawMessage `json:"params,omitempty"`
		JSONRPC string          `json:"jsonrpc"`
	}
	if err := json.Unmarshal(raw, &msg); err != nil {
		s.write(NewErrorResponse(nil, ErrCodeParse, "parse error: "+err.Error()))
		return
	}

	if msg.JSONRPC != "2.0" {
		s.write(NewErrorResponse(msg.ID, ErrCodeInvalidRequest, "invalid jsonrpc version"))
		return
	}

	isNotification := msg.ID == nil || len(msg.ID) == 0 || string(msg.ID) == "null"

	switch msg.Method {
	case "initialize":
		s.handleInitialize(msg.ID, msg.Params)
	case "ping":
		s.write(NewSuccessResponse(msg.ID, map[string]any{}))
	case "tools/list":
		s.handleListTools(msg.ID, msg.Params)
	case "tools/call":
		s.handleCallTool(msg.ID, msg.Params)
	default:
		if !isNotification {
			s.write(NewErrorResponse(msg.ID, ErrCodeMethodNotFound, "method not found: "+msg.Method))
		}
	}
}

func (s *Server) handleInitialize(id json.RawMessage, params json.RawMessage) {
	var initParams InitializeParams
	if params != nil {
		json.Unmarshal(params, &initParams)
	}

	result := InitializeResult{
		ProtocolVersion: ProtocolVersion,
		Capabilities: ServerCapabilities{
			Tools: &ToolsCapabilities{ListChanged: false},
		},
		ServerInfo: ServerInfo{
			Name:    "hieudoanm-mcp",
			Version: "1.0.0",
		},
	}

	s.write(NewSuccessResponse(id, result))
}

func (s *Server) handleListTools(id json.RawMessage, _ json.RawMessage) {
	tools := make([]Tool, 0, len(s.tools))
	for _, t := range s.tools {
		tools = append(tools, t)
	}

	s.write(NewSuccessResponse(id, ListToolsResult{Tools: tools}))
}

func (s *Server) handleCallTool(id json.RawMessage, params json.RawMessage) {
	var callParams ToolCallParams
	if err := json.Unmarshal(params, &callParams); err != nil {
		s.write(NewErrorResponse(id, ErrCodeInvalidParams, "invalid params: "+err.Error()))
		return
	}

	handler, ok := s.handlers[callParams.Name]
	if !ok {
		s.write(NewErrorResponse(id, ErrCodeMethodNotFound, "tool not found: "+callParams.Name))
		return
	}

	result := handler(callParams.Arguments)
	s.write(NewSuccessResponse(id, result))
}

func (s *Server) write(resp Response) {
	data, err := json.Marshal(resp)
	if err != nil {
		log.Printf("error marshaling response: %v", err)
		return
	}
	fmt.Fprintln(os.Stdout, string(data))
}

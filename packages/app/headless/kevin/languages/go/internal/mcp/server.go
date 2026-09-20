package mcp

import (
	"bufio"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"os"
	"sort"
	"strings"
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

// runWithReader serves requests read from in. A nil error is returned on clean
// EOF, which is how MCP clients signal shutdown.
func (s *Server) runWithReader(ctx context.Context, in io.Reader) error {
	results := make(chan readResult)
	go func() {
		defer close(results)
		reader := bufio.NewReader(in)
		for {
			line, tooLong, err := readFrame(reader)
			select {
			case results <- readResult{line: line, tooLong: tooLong, err: err}:
			case <-ctx.Done():
				return
			}
			if err != nil {
				return
			}
		}
	}()

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case result, ok := <-results:
			if !ok {
				return nil
			}
			s.handleFrame(result)
			if result.err != nil {
				return endOfInput(result.err)
			}
		}
	}
}

// readResult is one frame pulled off the input, or the reason reading stopped.
type readResult struct {
	line    string
	tooLong bool
	err     error
}

// readFrame reads one newline-terminated frame, refusing anything larger than
// MaxFrameBytes so a hostile or broken client cannot grow the heap without
// bound. An over-long frame leaves the reader on its remaining bytes, so the
// tail is discarded as junk and the stream resynchronises on the next newline.
func readFrame(reader *bufio.Reader) (string, bool, error) {
	var frame strings.Builder
	for {
		chunk, err := reader.ReadSlice('\n')
		if frame.Len()+len(chunk) > MaxFrameBytes {
			return "", true, nil
		}
		frame.Write(chunk)
		if err == nil {
			return frame.String(), false, nil
		}
		if errors.Is(err, bufio.ErrBufferFull) {
			continue
		}
		return frame.String(), false, err
	}
}

// handleFrame answers one frame, reporting an over-long one as a parse error
// and skipping blank lines.
func (s *Server) handleFrame(result readResult) {
	if result.tooLong {
		slog.Error("frame too large", "max", MaxFrameBytes)
		s.write(NewErrorResponse(nil, ErrCodeParse, "parse error: frame too large"))
		return
	}
	if line := strings.TrimSpace(result.line); line != "" {
		s.handleMessage([]byte(line))
	}
}

// endOfInput maps a read error onto the serve result: a clean EOF is how MCP
// clients signal shutdown and is not a failure.
func endOfInput(err error) error {
	if errors.Is(err, io.EOF) {
		return nil
	}
	return fmt.Errorf("read stdin: %w", err)
}

// handleMessage decodes one JSON-RPC frame and dispatches it. Undecodable
// frames produce an error reply.
//
// A notification — a frame carrying no id — is neither answered nor dispatched,
// whatever the method. Answering one desynchronises the client, and dispatching
// a tools/call notification would run a destructive tool with no reply to carry
// its result.
func (s *Server) handleMessage(raw []byte) {
	var request Request
	if err := json.Unmarshal(raw, &request); err != nil {
		s.write(NewErrorResponse(nil, ErrCodeParse, "parse error: "+err.Error()))
		return
	}
	if isNotification(request.ID) {
		slog.Debug("ignoring notification", "method", request.Method)
		return
	}
	if request.JSONRPC != "2.0" {
		s.reply(request.ID, NewErrorResponse(request.ID, ErrCodeInvalidRequest, "invalid jsonrpc version"))
		return
	}
	s.dispatch(request)
}

// dispatch answers one addressed request.
func (s *Server) dispatch(request Request) {
	switch request.Method {
	case "initialize":
		s.reply(request.ID, NewSuccessResponse(request.ID, initializeResult(request.Params)))
	case "ping":
		s.reply(request.ID, NewSuccessResponse(request.ID, PingResult{}))
	case "tools/list":
		s.reply(request.ID, NewSuccessResponse(request.ID, ListToolsResult{Tools: s.sortedTools()}))
	case "tools/call":
		s.reply(request.ID, s.callTool(request))
	default:
		slog.Debug("unknown method", "method", request.Method)
		s.reply(request.ID, NewErrorResponse(request.ID, ErrCodeMethodNotFound, "method not found: "+request.Method))
	}
}

// isNotification reports whether an id marks its frame as a notification. Both
// a missing id and an explicit null do, per JSON-RPC 2.0.
func isNotification(id json.RawMessage) bool {
	return len(id) == 0 || string(id) == "null"
}

// reply writes response unless id marks the frame as a notification.
func (s *Server) reply(id json.RawMessage, response Response) {
	if isNotification(id) {
		return
	}
	s.write(response)
}

// handleListTools used to inline this; sortedTools is the listable view.
func (s *Server) sortedTools() []Tool {
	s.mu.Lock()
	defer s.mu.Unlock()

	tools := make([]Tool, 0, len(s.tools))
	for _, tool := range s.tools {
		tools = append(tools, tool)
	}
	sort.Slice(tools, func(i, j int) bool { return tools[i].Name < tools[j].Name })
	return tools
}

// callTool runs the named tool and wraps its result in a reply. A malformed
// params object or an unregistered name is a JSON-RPC error.
func (s *Server) callTool(request Request) Response {
	var call ToolCallParams
	if err := json.Unmarshal(objectOrEmpty(request.Params), &call); err != nil {
		return NewErrorResponse(request.ID, ErrCodeInvalidParams, "invalid params: "+err.Error())
	}

	s.mu.Lock()
	handler, ok := s.handlers[call.Name]
	s.mu.Unlock()
	if !ok {
		return NewErrorResponse(request.ID, ErrCodeMethodNotFound, "tool not found: "+call.Name)
	}
	return NewSuccessResponse(request.ID, handler(call.Arguments))
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

package mcp

import (
	"bufio"
	"context"
	"errors"
	"fmt"
	"io"
	"strings"
)

// runWithReader serves requests read from in. A nil error is returned on clean
// EOF, which is how MCP clients signal shutdown.
func (s *Server) runWithReader(ctx context.Context, in io.Reader) error {
	results := make(chan readResult)
	go readLines(ctx, in, results)

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case result, ok := <-results:
			if !ok {
				return nil
			}
			if line := strings.TrimSpace(result.line); line != "" {
				s.handleMessage([]byte(line))
			}
			if result.err != nil {
				if errors.Is(result.err, io.EOF) {
					return nil
				}
				return fmt.Errorf("read stdin: %w", result.err)
			}
		}
	}
}

// readResult is one line produced by readLines.
type readResult struct {
	line string
	err  error
}

// readLines pumps newline-delimited frames from in into out on its own
// goroutine, so the dispatch loop can also watch for context cancellation.
// The channel is closed when in is exhausted.
func readLines(ctx context.Context, in io.Reader, out chan<- readResult) {
	defer close(out)

	reader := bufio.NewReader(in)
	for {
		line, err := reader.ReadString('\n')
		select {
		case out <- readResult{line: line, err: err}:
		case <-ctx.Done():
			return
		}
		if err != nil {
			return
		}
	}
}

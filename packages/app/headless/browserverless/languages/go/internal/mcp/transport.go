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
	type readResult struct {
		line string
		err  error
	}

	results := make(chan readResult)
	go func() {
		defer close(results)
		reader := bufio.NewReader(in)
		for {
			line, err := reader.ReadString('\n')
			select {
			case results <- readResult{line: line, err: err}:
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
			if line := strings.TrimSpace(result.line); line != "" {
				s.handleMessage(ctx, []byte(line))
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

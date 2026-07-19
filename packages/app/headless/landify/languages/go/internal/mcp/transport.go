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
			s.handleFrame(result)
			if result.err != nil {
				return endOfInput(result.err)
			}
		}
	}
}

// readResult is one frame produced by readLines.
type readResult struct {
	line    string
	tooLong bool
	err     error
}

// readLines pumps newline-delimited frames from in into out on its own
// goroutine, so the dispatch loop can also watch for context cancellation.
// The channel is closed when in is exhausted.
func readLines(ctx context.Context, in io.Reader, out chan<- readResult) {
	defer close(out)

	reader := bufio.NewReader(in)
	for {
		line, tooLong, err := readFrame(reader)
		select {
		case out <- readResult{line: line, tooLong: tooLong, err: err}:
		case <-ctx.Done():
			return
		}
		if err != nil {
			return
		}
	}
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

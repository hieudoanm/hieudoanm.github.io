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
		frame   string
		tooLong bool
		err     error
	}

	results := make(chan readResult)
	go func() {
		defer close(results)
		reader := bufio.NewReader(in)
		for {
			frame, tooLong, err := readFrame(reader)
			select {
			case results <- readResult{frame: frame, tooLong: tooLong, err: err}:
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
			if result.tooLong {
				s.write(NewErrorResponse(nil, ErrCodeParse, "parse error: frame too large"))
				continue
			}
			if line := strings.TrimSpace(result.frame); line != "" {
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

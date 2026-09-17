package mcp

import (
	"bufio"
	"context"
	"errors"
	"fmt"
	"io"
	"strings"
)

// runWithReader serves requests read from reader until EOF or ctx is done. A
// clean EOF is not a failure: it is how MCP clients signal shutdown.
func runWithReader(ctx context.Context, reader io.Reader, server *Server) error {
	buf := bufio.NewReader(reader)
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
		}

		frame, tooLong, err := readFrame(buf)
		if tooLong {
			server.write(NewErrorResponse(nil, ErrCodeParse, "parse error: frame too large"))
		} else if line := strings.TrimSpace(frame); line != "" {
			server.handleMessage([]byte(line))
		}
		if err != nil {
			if errors.Is(err, io.EOF) {
				return nil
			}
			return fmt.Errorf("read stdin: %w", err)
		}
	}
}

// readFrame reads one newline-terminated frame, refusing anything larger than
// MaxFrameBytes so a hostile or broken client cannot grow the heap without
// bound. An over-long frame drains the rest of its own line before returning,
// so the tail is discarded as junk and the next call starts on a real frame
// boundary instead of the middle of the oversized one.
func readFrame(reader *bufio.Reader) (string, bool, error) {
	var frame strings.Builder
	tooLong := false
	for {
		chunk, err := reader.ReadSlice('\n')
		if !tooLong {
			if frame.Len()+len(chunk) > MaxFrameBytes {
				// Stop accumulating but keep going, so the remainder of this line
				// is dropped instead of being read as the next frame.
				frame.Reset()
				tooLong = true
			} else {
				frame.Write(chunk)
			}
		}
		if err == nil {
			return frame.String(), tooLong, nil
		}
		if errors.Is(err, bufio.ErrBufferFull) {
			continue
		}
		return frame.String(), tooLong, err
	}
}

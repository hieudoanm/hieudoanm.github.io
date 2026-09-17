package mcp

import (
	"bufio"
	"bytes"
	"strings"
	"testing"
)

func TestReadFrameDrainsOversizedFrameBeforeResync(t *testing.T) {
	// An oversized line must be dropped whole. If its tail were left in the
	// reader, the next call would read that tail as a frame and answer the
	// following ping with a parse error instead of a result.
	//
	// The padding deliberately overshoots the cap by a second buffer's worth plus
	// a few bytes. MaxFrameBytes is an exact multiple of bufio's 4096-byte
	// buffer, so padding of exactly MaxFrameBytes+1 would leave the reader
	// already on the newline and the missing drain would go unnoticed.
	padding := MaxFrameBytes + 2*4096 + 7

	var input bytes.Buffer
	input.Write(bytes.Repeat([]byte("x"), padding))
	input.WriteString("\n")
	input.WriteString(`{"jsonrpc":"2.0","id":2,"method":"ping"}` + "\n")

	reader := bufio.NewReader(&input)

	frame, tooLong, err := readFrame(reader)
	if err != nil {
		t.Fatalf("readFrame: %v", err)
	}
	if !tooLong {
		t.Fatal("the oversized frame must be reported as too long")
	}
	if frame != "" {
		t.Fatalf("an oversized frame must yield no content, got %d bytes", len(frame))
	}

	frame, tooLong, err = readFrame(reader)
	if err != nil {
		t.Fatalf("readFrame after oversized: %v", err)
	}
	if tooLong {
		t.Fatal("the tail of the oversized frame leaked into the next read")
	}
	if !strings.Contains(frame, `"id":2`) {
		t.Fatalf("expected the next whole frame, got %d bytes of padding", len(frame))
	}
}

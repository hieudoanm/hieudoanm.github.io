package tests

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"os/exec"
	"path/filepath"
	"testing"
	"time"
)

// buildFreshBinary compiles the current tree into a temporary path. The shared
// buildBinary reuses ../bin when it exists, which would let a stale binary pass
// these end-to-end checks.
func buildFreshBinary(t *testing.T) string {
	t.Helper()

	binPath := filepath.Join(t.TempDir(), "browserverless")
	cmd := exec.Command("go", "build", "-o", binPath, "./..")
	cmd.Stderr = &bytes.Buffer{}
	if err := cmd.Run(); err != nil {
		t.Fatalf("build binary: %v\nstderr: %s", err, cmd.Stderr.(*bytes.Buffer).String())
	}
	return binPath
}

// mcpSession drives `browserverless mcp serve` over pipes exactly as an MCP
// client would: one JSON-RPC frame per line in, one per line out.
type mcpSession struct {
	cmd    *exec.Cmd
	stdin  io.WriteCloser
	stdout *bufio.Reader
	stderr *bytes.Buffer
}

type mcpResponse struct {
	JSONRPC string          `json:"jsonrpc"`
	ID      json.RawMessage `json:"id"`
	Result  json.RawMessage `json:"result"`
	Error   *mcpError       `json:"error"`
}

type mcpError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type mcpToolResult struct {
	Content []struct {
		Type     string `json:"type"`
		Text     string `json:"text"`
		Data     string `json:"data"`
		MimeType string `json:"mimeType"`
	} `json:"content"`
	IsError bool `json:"isError"`
}

func startMCP(t *testing.T, binPath string, args ...string) *mcpSession {
	t.Helper()

	cmd := exec.Command(binPath, append([]string{"mcp", "serve"}, args...)...)
	stdin, err := cmd.StdinPipe()
	if err != nil {
		t.Fatalf("stdin pipe: %v", err)
	}
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		t.Fatalf("stdout pipe: %v", err)
	}
	stderr := &bytes.Buffer{}
	cmd.Stderr = stderr

	if err := cmd.Start(); err != nil {
		t.Fatalf("start mcp serve: %v", err)
	}

	session := &mcpSession{cmd: cmd, stdin: stdin, stdout: bufio.NewReader(stdout), stderr: stderr}
	t.Cleanup(func() { session.close(t) })
	return session
}

// send writes one frame. The trailing newline is the frame delimiter.
func (s *mcpSession) send(t *testing.T, frame string) {
	t.Helper()

	if _, err := fmt.Fprintln(s.stdin, frame); err != nil {
		t.Fatalf("send frame: %v", err)
	}
}

// receive reads exactly one response frame, which also proves stdout carries
// nothing but JSON-RPC.
func (s *mcpSession) receive(t *testing.T) mcpResponse {
	t.Helper()

	line, err := s.stdout.ReadString('\n')
	if err != nil {
		t.Fatalf("read response: %v\nstderr: %s", err, s.stderr.String())
	}
	var response mcpResponse
	if err := json.Unmarshal([]byte(line), &response); err != nil {
		t.Fatalf("decode response %q: %v", line, err)
	}
	if response.JSONRPC != "2.0" {
		t.Errorf("jsonrpc = %q, want 2.0", response.JSONRPC)
	}
	return response
}

// callTool sends a tools/call frame and returns the decoded result.
func (s *mcpSession) callTool(t *testing.T, id int, name string, args any) mcpToolResult {
	t.Helper()

	params := map[string]any{"name": name}
	if args != nil {
		params["arguments"] = args
	}
	frame, err := json.Marshal(map[string]any{
		"jsonrpc": "2.0",
		"id":      id,
		"method":  "tools/call",
		"params":  params,
	})
	if err != nil {
		t.Fatalf("encode frame: %v", err)
	}

	s.send(t, string(frame))
	response := s.receive(t)
	if response.Error != nil {
		t.Fatalf("tools/call %s returned an error: %+v", name, response.Error)
	}

	var result mcpToolResult
	if err := json.Unmarshal(response.Result, &result); err != nil {
		t.Fatalf("decode tool result: %v", err)
	}
	return result
}

// close shuts the session down the way a client does, by closing stdin, and
// returns the process exit code.
func (s *mcpSession) close(t *testing.T) int {
	t.Helper()

	if err := s.stdin.Close(); err != nil {
		return -1
	}

	done := make(chan error, 1)
	go func() { done <- s.cmd.Wait() }()
	select {
	case err := <-done:
		if err != nil {
			return s.cmd.ProcessState.ExitCode()
		}
		return 0
	case <-time.After(10 * time.Second):
		s.cmd.Process.Kill()
		<-done
		t.Fatalf("mcp serve did not exit after stdin closed\nstderr: %s", s.stderr.String())
		return -1
	}
}

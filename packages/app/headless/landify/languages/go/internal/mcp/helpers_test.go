package mcp

import (
	"bytes"
	"context"
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

// testWorkspace returns a Workspace rooted at a fresh temp directory, plus a
// helper that writes a file into it.
func testWorkspace(t *testing.T) (*Workspace, func(string, string)) {
	t.Helper()

	ws, err := NewWorkspace(t.TempDir())
	if err != nil {
		t.Fatalf("NewWorkspace: %v", err)
	}
	return ws, func(name, content string) {
		t.Helper()
		if err := ws.Write(name, []byte(content)); err != nil {
			t.Fatalf("seed %s: %v", name, err)
		}
	}
}

// runServer drives one MCP session against a server holding ws and returns the
// raw stdout the client would see.
func runServer(t *testing.T, ws *Workspace, input string) string {
	t.Helper()

	server := NewServerWithIO(nil)
	Register(server, ws)
	return runServerOn(t, server, input)
}

// mustWorkspace returns a Workspace rooted at a fresh temp directory.
func mustWorkspace(t *testing.T) *Workspace {
	t.Helper()

	ws, err := NewWorkspace(t.TempDir())
	if err != nil {
		t.Fatalf("NewWorkspace: %v", err)
	}
	return ws
}

// runServerOn drives the given server over one session and returns its output.
func runServerOn(t *testing.T, server *Server, input string) string {
	t.Helper()

	var out bytes.Buffer
	server.mu.Lock()
	server.out = &out
	server.mu.Unlock()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.runWithReader(ctx, strings.NewReader(input)); err != nil {
		t.Fatalf("run: %v", err)
	}
	return out.String()
}

// callTool sends a single tools/call frame and returns the decoded tool result,
// failing the test if the server answered with a JSON-RPC error instead.
func callTool(t *testing.T, ws *Workspace, name, arguments string) ToolResult {
	t.Helper()

	frame := `{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"` +
		name + `","arguments":` + arguments + `}}`

	var response struct {
		Result ToolResult
		Error  *ErrorObject
	}
	decode(t, runServer(t, ws, frame), &response)
	if response.Error != nil {
		t.Fatalf("tool %s returned a jsonrpc error: %+v", name, *response.Error)
	}
	return response.Result
}

// callToolText sends a tools/call frame and returns the single text block of
// the result, failing the test when the tool reported an error.
func callToolText(t *testing.T, ws *Workspace, name, arguments string) string {
	t.Helper()

	result := callTool(t, ws, name, arguments)
	if result.IsError {
		t.Fatalf("tool %s failed unexpectedly: %s", name, resultText(t, result))
	}
	if len(result.Content) != 1 {
		t.Fatalf("expected one content block, got %d", len(result.Content))
	}
	return result.Content[0].Text
}

// callToolError sends a tools/call frame and returns the error text, failing
// the test when the tool unexpectedly succeeded.
func callToolError(t *testing.T, ws *Workspace, name, arguments string) string {
	t.Helper()

	result := callTool(t, ws, name, arguments)
	if !result.IsError {
		t.Fatalf("expected tool %s to fail, got: %s", name, resultText(t, result))
	}
	return resultText(t, result)
}

// resultText joins every text block of a tool result.
func resultText(t *testing.T, result ToolResult) string {
	t.Helper()

	var b strings.Builder
	for _, item := range result.Content {
		b.WriteString(item.Text)
	}
	return b.String()
}

// decode unmarshals one captured response frame into dst.
func decode(t *testing.T, out string, dst any) {
	t.Helper()

	line := strings.TrimSpace(out)
	if line == "" {
		t.Fatal("server produced no output")
	}
	if err := json.Unmarshal([]byte(line), dst); err != nil {
		t.Fatalf("unmarshal %q: %v", line, err)
	}
}

// responseLines splits captured output into non-empty response frames.
func responseLines(t *testing.T, out string) []string {
	t.Helper()

	var lines []string
	for _, line := range strings.Split(strings.TrimSpace(out), "\n") {
		if line != "" {
			lines = append(lines, line)
		}
	}
	return lines
}

// blockingReader blocks forever, modelling a client that stays connected.
type blockingReader struct{}

// Read never returns, so the transport loop can only exit via its context.
func (blockingReader) Read([]byte) (int, error) {
	select {}
}

// validYAML is a minimal config that passes validation, used wherever the test
// is about the tool rather than the schema. It uses the faq layout because
// that is the one type needing no media assets.
const validYAML = `type: faq
site:
  name: Test Help
  description: Answers to common questions about the test page.
  nav:
    - label: Questions
      href: "#faq"
hero:
  headline: Questions, answered.
  subheadline: Straight answers to what people ask most often.
faq:
  items:
    - question: Does this need a build step?
      answer: No. Landify emits one flat HTML file with inline CSS.
cta:
  heading: Still curious?
  body: Ask a human and we answer within a day.
  button:
    label: Contact support
    href: mailto:support@example.com
footer:
  copyright: "© 2026 Test"
`

// assertFileContains fails unless the file at path holds want.
func assertFileContains(t *testing.T, root, path, want string) {
	t.Helper()

	data, err := os.ReadFile(filepath.Join(root, path))
	if err != nil {
		t.Fatalf("read %s: %v", path, err)
	}
	if !strings.Contains(string(data), want) {
		t.Fatalf("expected %s to contain %q, got %d bytes", path, want, len(data))
	}
}

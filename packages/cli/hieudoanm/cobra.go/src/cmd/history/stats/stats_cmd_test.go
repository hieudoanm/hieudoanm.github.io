package stats

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/history/testutil"
	"github.com/hieudoanm/jack/src/libs/history"
)

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "stats" {
		t.Errorf("Use = %q, want %q", cmd.Use, "stats")
	}
}

func TestStatsCmd_RunE_Empty(t *testing.T) {
	testutil.SetHomeTempDir(t)

	cmd := NewCmd()
	cmd.SetArgs([]string{})
	out, err := testutil.CaptureStdout(t, cmd.Execute)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(out, "CLI commands:  0") {
		t.Errorf("output should contain 'CLI commands:  0', got: %s", out)
	}
	if !strings.Contains(out, "MCP tool calls: 0") {
		t.Errorf("output should contain 'MCP tool calls: 0', got: %s", out)
	}
}

func TestStatsCmd_RunE_WithEntries(t *testing.T) {
	testutil.SetHomeTempDir(t)

	history.Append(history.Entry{Timestamp: "now", Source: "cli", Command: "ls", DurationMs: 10})
	history.Append(history.Entry{Timestamp: "now", Source: "cli", Command: "ls", DurationMs: 20})
	history.Append(history.Entry{Timestamp: "now", Source: "mcp", Command: "file.read", DurationMs: 30, Error: "not found"})
	history.Append(history.Entry{Timestamp: "now", Source: "mcp", Command: "file.write", DurationMs: 40})

	cmd := NewCmd()
	cmd.SetArgs([]string{})
	out, err := testutil.CaptureStdout(t, cmd.Execute)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(out, "CLI commands:  2") {
		t.Errorf("output should contain 'CLI commands:  2', got: %s", out)
	}
	if !strings.Contains(out, "MCP tool calls: 2") {
		t.Errorf("output should contain 'MCP tool calls: 2', got: %s", out)
	}
	if !strings.Contains(out, "Top commands:") {
		t.Errorf("output should contain 'Top commands:', got: %s", out)
	}
	if !strings.Contains(out, "Top errors:") {
		t.Errorf("output should contain 'Top errors:', got: %s", out)
	}
}

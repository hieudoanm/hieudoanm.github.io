package history

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/libs/history"
)

func TestNewListCmd(t *testing.T) {
	cmd := newListCmd()
	if cmd.Use != "list" {
		t.Errorf("Use = %q, want %q", cmd.Use, "list")
	}
	flag := cmd.Flags().Lookup("limit")
	if flag == nil {
		t.Fatal("expected --limit flag")
	}
	if flag.DefValue != "20" {
		t.Errorf("--limit default = %q, want %q", flag.DefValue, "20")
	}
}

func TestListCmd_RunE_Empty(t *testing.T) {
	setHomeTempDir(t)

	cmd := newListCmd()
	cmd.SetArgs([]string{})
	_, err := captureStdout(t, cmd.Execute)
	if err != nil {
		t.Fatal(err)
	}
}

func TestListCmd_RunE_WithEntries(t *testing.T) {
	setHomeTempDir(t)

	history.Append(history.Entry{Timestamp: "2025-01-01T00:00:00Z", Source: "cli", Command: "ls -la"})
	history.Append(history.Entry{Timestamp: "2025-01-01T00:00:01Z", Source: "mcp", Command: "file.read"})

	cmd := newListCmd()
	cmd.SetArgs([]string{})
	out, err := captureStdout(t, cmd.Execute)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(out, "ls -la") {
		t.Errorf("output should contain 'ls -la', got: %s", out)
	}
	if !strings.Contains(out, "file.read") {
		t.Errorf("output should contain 'file.read', got: %s", out)
	}
}

func TestListCmd_RunE_WithLimit(t *testing.T) {
	setHomeTempDir(t)

	for i := 0; i < 10; i++ {
		history.Append(history.Entry{Timestamp: "now", Source: "cli", Command: "cmd", DurationMs: int64(i)})
	}

	cmd := newListCmd()
	cmd.SetArgs([]string{"--limit", "3"})
	out, err := captureStdout(t, cmd.Execute)
	if err != nil {
		t.Fatal(err)
	}
	lines := strings.Split(out, "\n")
	if len(lines) != 3 {
		t.Errorf("expected 3 lines, got %d", len(lines))
	}
}

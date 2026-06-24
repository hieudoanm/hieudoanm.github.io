package list

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/history/testutil"
	"github.com/hieudoanm/jack/src/libs/history"
)

func TestRunList_Empty(t *testing.T) {
	testutil.SetHomeTempDir(t)

	err := runList(10, false)
	if err != nil {
		t.Fatal(err)
	}
}

func TestRunList_WithEntries(t *testing.T) {
	testutil.SetHomeTempDir(t)

	history.Append(history.Entry{Timestamp: "2025-01-01T00:00:00Z", Source: "cli", Command: "ls -la"})
	history.Append(history.Entry{Timestamp: "2025-01-01T00:00:01Z", Source: "mcp", Command: "file.read"})

	out, err := testutil.CaptureStdout(t, func() error { return runList(10, false) })
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

func TestRunList_WithLimit(t *testing.T) {
	testutil.SetHomeTempDir(t)

	for i := 0; i < 10; i++ {
		history.Append(history.Entry{Timestamp: "now", Source: "cli", Command: "cmd", DurationMs: int64(i)})
	}

	out, err := testutil.CaptureStdout(t, func() error { return runList(3, false) })
	if err != nil {
		t.Fatal(err)
	}
	lines := strings.Split(out, "\n")
	if len(lines) != 3 {
		t.Errorf("expected 3 lines, got %d", len(lines))
	}
}

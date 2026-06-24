package search

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/history/testutil"
	"github.com/hieudoanm/jack/src/libs/history"
)

func TestRunSearch_NoMatches(t *testing.T) {
	testutil.SetHomeTempDir(t)

	history.Append(history.Entry{Timestamp: "now", Source: "cli", Command: "ls -la"})

	out, err := testutil.CaptureStdout(t, func() error { return runSearch("zzzz", 20, false) })
	if err != nil {
		t.Fatal(err)
	}
	if out != "" {
		t.Errorf("expected no output, got: %s", out)
	}
}

func TestRunSearch_WithMatches(t *testing.T) {
	testutil.SetHomeTempDir(t)

	history.Append(history.Entry{Timestamp: "2025-01-01T00:00:00Z", Source: "cli", Command: "ls -la"})
	history.Append(history.Entry{Timestamp: "2025-01-01T00:00:01Z", Source: "cli", Command: "git status"})

	out, err := testutil.CaptureStdout(t, func() error { return runSearch("ls", 20, false) })
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(out, "ls -la") {
		t.Errorf("output should contain 'ls -la', got: %s", out)
	}
	if strings.Contains(out, "git status") {
		t.Errorf("output should NOT contain 'git status', got: %s", out)
	}
}

func TestRunSearch_WithLimit(t *testing.T) {
	testutil.SetHomeTempDir(t)

	for i := 0; i < 10; i++ {
		history.Append(history.Entry{Timestamp: "now", Source: "cli", Command: "build", DurationMs: int64(i)})
	}

	out, err := testutil.CaptureStdout(t, func() error { return runSearch("build", 3, false) })
	if err != nil {
		t.Fatal(err)
	}
	lines := strings.Split(out, "\n")
	if len(lines) != 3 {
		t.Errorf("expected 3 lines, got %d", len(lines))
	}
}

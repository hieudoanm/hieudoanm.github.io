package history

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/libs/history"
)

func TestNewSearchCmd(t *testing.T) {
	cmd := newSearchCmd()
	if cmd.Use != "search <query>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "search <query>")
	}
	if cmd.Args == nil {
		t.Fatal("expected Args validator")
	}
	flag := cmd.Flags().Lookup("limit")
	if flag == nil {
		t.Fatal("expected --limit flag")
	}
	if flag.DefValue != "20" {
		t.Errorf("--limit default = %q, want %q", flag.DefValue, "20")
	}
}

func TestSearchCmd_RunE_NoArgs(t *testing.T) {
	setHomeTempDir(t)

	cmd := newSearchCmd()
	cmd.SetArgs([]string{})
	_, err := captureStdout(t, cmd.Execute)
	if err == nil {
		t.Error("expected error for missing args")
	}
}

func TestSearchCmd_RunE_NoMatches(t *testing.T) {
	setHomeTempDir(t)

	history.Append(history.Entry{Timestamp: "now", Source: "cli", Command: "ls -la"})

	cmd := newSearchCmd()
	cmd.SetArgs([]string{"zzzz"})
	_, err := captureStdout(t, cmd.Execute)
	if err != nil {
		t.Fatal(err)
	}
}

func TestSearchCmd_RunE_WithMatches(t *testing.T) {
	setHomeTempDir(t)

	history.Append(history.Entry{Timestamp: "2025-01-01T00:00:00Z", Source: "cli", Command: "ls -la"})
	history.Append(history.Entry{Timestamp: "2025-01-01T00:00:01Z", Source: "cli", Command: "git status"})

	cmd := newSearchCmd()
	cmd.SetArgs([]string{"ls"})
	out, err := captureStdout(t, cmd.Execute)
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

func TestSearchCmd_RunE_WithLimit(t *testing.T) {
	setHomeTempDir(t)

	for i := 0; i < 10; i++ {
		history.Append(history.Entry{Timestamp: "now", Source: "cli", Command: "build", DurationMs: int64(i)})
	}

	cmd := newSearchCmd()
	cmd.SetArgs([]string{"build", "--limit", "3"})
	out, err := captureStdout(t, cmd.Execute)
	if err != nil {
		t.Fatal(err)
	}
	lines := strings.Split(out, "\n")
	if len(lines) != 3 {
		t.Errorf("expected 3 lines, got %d", len(lines))
	}
}

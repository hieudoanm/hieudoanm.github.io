package history

import (
	"testing"
)

func setHomeTempDir(t *testing.T) string {
	t.Helper()
	tmpDir := t.TempDir()
	t.Setenv("HOME", tmpDir)
	t.Setenv("USERPROFILE", tmpDir)
	return tmpDir
}

func TestAppendAndList(t *testing.T) {
	setHomeTempDir(t)

	e1 := Entry{Timestamp: "2025-01-01T00:00:00Z", Source: "cli", Command: "ls -la", CWD: "/tmp", DurationMs: 100}
	e2 := Entry{Timestamp: "2025-01-01T00:00:01Z", Source: "mcp", Command: "file.read", CWD: "/tmp", DurationMs: 50}

	if err := Append(e1); err != nil {
		t.Fatalf("Append failed: %v", err)
	}
	if err := Append(e2); err != nil {
		t.Fatalf("Append failed: %v", err)
	}

	entries, err := List(0)
	if err != nil {
		t.Fatalf("List failed: %v", err)
	}
	if len(entries) != 2 {
		t.Fatalf("expected 2 entries, got %d", len(entries))
	}
	if entries[0].Command != "ls -la" {
		t.Errorf("expected first entry command 'ls -la', got %q", entries[0].Command)
	}
	if entries[1].Command != "file.read" {
		t.Errorf("expected second entry command 'file.read', got %q", entries[1].Command)
	}
}

func TestListWithCount(t *testing.T) {
	setHomeTempDir(t)

	for i := 0; i < 10; i++ {
		Append(Entry{Timestamp: "2025-01-01T00:00:00Z", Source: "cli", Command: "cmd", DurationMs: 0})
	}

	entries, err := List(3)
	if err != nil {
		t.Fatalf("List failed: %v", err)
	}
	if len(entries) != 3 {
		t.Fatalf("expected 3 entries, got %d", len(entries))
	}
}

func TestListEmpty(t *testing.T) {
	setHomeTempDir(t)
	entries, err := List(10)
	if err != nil {
		t.Fatalf("List on empty history failed: %v", err)
	}
	if len(entries) != 0 {
		t.Fatalf("expected 0 entries, got %d", len(entries))
	}
}

func TestSearchEmpty(t *testing.T) {
	setHomeTempDir(t)
	results, err := Search("foo", 10)
	if err != nil {
		t.Fatalf("Search on empty history failed: %v", err)
	}
	if len(results) != 0 {
		t.Fatalf("expected 0 results, got %d", len(results))
	}
}

func TestSearchExactMatch(t *testing.T) {
	setHomeTempDir(t)

	Append(Entry{Timestamp: "2025-01-01T00:00:00Z", Source: "cli", Command: "ls -la", DurationMs: 0})
	Append(Entry{Timestamp: "2025-01-01T00:00:01Z", Source: "cli", Command: "git status", DurationMs: 0})
	Append(Entry{Timestamp: "2025-01-01T00:00:02Z", Source: "cli", Command: "ls -la", DurationMs: 0})

	results, err := Search("ls -la", 10)
	if err != nil {
		t.Fatalf("Search failed: %v", err)
	}
	if len(results) != 2 {
		t.Fatalf("expected 2 results, got %d", len(results))
	}
}

func TestSearchPartialMatch(t *testing.T) {
	setHomeTempDir(t)

	Append(Entry{Timestamp: "2025-01-01T00:00:00Z", Source: "cli", Command: "/usr/bin/python script.py", DurationMs: 0})
	Append(Entry{Timestamp: "2025-01-01T00:00:01Z", Source: "cli", Command: "python -m pytest", DurationMs: 0})
	Append(Entry{Timestamp: "2025-01-01T00:00:02Z", Source: "cli", Command: "go test ./...", DurationMs: 0})

	results, err := Search("python", 10)
	if err != nil {
		t.Fatalf("Search failed: %v", err)
	}
	if len(results) != 2 {
		t.Fatalf("expected 2 results, got %d", len(results))
	}
}

func TestSearchWithLimit(t *testing.T) {
	setHomeTempDir(t)

	for i := 0; i < 10; i++ {
		Append(Entry{Timestamp: "2025-01-01T00:00:00Z", Source: "cli", Command: "build", DurationMs: 0})
	}

	results, err := Search("build", 3)
	if err != nil {
		t.Fatalf("Search failed: %v", err)
	}
	if len(results) != 3 {
		t.Fatalf("expected 3 results, got %d", len(results))
	}
}

func TestSearchCaseInsensitive(t *testing.T) {
	setHomeTempDir(t)

	Append(Entry{Timestamp: "2025-01-01T00:00:00Z", Source: "cli", Command: "Git Push", DurationMs: 0})

	results, err := Search("git push", 10)
	if err != nil {
		t.Fatalf("Search failed: %v", err)
	}
	if len(results) != 1 {
		t.Fatalf("expected 1 result, got %d", len(results))
	}
}

func TestClear(t *testing.T) {
	setHomeTempDir(t)

	Append(Entry{Timestamp: "2025-01-01T00:00:00Z", Source: "cli", Command: "ls", DurationMs: 0})

	if err := Clear(); err != nil {
		t.Fatalf("Clear failed: %v", err)
	}

	entries, err := List(10)
	if err != nil {
		t.Fatalf("List after clear failed: %v", err)
	}
	if len(entries) != 0 {
		t.Fatalf("expected 0 entries after clear, got %d", len(entries))
	}
}

func TestClearEmpty(t *testing.T) {
	setHomeTempDir(t)
	if err := Clear(); err != nil {
		t.Fatalf("Clear on empty history should not error: %v", err)
	}
}

func TestComputeStats(t *testing.T) {
	setHomeTempDir(t)

	Append(Entry{Timestamp: "2025-01-01T00:00:00Z", Source: "cli", Command: "ls", DurationMs: 10})
	Append(Entry{Timestamp: "2025-01-01T00:00:01Z", Source: "cli", Command: "ls", DurationMs: 20})
	Append(Entry{Timestamp: "2025-01-01T00:00:02Z", Source: "mcp", Command: "file.read", DurationMs: 30, Error: "not found"})
	Append(Entry{Timestamp: "2025-01-01T00:00:03Z", Source: "mcp", Command: "file.write", DurationMs: 40})

	stats, err := ComputeStats()
	if err != nil {
		t.Fatalf("ComputeStats failed: %v", err)
	}
	if stats.TotalCLI != 2 {
		t.Errorf("expected TotalCLI 2, got %d", stats.TotalCLI)
	}
	if stats.TotalMCP != 2 {
		t.Errorf("expected TotalMCP 2, got %d", stats.TotalMCP)
	}
	if len(stats.TopCommands) != 3 {
		t.Fatalf("expected 3 top commands, got %d", len(stats.TopCommands))
	}
	if stats.TopCommands[0].Name != "ls" || stats.TopCommands[0].Count != 2 {
		t.Errorf("expected top command 'ls' with count 2, got %q with count %d", stats.TopCommands[0].Name, stats.TopCommands[0].Count)
	}
	if len(stats.TopErrors) != 1 {
		t.Fatalf("expected 1 top error, got %d", len(stats.TopErrors))
	}
	if stats.TopErrors[0].Name != "file.read" {
		t.Errorf("expected top error 'file.read', got %q", stats.TopErrors[0].Name)
	}
}

func TestComputeStatsEmpty(t *testing.T) {
	setHomeTempDir(t)
	stats, err := ComputeStats()
	if err != nil {
		t.Fatalf("ComputeStats on empty history failed: %v", err)
	}
	if stats.TotalCLI != 0 || stats.TotalMCP != 0 {
		t.Errorf("expected zero counts, got CLI=%d MCP=%d", stats.TotalCLI, stats.TotalMCP)
	}
	if len(stats.TopCommands) != 0 {
		t.Errorf("expected no top commands, got %d", len(stats.TopCommands))
	}
}

func TestEntryString(t *testing.T) {
	e := Entry{Timestamp: "2025-01-01T00:00:00Z", Source: "cli", Command: "ls -la", CWD: "/tmp", DurationMs: 100}
	s := e.String()
	if s != "2025-01-01T00:00:00Z  ls -la" {
		t.Errorf("unexpected String(): %q", s)
	}
}

func TestEntryStringWithError(t *testing.T) {
	e := Entry{Timestamp: "2025-01-01T00:00:00Z", Source: "cli", Command: "rm -rf /", DurationMs: 500, Error: "permission denied"}
	s := e.String()
	if s != "2025-01-01T00:00:00Z  rm -rf /  [permission denied]" {
		t.Errorf("unexpected String(): %q", s)
	}
}

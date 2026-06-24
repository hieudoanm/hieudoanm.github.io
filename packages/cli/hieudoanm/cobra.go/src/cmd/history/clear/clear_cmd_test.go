package clear

import (
	"testing"

	"github.com/hieudoanm/jack/src/cmd/history/testutil"
	"github.com/hieudoanm/jack/src/libs/history"
)

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "clear" {
		t.Errorf("Use = %q, want %q", cmd.Use, "clear")
	}
}

func TestClearCmd_RunE(t *testing.T) {
	testutil.SetHomeTempDir(t)

	if err := history.Append(history.Entry{Timestamp: "now", Source: "cli", Command: "test"}); err != nil {
		t.Fatal(err)
	}

	cmd := NewCmd()
	cmd.SetArgs([]string{})
	out, err := testutil.CaptureStdout(t, cmd.Execute)
	if err != nil {
		t.Fatal(err)
	}
	if out != "history cleared" {
		t.Errorf("output = %q, want %q", out, "history cleared")
	}

	entries, _ := history.List(10)
	if len(entries) != 0 {
		t.Errorf("expected 0 entries after clear, got %d", len(entries))
	}
}

func TestClearCmd_RunE_Empty(t *testing.T) {
	testutil.SetHomeTempDir(t)

	cmd := NewCmd()
	cmd.SetArgs([]string{})
	out, err := testutil.CaptureStdout(t, cmd.Execute)
	if err != nil {
		t.Fatal(err)
	}
	if out != "history cleared" {
		t.Errorf("output = %q, want %q", out, "history cleared")
	}
}

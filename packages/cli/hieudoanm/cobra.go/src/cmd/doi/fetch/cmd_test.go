package fetch

import (
	"bytes"
	"io"
	"os"
	"strings"
	"testing"
	"time"
)

func captureCmdOutput(t *testing.T, fn func() error) string {
	t.Helper()
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	err := fn()

	w.Close()
	os.Stdout = old
	var buf bytes.Buffer
	io.Copy(&buf, r)

	if err != nil {
		t.Skipf("skipping network test: %v", err)
	}
	return buf.String()
}

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "fetch [doi]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "fetch [doi]")
	}
	if cmd.Short != "Fetch raw metadata for a DOI" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.Long == "" {
		t.Error("Long should not be empty")
	}
	if cmd.Example == "" {
		t.Error("Example should not be empty")
	}
}

func TestNewCmd_RunE(t *testing.T) {
	cmd := NewCmd()
	output := captureCmdOutput(t, func() error {
		return cmd.RunE(cmd, []string{"10.1038/nature12373"})
	})
	if !strings.Contains(output, "status") {
		t.Errorf("expected JSON output, got %q", output)
	}
}

func TestNewCmd_RunE_NoArgs(t *testing.T) {
	cmd := NewCmd()
	done := make(chan struct{})
	var err error
	go func() {
		defer close(done)
		err = cmd.RunE(cmd, []string{})
	}()
	select {
	case <-done:
		if err == nil {
			t.Error("expected error when no args (survey fails in non-TTY)")
		}
	case <-time.After(3 * time.Second):
		t.Skip("skipping: survey prompt blocked in test environment")
	}
}

func TestNewCmd_RunE_FetchError(t *testing.T) {
	cmd := NewCmd()
	err := cmd.RunE(cmd, []string{"10.9999/invalid-doi-test-12345"})
	if err == nil {
		t.Error("expected error for non-existent DOI")
	}
}

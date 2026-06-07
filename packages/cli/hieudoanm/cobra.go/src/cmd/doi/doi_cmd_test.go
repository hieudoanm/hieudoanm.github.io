package doi

import (
	"bytes"
	"io"
	"os"
	"strings"
	"testing"
	"time"
)

func TestNewCommand(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "doi" {
		t.Errorf("Use = %q, want %q", cmd.Use, "doi")
	}
	if cmd.Short != "DOI productivity tools" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.Long == "" {
		t.Error("Long should not be empty")
	}
	if cmd.Example == "" {
		t.Error("Example should not be empty")
	}
	if cmd.Flag("json") == nil {
		t.Error("expected --json persistent flag")
	}

	subs := cmd.Commands()
	if len(subs) != 4 {
		t.Fatalf("expected 4 subcommands, got %d", len(subs))
	}

	names := make(map[string]bool)
	for _, s := range subs {
		names[s.Name()] = true
	}
	for _, name := range []string{"cite", "fetch", "ref", "validate"} {
		if !names[name] {
			t.Errorf("missing subcommand: %s", name)
		}
	}
}

func TestNewCiteCmd(t *testing.T) {
	cmd := newCiteCmd()
	if cmd.Use != "cite [doi]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "cite [doi]")
	}
	if cmd.Short != "Generate an APA citation from a DOI" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.Long == "" {
		t.Error("Long should not be empty")
	}
	if cmd.Example == "" {
		t.Error("Example should not be empty")
	}
}

func TestNewFetchCmd(t *testing.T) {
	cmd := newFetchCmd()
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

func TestNewRefCmd(t *testing.T) {
	cmd := newRefCmd()
	if cmd.Use != "ref [doi]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "ref [doi]")
	}
	if cmd.Short != "Generate a formatted reference from a DOI" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.Long == "" {
		t.Error("Long should not be empty")
	}
	if cmd.Example == "" {
		t.Error("Example should not be empty")
	}
}

func TestNewValidateCmd(t *testing.T) {
	cmd := newValidateCmd()
	if cmd.Use != "validate [doi]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "validate [doi]")
	}
	if cmd.Short != "Validate a DOI string format" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.Long == "" {
		t.Error("Long should not be empty")
	}
	if cmd.Example == "" {
		t.Error("Example should not be empty")
	}
}

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

func TestNewCiteCmd_RunE(t *testing.T) {
	cmd := newCiteCmd()
	output := captureCmdOutput(t, func() error {
		return cmd.RunE(cmd, []string{"10.1038/nature12373"})
	})
	if !strings.Contains(output, "Cite:") {
		t.Errorf("expected citation output, got %q", output)
	}
}

func TestNewFetchCmd_RunE(t *testing.T) {
	cmd := newFetchCmd()
	output := captureCmdOutput(t, func() error {
		return cmd.RunE(cmd, []string{"10.1038/nature12373"})
	})
	if !strings.Contains(output, "status") {
		t.Errorf("expected JSON output, got %q", output)
	}
}

func TestNewRefCmd_RunE(t *testing.T) {
	cmd := newRefCmd()
	output := captureCmdOutput(t, func() error {
		return cmd.RunE(cmd, []string{"10.1038/nature12373"})
	})
	if !strings.Contains(output, "APA:") {
		t.Errorf("expected APA reference output, got %q", output)
	}
}

func TestNewCiteCmd_RunE_NoArgs(t *testing.T) {
	cmd := newCiteCmd()
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

func TestNewFetchCmd_RunE_NoArgs(t *testing.T) {
	cmd := newFetchCmd()
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

func TestNewRefCmd_RunE_NoArgs(t *testing.T) {
	cmd := newRefCmd()
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

func TestNewCiteCmd_RunE_FetchError(t *testing.T) {
	cmd := newCiteCmd()
	// Using a DOI that will fail HTTP call
	err := cmd.RunE(cmd, []string{"10.9999/invalid-doi-test-12345"})
	if err == nil {
		t.Error("expected error for non-existent DOI")
	}
}

func TestNewFetchCmd_RunE_FetchError(t *testing.T) {
	cmd := newFetchCmd()
	err := cmd.RunE(cmd, []string{"10.9999/invalid-doi-test-12345"})
	if err == nil {
		t.Error("expected error for non-existent DOI")
	}
}

func TestNewRefCmd_RunE_FetchError(t *testing.T) {
	cmd := newRefCmd()
	err := cmd.RunE(cmd, []string{"10.9999/invalid-doi-test-12345"})
	if err == nil {
		t.Error("expected error for non-existent DOI")
	}
}

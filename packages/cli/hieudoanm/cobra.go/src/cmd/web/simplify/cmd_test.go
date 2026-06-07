package simplify

import (
	"os"
	"strings"
	"testing"

	"github.com/spf13/cobra"
)

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "simplify" {
		t.Errorf("Use = %q, want 'simplify'", cmd.Use)
	}
	if cmd.Short != "Extract and convert web content" {
		t.Errorf("Short = %q", cmd.Short)
	}
	expect := map[string]bool{"csv": true, "md": true, "images": true}
	got := subNameSet(cmd)
	for name := range expect {
		if !got[name] {
			t.Errorf("missing subcommand %q", name)
		}
	}
}

func TestNewSimplifyCsvCmd(t *testing.T) {
	cmd := newSimplifyCsvCmd()
	if cmd.Use != "csv --url <url>" {
		t.Errorf("Use = %q, want 'csv --url <url>'", cmd.Use)
	}
	if cmd.Short != "Extract HTML tables to CSV" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.Flag("url") == nil {
		t.Error("expected --url flag")
	}
	if cmd.Flag("out") == nil {
		t.Error("expected --out flag")
	}
}

func TestNewSimplifyMdCmd(t *testing.T) {
	cmd := newSimplifyMdCmd()
	if cmd.Use != "md --url <url>" {
		t.Errorf("Use = %q, want 'md --url <url>'", cmd.Use)
	}
	if cmd.Short != "Convert webpage to markdown" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.Flag("url") == nil {
		t.Error("expected --url flag")
	}
	if cmd.Flag("out") == nil {
		t.Error("expected --out flag")
	}
}

func TestNewSimplifyImagesCmd(t *testing.T) {
	cmd := newSimplifyImagesCmd()
	if cmd.Use != "images --url <url>" {
		t.Errorf("Use = %q, want 'images --url <url>'", cmd.Use)
	}
	if cmd.Short != "Download images from a fully rendered webpage" {
		t.Errorf("Short = %q", cmd.Short)
	}
	for _, name := range []string{"url", "out", "index", "json", "wait"} {
		if cmd.Flag(name) == nil {
			t.Errorf("missing flag: --%s", name)
		}
	}
}

func TestNewSimplifyCsvCmd_RunE_Error(t *testing.T) {
	cmd := newSimplifyCsvCmd()
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Fatal("expected error for missing url")
	}
	if !strings.Contains(err.Error(), "url is required") {
		t.Errorf("error = %q, want 'url is required'", err)
	}
}

func TestNewSimplifyMdCmd_RunE_Error(t *testing.T) {
	cmd := newSimplifyMdCmd()
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Fatal("expected error for missing url")
	}
	if !strings.Contains(err.Error(), "url is required") {
		t.Errorf("error = %q, want 'url is required'", err)
	}
}

func TestNewSimplifyImagesCmd_RunE_Error(t *testing.T) {
	cmd := newSimplifyImagesCmd()
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Fatal("expected error for missing url")
	}
	if !strings.Contains(err.Error(), "url is required") {
		t.Errorf("error = %q, want 'url is required'", err)
	}
}

func TestNewSimplifyCsvCmd_RunE_NonExistentOutDir(t *testing.T) {
	cmd := newSimplifyCsvCmd()
	cmd.SetArgs([]string{"--url", "http://example.com", "--out", "/nonexistent/test/dir"})
	err := cmd.Execute()
	if err == nil {
		t.Fatal("expected error")
	}
	if !strings.Contains(err.Error(), "does not exist") {
		t.Errorf("expected directory does not exist error, got %v", err)
	}
}

func TestNewSimplifyMdCmd_RunE_NonExistentOutDir(t *testing.T) {
	cmd := newSimplifyMdCmd()
	cmd.SetArgs([]string{"--url", "http://example.com", "--out", "/nonexistent/test/dir"})
	err := cmd.Execute()
	if err == nil {
		t.Fatal("expected error")
	}
	if !strings.Contains(err.Error(), "does not exist") {
		t.Errorf("expected directory does not exist error, got %v", err)
	}
}

func TestNewSimplifyImagesCmd_RunE_CreatesOutDir(t *testing.T) {
	dir := t.TempDir()
	outDir := dir + "/newsub"
	cmd := newSimplifyImagesCmd()
	cmd.SetArgs([]string{"--url", "http://example.com", "--out", outDir})
	err := cmd.Execute()
	// fetchPageHTML will fail (network), but dir should be created
	if err == nil {
		t.Fatal("expected error from network call, got nil")
	}
	if _, statErr := os.Stat(outDir); os.IsNotExist(statErr) {
		t.Error("expected output directory to be created")
	}
}

func subNameSet(cmd *cobra.Command) map[string]bool {
	s := make(map[string]bool)
	for _, c := range cmd.Commands() {
		s[c.Name()] = true
	}
	return s
}

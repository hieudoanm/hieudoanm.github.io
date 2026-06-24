package shopify

import (
	"strings"
	"testing"

	"github.com/spf13/cobra"
)

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "shopify" {
		t.Errorf("Use = %q, want 'shopify'", cmd.Use)
	}
	if cmd.Short != "Shopify detection and analysis tools" {
		t.Errorf("Short = %q", cmd.Short)
	}
	subs := cmd.Commands()
	if len(subs) != 1 || subs[0].Name() != "detect" {
		t.Errorf("expected subcommand 'detect', got %v", subNames(cmd))
	}
}

func TestNewDetectCmd(t *testing.T) {
	cmd := newDetectCmd()
	if cmd.Use != "detect [url]" {
		t.Errorf("Use = %q, want 'detect [url]'", cmd.Use)
	}
	if cmd.Short != "Detect if a website is using Shopify" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.Flag("verbose") == nil {
		t.Error("expected --verbose flag")
	}
	if cmd.Flag("json") == nil {
		t.Error("expected --json flag")
	}
}

func TestNewDetectCmd_RunE_EmptyURL(t *testing.T) {
	cmd := newDetectCmd()
	err := cmd.RunE(cmd, []string{""})
	if err == nil {
		t.Fatal("expected error")
	}
	if !strings.Contains(err.Error(), "URL is required") {
		t.Errorf("expected 'URL is required' error, got %v", err)
	}
}

func subNames(cmd *cobra.Command) []string {
	var names []string
	for _, c := range cmd.Commands() {
		names = append(names, c.Name())
	}
	return names
}

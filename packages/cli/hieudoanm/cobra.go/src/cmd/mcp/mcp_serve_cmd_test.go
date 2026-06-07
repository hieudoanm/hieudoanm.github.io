package mcp

import (
	"testing"

	"github.com/spf13/cobra"
)

func TestNewServeCmd(t *testing.T) {
	rootCmd := &cobra.Command{Use: "hieudoanm"}
	cmd := newServeCmd(rootCmd)
	if cmd == nil {
		t.Fatal("newServeCmd() returned nil")
	}
	if cmd.Use != "serve" {
		t.Errorf("Use = %q, want %q", cmd.Use, "serve")
	}
	if cmd.Short != "Start the MCP server over stdio" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("expected RunE on serve command")
	}
}

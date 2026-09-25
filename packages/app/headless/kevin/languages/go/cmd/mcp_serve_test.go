package cmd

import (
	"strings"
	"testing"
)

func TestMCPServeDeclaresFlags(t *testing.T) {
	serve := findSubcommand(t, "mcp")
	if serve.Commands()[0].Name() != "serve" {
		t.Fatalf("mcp should expose a 'serve' subcommand, got %q", serve.Commands()[0].Name())
	}

	serveCmd := serve.Commands()[0]
	for _, flag := range []string{"data", "addr"} {
		if serveCmd.Flags().Lookup(flag) == nil {
			t.Fatalf("mcp serve should declare a --%s flag", flag)
		}
	}
}

func TestMCPServeAddrAndDataMutuallyExclusive(t *testing.T) {
	root := NewRootCommand()
	root.SetArgs([]string{"mcp", "serve", "--addr", "localhost:6379", "--data", "/tmp/kevin.json"})
	err := root.Execute()
	if err == nil || !strings.Contains(err.Error(), "mutually exclusive") {
		t.Fatalf("expected mutual-exclusion error, got %v", err)
	}
}

func TestMCPParentHasNoRun(t *testing.T) {
	mcpCmd := findSubcommand(t, "mcp")
	if mcpCmd.Run != nil || mcpCmd.RunE != nil {
		t.Fatal("mcp should be a parent command with no Run of its own")
	}
}

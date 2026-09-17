package cmd

import (
	"strings"
	"testing"

	"github.com/spf13/cobra"
)

// findMCP returns the registered mcp command.
func findMCP(t *testing.T) *cobra.Command {
	t.Helper()

	for _, sub := range rootCmd.Commands() {
		if sub.Name() == "mcp" {
			return sub
		}
	}
	t.Fatal("the root command should register an mcp subcommand")
	return nil
}

func TestMCPIsAParentCommandWithAServeSubcommand(t *testing.T) {
	mcpCmd := findMCP(t)
	if mcpCmd.Run != nil || mcpCmd.RunE != nil {
		t.Fatal("mcp should be a parent command with no Run of its own")
	}

	subcommands := mcpCmd.Commands()
	if len(subcommands) != 1 || subcommands[0].Name() != "serve" {
		t.Fatalf("mcp should expose exactly one 'serve' subcommand, got %d", len(subcommands))
	}
	if subcommands[0].Flags().Lookup("root") == nil {
		t.Fatal("mcp serve should declare a --root flag confining file access")
	}
}

func TestMCPServeRejectsAnUnusableRoot(t *testing.T) {
	tests := []struct {
		name    string
		args    []string
		wantErr string
	}{
		{
			name:    "a missing directory",
			args:    []string{"mcp", "serve", "--root", "/definitely/not/here"},
			wantErr: "root",
		},
		{
			name:    "an unexpected positional argument",
			args:    []string{"mcp", "serve", "extra"},
			wantErr: "unknown command",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			rootCmd.SetArgs(tt.args)
			t.Cleanup(func() { rootCmd.SetArgs(nil) })

			err := rootCmd.Execute()
			if err == nil || !strings.Contains(err.Error(), tt.wantErr) {
				t.Fatalf("expected an error containing %q, got %v", tt.wantErr, err)
			}
		})
	}
}

func TestRootUsageMentionsTheMCPServer(t *testing.T) {
	if !strings.Contains(rootCmd.Long, "mcp") {
		t.Fatal("the root usage should document the mcp command")
	}
}

package cmd

import (
	"strings"
	"testing"

	"github.com/spf13/cobra"
)

func TestServeGUITUIMutuallyExclusive(t *testing.T) {
	root := NewRootCommand()
	root.SetArgs([]string{"serve", "--gui", "--tui"})
	err := root.Execute()
	if err == nil || !strings.Contains(err.Error(), "mutually exclusive") {
		t.Fatalf("expected mutual-exclusion error, got %v", err)
	}
}

func TestServeAcceptsTUI(t *testing.T) {
	serve := findSubcommand(t, "serve")
	if serve.Flags().Lookup("tui") == nil {
		t.Fatal("serve should declare a --tui flag")
	}
}

// findSubcommand returns the root's direct subcommand with the given name.
func findSubcommand(t *testing.T, name string) *cobra.Command {
	t.Helper()
	root := NewRootCommand()
	for _, c := range root.Commands() {
		if c.Name() == name {
			return c
		}
	}
	t.Fatalf("root should expose a %q subcommand", name)
	return nil
}

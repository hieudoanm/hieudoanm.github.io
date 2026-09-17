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
	serve := findServeCommand()
	if serve.Flags().Lookup("tui") == nil {
		t.Fatal("serve should declare a --tui flag")
	}
}

func findServeCommand() *cobra.Command {
	root := NewRootCommand()
	return root.Commands()[0]
}

package cmd

import (
	"testing"
)

func TestRootCommand(t *testing.T) {
	root := NewRootCommand()

	var names []string
	for _, c := range root.Commands() {
		names = append(names, c.Name())
	}

	if len(names) != 1 || names[0] != "serve" {
		t.Fatalf("root command should expose exactly one subcommand 'serve', got %v", names)
	}
}

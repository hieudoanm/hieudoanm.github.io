package cmd

import (
	"sort"
	"testing"
)

func TestRootCommand(t *testing.T) {
	root := NewRootCommand()

	var names []string
	for _, c := range root.Commands() {
		names = append(names, c.Name())
	}
	sort.Strings(names)

	want := []string{"mcp", "serve"}
	if len(names) != len(want) {
		t.Fatalf("root should expose subcommands %v, got %v", want, names)
	}
	for i, name := range want {
		if names[i] != name {
			t.Fatalf("root should expose subcommands %v, got %v", want, names)
		}
	}
}

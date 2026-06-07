package convert

import (
	"testing"
)

func TestNewKebabcaseCmd_Structure(t *testing.T) {
	cmd := newKebabcaseCmd()
	if cmd.Use != "kebabcase [text]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "kebabcase [text]")
	}
	if cmd.Short != "Convert a string to kebab-case" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Convert a string to kebab-case")
	}
}

func TestNewKebabcaseCmd_RunE(t *testing.T) {
	cmd := newKebabcaseCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"helloWorld"}); err != nil {
			t.Fatal(err)
		}
	})
	if output != "hello-world" {
		t.Errorf("RunE = %q, want %q", output, "hello-world")
	}
}

package convert

import (
	"testing"
)

func TestNewSlugCmd_Structure(t *testing.T) {
	cmd := newSlugCmd()
	if cmd.Use != "slug [text]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "slug [text]")
	}
	if cmd.Short != "Generate a URL-friendly slug" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Generate a URL-friendly slug")
	}
}

func TestNewSlugCmd_RunE(t *testing.T) {
	cmd := newSlugCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"Hello World!"}); err != nil {
			t.Fatal(err)
		}
	})
	if output != "hello-world" {
		t.Errorf("RunE = %q, want %q", output, "hello-world")
	}
}

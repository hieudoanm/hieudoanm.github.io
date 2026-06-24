package slug_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/slug"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := slug.NewCommand()
	if cmd.Use != "slug <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "slug <text>")
	}
}

func TestNewCommand_RunE(t *testing.T) {
	cmd := slug.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"Hello World!"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello-world" {
		t.Errorf("RunE = %q, want %q", got, "hello-world")
	}
}

package data

import (
	"testing"
)

func TestNewYmlCmd(t *testing.T) {
	cmd := newYmlCmd()
	if cmd == nil {
		t.Fatal("newYmlCmd() returned nil")
	}
	if cmd.Use != "yml <file>" {
		t.Errorf("Use = %q", cmd.Use)
	}
	for _, name := range []string{"validate", "lint", "json"} {
		if cmd.Flag(name) == nil {
			t.Errorf("missing flag: --%s", name)
		}
	}
}

func TestNewYmlCmdArgs(t *testing.T) {
	cmd := newYmlCmd()
	if err := cmd.Args(cmd, []string{}); err != nil {
		t.Errorf("expected no error for 0 args, got: %v", err)
	}
	if err := cmd.Args(cmd, []string{"file.yml"}); err != nil {
		t.Errorf("expected no error for 1 arg, got: %v", err)
	}
}

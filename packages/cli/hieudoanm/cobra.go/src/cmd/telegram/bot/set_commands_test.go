package bot

import "testing"

func TestNewSetCommandsCmd_UseShort(t *testing.T) {
	cmd := newSetCommandsCmd()
	if cmd.Use != "set-commands" {
		t.Errorf("Use = %q, want 'set-commands'", cmd.Use)
	}
	if cmd.Short != "Set bot commands" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

package chat

import "testing"

func TestNewActionCmd_UseShort(t *testing.T) {
	cmd := newActionCmd()
	if cmd.Use != "action" {
		t.Errorf("Use = %q, want 'action'", cmd.Use)
	}
	if cmd.Short != "Send a chat action" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

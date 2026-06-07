package chat

import "testing"

func TestNewUnbanCmd_UseShort(t *testing.T) {
	cmd := newUnbanCmd()
	if cmd.Use != "unban" {
		t.Errorf("Use = %q, want 'unban'", cmd.Use)
	}
	if cmd.Short != "Unban a user from a chat" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

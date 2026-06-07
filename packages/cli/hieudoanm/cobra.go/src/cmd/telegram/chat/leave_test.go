package chat

import "testing"

func TestNewLeaveCmd_UseShort(t *testing.T) {
	cmd := newLeaveCmd()
	if cmd.Use != "leave" {
		t.Errorf("Use = %q, want 'leave'", cmd.Use)
	}
	if cmd.Short != "Leave a chat" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

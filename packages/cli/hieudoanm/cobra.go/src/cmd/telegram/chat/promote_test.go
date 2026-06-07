package chat

import "testing"

func TestNewPromoteCmd_UseShort(t *testing.T) {
	cmd := newPromoteCmd()
	if cmd.Use != "promote" {
		t.Errorf("Use = %q, want 'promote'", cmd.Use)
	}
	if cmd.Short != "Promote a user in a chat" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

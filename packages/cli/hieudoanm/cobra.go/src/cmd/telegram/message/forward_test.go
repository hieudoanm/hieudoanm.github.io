package message

import "testing"

func TestNewForwardCmd_UseShort(t *testing.T) {
	cmd := newForwardCmd()
	if cmd.Use != "forward" {
		t.Errorf("Use = %q, want 'forward'", cmd.Use)
	}
	if cmd.Short != "Forward a message" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

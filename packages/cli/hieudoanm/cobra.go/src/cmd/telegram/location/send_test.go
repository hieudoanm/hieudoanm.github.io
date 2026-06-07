package location

import "testing"

func TestNewSendCmd_UseShort(t *testing.T) {
	cmd := newSendCmd()
	if cmd.Use != "send" {
		t.Errorf("Use = %q, want 'send'", cmd.Use)
	}
	if cmd.Short != "Send a location" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

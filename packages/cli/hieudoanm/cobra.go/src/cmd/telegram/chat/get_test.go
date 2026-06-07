package chat

import "testing"

func TestNewGetCmd_UseShort(t *testing.T) {
	cmd := newGetCmd()
	if cmd.Use != "get" {
		t.Errorf("Use = %q, want 'get'", cmd.Use)
	}
	if cmd.Short != "Get chat info" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

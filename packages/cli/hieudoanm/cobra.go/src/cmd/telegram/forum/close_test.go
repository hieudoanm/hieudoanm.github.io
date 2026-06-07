package forum

import "testing"

func TestNewCloseCmd_UseShort(t *testing.T) {
	cmd := newCloseCmd()
	if cmd.Use != "close" {
		t.Errorf("Use = %q, want 'close'", cmd.Use)
	}
	if cmd.Short != "Close a forum topic" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

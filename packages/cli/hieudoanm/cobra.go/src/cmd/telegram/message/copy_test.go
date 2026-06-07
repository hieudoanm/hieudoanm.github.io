package message

import "testing"

func TestNewCopyCmd_UseShort(t *testing.T) {
	cmd := newCopyCmd()
	if cmd.Use != "copy" {
		t.Errorf("Use = %q, want 'copy'", cmd.Use)
	}
	if cmd.Short != "Copy a message" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

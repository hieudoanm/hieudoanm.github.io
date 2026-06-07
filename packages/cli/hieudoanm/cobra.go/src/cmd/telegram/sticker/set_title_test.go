package sticker

import "testing"

func TestNewSetTitleCmd_UseShort(t *testing.T) {
	cmd := newSetTitleCmd()
	if cmd.Use != "set-title" {
		t.Errorf("Use = %q, want 'set-title'", cmd.Use)
	}
	if cmd.Short != "Set sticker set title" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

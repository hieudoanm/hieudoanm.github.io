package sticker

import "testing"

func TestNewSetPositionCmd_UseShort(t *testing.T) {
	cmd := newSetPositionCmd()
	if cmd.Use != "set-position" {
		t.Errorf("Use = %q, want 'set-position'", cmd.Use)
	}
	if cmd.Short != "Set sticker position in set" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

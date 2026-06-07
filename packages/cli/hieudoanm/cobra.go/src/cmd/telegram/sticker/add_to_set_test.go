package sticker

import "testing"

func TestNewAddToSetCmd_UseShort(t *testing.T) {
	cmd := newAddToSetCmd()
	if cmd.Use != "add-to-set" {
		t.Errorf("Use = %q, want 'add-to-set'", cmd.Use)
	}
	if cmd.Short != "Add a sticker to a set" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

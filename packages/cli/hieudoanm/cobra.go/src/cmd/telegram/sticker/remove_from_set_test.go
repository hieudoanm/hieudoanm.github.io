package sticker

import "testing"

func TestNewRemoveFromSetCmd_UseShort(t *testing.T) {
	cmd := newRemoveFromSetCmd()
	if cmd.Use != "remove-from-set" {
		t.Errorf("Use = %q, want 'remove-from-set'", cmd.Use)
	}
	if cmd.Short != "Remove a sticker from a set" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

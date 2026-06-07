package sticker

import "testing"

func TestNewReplaceInSetCmd_UseShort(t *testing.T) {
	cmd := newReplaceInSetCmd()
	if cmd.Use != "replace-in-set" {
		t.Errorf("Use = %q, want 'replace-in-set'", cmd.Use)
	}
	if cmd.Short != "Replace a sticker in a set" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

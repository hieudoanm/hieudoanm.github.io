package sticker

import "testing"

func TestNewSetKeywordsCmd_UseShort(t *testing.T) {
	cmd := newSetKeywordsCmd()
	if cmd.Use != "set-keywords" {
		t.Errorf("Use = %q, want 'set-keywords'", cmd.Use)
	}
	if cmd.Short != "Set sticker keywords" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

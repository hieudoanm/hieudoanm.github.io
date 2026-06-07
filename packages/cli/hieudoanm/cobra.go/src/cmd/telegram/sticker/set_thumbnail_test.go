package sticker

import "testing"

func TestNewSetThumbnailCmd_UseShort(t *testing.T) {
	cmd := newSetThumbnailCmd()
	if cmd.Use != "set-thumbnail" {
		t.Errorf("Use = %q, want 'set-thumbnail'", cmd.Use)
	}
	if cmd.Short != "Set sticker set thumbnail" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

package message

import "testing"

func TestNewPhotoCmd_UseShort(t *testing.T) {
	cmd := newPhotoCmd()
	if cmd.Use != "photo" {
		t.Errorf("Use = %q, want 'photo'", cmd.Use)
	}
	if cmd.Short != "Send a photo" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

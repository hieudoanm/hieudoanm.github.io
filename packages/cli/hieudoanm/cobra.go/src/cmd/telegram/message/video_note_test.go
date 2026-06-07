package message

import "testing"

func TestNewVideoNoteCmd_UseShort(t *testing.T) {
	cmd := newVideoNoteCmd()
	if cmd.Use != "video-note" {
		t.Errorf("Use = %q, want 'video-note'", cmd.Use)
	}
	if cmd.Short != "Send a video note" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

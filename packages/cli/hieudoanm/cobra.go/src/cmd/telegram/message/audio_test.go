package message

import "testing"

func TestNewAudioCmd_UseShort(t *testing.T) {
	cmd := newAudioCmd()
	if cmd.Use != "audio" {
		t.Errorf("Use = %q, want 'audio'", cmd.Use)
	}
	if cmd.Short != "Send an audio file" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

package message

import "testing"

func TestNewVideoCmd_UseShort(t *testing.T) {
	cmd := newVideoCmd()
	if cmd.Use != "video" {
		t.Errorf("Use = %q, want 'video'", cmd.Use)
	}
	if cmd.Short != "Send a video" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

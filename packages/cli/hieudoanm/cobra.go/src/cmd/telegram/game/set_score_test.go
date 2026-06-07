package game

import "testing"

func TestNewSetScoreCmd_UseShort(t *testing.T) {
	cmd := newSetScoreCmd()
	if cmd.Use != "set-score" {
		t.Errorf("Use = %q, want 'set-score'", cmd.Use)
	}
	if cmd.Short != "Set a game score" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

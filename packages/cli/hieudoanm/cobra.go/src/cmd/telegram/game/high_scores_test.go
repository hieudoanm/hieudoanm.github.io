package game

import "testing"

func TestNewHighScoresCmd_UseShort(t *testing.T) {
	cmd := newHighScoresCmd()
	if cmd.Use != "high-scores" {
		t.Errorf("Use = %q, want 'high-scores'", cmd.Use)
	}
	if cmd.Short != "Get game high scores" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

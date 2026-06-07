package callback

import "testing"

func TestNewAnswerCmd_UseShort(t *testing.T) {
	cmd := newAnswerCmd()
	if cmd.Use != "answer" {
		t.Errorf("Use = %q, want 'answer'", cmd.Use)
	}
	if cmd.Short != "Answer a callback query" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

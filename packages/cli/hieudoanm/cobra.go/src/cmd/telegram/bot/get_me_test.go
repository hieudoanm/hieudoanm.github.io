package bot

import "testing"

func TestNewGetMeCmd_UseShort(t *testing.T) {
	cmd := newGetMeCmd()
	if cmd.Use != "get-me" {
		t.Errorf("Use = %q, want 'get-me'", cmd.Use)
	}
	if cmd.Short != "Get bot info" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

package invoice

import "testing"

func TestNewCreateCmd_UseShort(t *testing.T) {
	cmd := newCreateCmd()
	if cmd.Use != "create" {
		t.Errorf("Use = %q, want 'create'", cmd.Use)
	}
	if cmd.Short != "Create an invoice link" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

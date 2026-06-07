package invoice

import "testing"

func TestNewPreCheckoutCmd_UseShort(t *testing.T) {
	cmd := newPreCheckoutCmd()
	if cmd.Use != "pre-checkout" {
		t.Errorf("Use = %q, want 'pre-checkout'", cmd.Use)
	}
	if cmd.Short != "Answer a pre-checkout query" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

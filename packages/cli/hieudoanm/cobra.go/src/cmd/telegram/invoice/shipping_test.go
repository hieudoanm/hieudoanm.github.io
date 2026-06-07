package invoice

import "testing"

func TestNewShippingCmd_UseShort(t *testing.T) {
	cmd := newShippingCmd()
	if cmd.Use != "shipping" {
		t.Errorf("Use = %q, want 'shipping'", cmd.Use)
	}
	if cmd.Short != "Answer a shipping query" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}

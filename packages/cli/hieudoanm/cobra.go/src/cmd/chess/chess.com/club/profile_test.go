package club

import (
	"testing"
)

func TestNewProfileCmd_UseShort(t *testing.T) {
	cmd := newProfileCmd()
	if cmd.Use != "profile" {
		t.Errorf("expected Use 'profile', got %q", cmd.Use)
	}
}

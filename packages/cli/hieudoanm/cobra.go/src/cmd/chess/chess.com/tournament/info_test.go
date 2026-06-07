package tournament

import (
	"testing"
)

func TestNewInfoCmd_UseShort(t *testing.T) {
	cmd := newInfoCmd()
	if cmd.Use != "info" {
		t.Errorf("expected Use 'info', got %q", cmd.Use)
	}
}

package tournament

import (
	"testing"
)

func TestNewRoundCmd_UseShort(t *testing.T) {
	cmd := newRoundCmd()
	if cmd.Use != "round" {
		t.Errorf("expected Use 'round', got %q", cmd.Use)
	}
}

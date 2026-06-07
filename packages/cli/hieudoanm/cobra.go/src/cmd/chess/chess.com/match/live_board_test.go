package match

import (
	"testing"
)

func TestNewLiveBoardCmd_UseShort(t *testing.T) {
	cmd := newLiveBoardCmd()
	if cmd.Use != "live-board" {
		t.Errorf("expected Use 'live-board', got %q", cmd.Use)
	}
}

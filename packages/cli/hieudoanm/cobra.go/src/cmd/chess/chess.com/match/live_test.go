package match

import (
	"testing"
)

func TestNewLiveCmd_UseShort(t *testing.T) {
	cmd := newLiveCmd()
	if cmd.Use != "live" {
		t.Errorf("expected Use 'live', got %q", cmd.Use)
	}
}

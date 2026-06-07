package club

import (
	"testing"
)

func TestNewMatchesCmd_UseShort(t *testing.T) {
	cmd := newMatchesCmd()
	if cmd.Use != "matches" {
		t.Errorf("expected Use 'matches', got %q", cmd.Use)
	}
}

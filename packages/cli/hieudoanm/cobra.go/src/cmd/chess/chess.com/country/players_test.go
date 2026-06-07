package country

import (
	"testing"
)

func TestNewPlayersCmd_UseShort(t *testing.T) {
	cmd := newPlayersCmd()
	if cmd.Use != "players" {
		t.Errorf("expected Use 'players', got %q", cmd.Use)
	}
}

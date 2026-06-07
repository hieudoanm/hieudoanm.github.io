package match

import (
	"testing"
)

func TestNewDailyBoardCmd_UseShort(t *testing.T) {
	cmd := newDailyBoardCmd()
	if cmd.Use != "daily-board" {
		t.Errorf("expected Use 'daily-board', got %q", cmd.Use)
	}
}

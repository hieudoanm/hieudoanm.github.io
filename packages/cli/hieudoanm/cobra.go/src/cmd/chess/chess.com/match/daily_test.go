package match

import (
	"testing"
)

func TestNewDailyCmd_UseShort(t *testing.T) {
	cmd := newDailyCmd()
	if cmd.Use != "daily" {
		t.Errorf("expected Use 'daily', got %q", cmd.Use)
	}
}

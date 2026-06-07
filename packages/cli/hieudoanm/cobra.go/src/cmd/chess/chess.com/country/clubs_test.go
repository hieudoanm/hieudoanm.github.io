package country

import (
	"testing"
)

func TestNewClubsCmd_UseShort(t *testing.T) {
	cmd := newClubsCmd()
	if cmd.Use != "clubs" {
		t.Errorf("expected Use 'clubs', got %q", cmd.Use)
	}
}

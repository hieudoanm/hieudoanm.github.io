package tournament

import (
	"testing"
)

func TestNewGroupCmd_UseShort(t *testing.T) {
	cmd := newGroupCmd()
	if cmd.Use != "group" {
		t.Errorf("expected Use 'group', got %q", cmd.Use)
	}
}

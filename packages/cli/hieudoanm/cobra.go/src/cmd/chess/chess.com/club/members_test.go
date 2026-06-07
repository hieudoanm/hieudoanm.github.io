package club

import (
	"testing"
)

func TestNewMembersCmd_UseShort(t *testing.T) {
	cmd := newMembersCmd()
	if cmd.Use != "members" {
		t.Errorf("expected Use 'members', got %q", cmd.Use)
	}
}

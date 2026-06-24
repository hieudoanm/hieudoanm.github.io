package clear

import (
	"testing"
)

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "clear" {
		t.Errorf("Use = %q, want %q", cmd.Use, "clear")
	}
}

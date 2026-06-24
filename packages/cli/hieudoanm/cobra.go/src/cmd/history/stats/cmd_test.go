package stats

import (
	"testing"
)

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "stats" {
		t.Errorf("Use = %q, want %q", cmd.Use, "stats")
	}
}

package puzzle

import (
	"testing"
)

func TestNewRandomCmd_UseShort(t *testing.T) {
	cmd := newRandomCmd()
	if cmd.Use != "random" {
		t.Errorf("expected Use 'random', got %q", cmd.Use)
	}
}

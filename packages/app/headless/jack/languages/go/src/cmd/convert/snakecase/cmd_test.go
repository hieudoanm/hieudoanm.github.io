package snakecase_test

import (
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/snakecase"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := snakecase.NewCommand()
	if cmd.Use != "snakecase <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "snakecase <text>")
	}
}

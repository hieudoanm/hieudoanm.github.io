package pascalcase_test

import (
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/pascalcase"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := pascalcase.NewCommand()
	if cmd.Use != "pascalcase <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "pascalcase <text>")
	}
}

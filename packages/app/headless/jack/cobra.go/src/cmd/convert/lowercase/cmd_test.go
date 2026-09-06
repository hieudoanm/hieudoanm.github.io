package lowercase_test

import (
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/lowercase"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := lowercase.NewCommand()
	if cmd.Use != "lowercase <text>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "lowercase <text>")
	}
}

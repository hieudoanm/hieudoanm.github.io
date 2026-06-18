package file

import (
	"testing"
)

func TestReadCmdHasFlags(t *testing.T) {
	cmd := newReadCmd()
	if cmd.Use != "read [--file <path>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Args != nil {
		t.Error("Args should not be set")
	}
	_, err := cmd.Flags().GetString("file")
	if err != nil {
		t.Error("expected --file flag")
	}
	_, err = cmd.Flags().GetInt("lines")
	if err != nil {
		t.Error("expected --lines flag")
	}
	_, err = cmd.Flags().GetInt("offset")
	if err != nil {
		t.Error("expected --offset flag")
	}
	_, err = cmd.Flags().GetBool("numbers")
	if err != nil {
		t.Error("expected --numbers flag")
	}
}

package file

import (
	"testing"
)

func TestGrepCmdHasFlags(t *testing.T) {
	cmd := newGrepCmd()
	if cmd.Use != "grep <pattern> [files...]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	_, err := cmd.Flags().GetString("include")
	if err != nil {
		t.Error("expected --include flag")
	}
	_, err = cmd.Flags().GetInt("context")
	if err != nil {
		t.Error("expected --context flag")
	}
	_, err = cmd.Flags().GetBool("fixed")
	if err != nil {
		t.Error("expected --fixed flag")
	}
	_, err = cmd.Flags().GetInt("max-count")
	if err != nil {
		t.Error("expected --max-count flag")
	}
	_, err = cmd.Flags().GetBool("ignore-case")
	if err != nil {
		t.Error("expected --ignore-case flag")
	}
}

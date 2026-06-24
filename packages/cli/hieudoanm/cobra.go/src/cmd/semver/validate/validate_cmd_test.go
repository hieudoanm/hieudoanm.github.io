package validate

import (
	"testing"
)

func TestNewCmdHasFlags(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "validate [--versions <v1,v2,...>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	_, err := cmd.Flags().GetStringSlice("versions")
	if err != nil {
		t.Error("expected --versions flag")
	}
}

func TestNewCmdValid(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--versions", "1.2.3"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestNewCmdMultipleValid(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--versions", "1.2.3,2.0.0,v3.0.0"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestNewCmdInvalid(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--versions", "abc"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestNewCmdNoVersions(t *testing.T) {
	cmd := NewCmd()
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error when no versions provided")
	}
}

func TestNewCmdJSON(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--versions", "1.0.0,abc", "--json"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

package sort

import (
	"testing"
)

func TestNewCmdHasFlags(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "sort [--versions <v1,v2,...>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	_, err := cmd.Flags().GetStringSlice("versions")
	if err != nil {
		t.Error("expected --versions flag")
	}
}

func TestNewCmdAscending(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--versions", "2.0.0,1.0.0,3.0.0"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestNewCmdWithPrefix(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--versions", "v3.0.0,v1.0.0,v2.0.0"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestNewCmdPrerelease(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--versions", "1.0.0-beta,1.0.0-alpha,1.0.0"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestNewCmdSingle(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--versions", "1.2.3"})
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

func TestNewCmdInvalidVersion(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--versions", "1.0.0,abc"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error for invalid version")
	}
}

func TestNewCmdJSON(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--versions", "3.0.0,1.0.0,2.0.0", "--json"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

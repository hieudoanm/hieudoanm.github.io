package semver

import (
	"testing"
)

func TestValidateCmdHasFlags(t *testing.T) {
	cmd := newValidateCmd()
	if cmd.Use != "validate [--versions <v1,v2,...>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	_, err := cmd.Flags().GetStringSlice("versions")
	if err != nil {
		t.Error("expected --versions flag")
	}
}

func TestValidateCmdValid(t *testing.T) {
	cmd := newValidateCmd()
	cmd.SetArgs([]string{"--versions", "1.2.3"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestValidateCmdMultipleValid(t *testing.T) {
	cmd := newValidateCmd()
	cmd.SetArgs([]string{"--versions", "1.2.3,2.0.0,v3.0.0"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestValidateCmdInvalid(t *testing.T) {
	cmd := newValidateCmd()
	cmd.SetArgs([]string{"--versions", "abc"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestValidateCmdNoVersions(t *testing.T) {
	cmd := newValidateCmd()
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error when no versions provided")
	}
}

func TestValidateCmdJSON(t *testing.T) {
	cmd := newValidateCmd()
	cmd.SetArgs([]string{"--versions", "1.0.0,abc", "--json"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

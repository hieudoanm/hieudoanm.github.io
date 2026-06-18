package semver

import (
	"testing"
)

func TestSortCmdHasFlags(t *testing.T) {
	cmd := newSortCmd()
	if cmd.Use != "sort [--versions <v1,v2,...>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	_, err := cmd.Flags().GetStringSlice("versions")
	if err != nil {
		t.Error("expected --versions flag")
	}
}

func TestSortCmdAscending(t *testing.T) {
	cmd := newSortCmd()
	cmd.SetArgs([]string{"--versions", "2.0.0,1.0.0,3.0.0"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestSortCmdWithPrefix(t *testing.T) {
	cmd := newSortCmd()
	cmd.SetArgs([]string{"--versions", "v3.0.0,v1.0.0,v2.0.0"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestSortCmdPrerelease(t *testing.T) {
	cmd := newSortCmd()
	cmd.SetArgs([]string{"--versions", "1.0.0-beta,1.0.0-alpha,1.0.0"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestSortCmdSingle(t *testing.T) {
	cmd := newSortCmd()
	cmd.SetArgs([]string{"--versions", "1.2.3"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestSortCmdNoVersions(t *testing.T) {
	cmd := newSortCmd()
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error when no versions provided")
	}
}

func TestSortCmdInvalidVersion(t *testing.T) {
	cmd := newSortCmd()
	cmd.SetArgs([]string{"--versions", "1.0.0,abc"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error for invalid version")
	}
}

func TestSortCmdJSON(t *testing.T) {
	cmd := newSortCmd()
	cmd.SetArgs([]string{"--versions", "3.0.0,1.0.0,2.0.0", "--json"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

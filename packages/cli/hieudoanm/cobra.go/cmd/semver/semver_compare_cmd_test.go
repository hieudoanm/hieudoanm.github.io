package semver

import (
	"testing"
)

func TestCompareCmdHasFlags(t *testing.T) {
	cmd := newCompareCmd()
	if cmd.Use != "compare --a <version> --b <version>" {
		t.Errorf("Use = %q", cmd.Use)
	}
	_, err := cmd.Flags().GetString("a")
	if err != nil {
		t.Error("expected --a flag")
	}
	_, err = cmd.Flags().GetString("b")
	if err != nil {
		t.Error("expected --b flag")
	}
}

func TestCompareCmdLess(t *testing.T) {
	cmd := newCompareCmd()
	cmd.SetArgs([]string{"--a", "1.0.0", "--b", "2.0.0"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestCompareCmdGreater(t *testing.T) {
	cmd := newCompareCmd()
	cmd.SetArgs([]string{"--a", "2.0.0", "--b", "1.0.0"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestCompareCmdEqual(t *testing.T) {
	cmd := newCompareCmd()
	cmd.SetArgs([]string{"--a", "1.2.3", "--b", "1.2.3"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestCompareCmdPrerelease(t *testing.T) {
	cmd := newCompareCmd()
	cmd.SetArgs([]string{"--a", "1.0.0-alpha", "--b", "1.0.0"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestCompareCmdMissingA(t *testing.T) {
	cmd := newCompareCmd()
	cmd.SetArgs([]string{"--b", "1.0.0"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error when --a is missing")
	}
}

func TestCompareCmdMissingB(t *testing.T) {
	cmd := newCompareCmd()
	cmd.SetArgs([]string{"--a", "1.0.0"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error when --b is missing")
	}
}

func TestCompareCmdInvalidVersion(t *testing.T) {
	cmd := newCompareCmd()
	cmd.SetArgs([]string{"--a", "abc", "--b", "1.0.0"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error for invalid version")
	}
}

func TestCompareCmdJSON(t *testing.T) {
	cmd := newCompareCmd()
	cmd.SetArgs([]string{"--a", "1.0.0", "--b", "2.0.0", "--json"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

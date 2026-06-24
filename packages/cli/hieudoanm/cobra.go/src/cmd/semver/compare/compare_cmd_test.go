package compare

import (
	"testing"
)

func TestNewCmdHasFlags(t *testing.T) {
	cmd := NewCmd()
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

func TestNewCmdLess(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--a", "1.0.0", "--b", "2.0.0"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestNewCmdGreater(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--a", "2.0.0", "--b", "1.0.0"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestNewCmdEqual(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--a", "1.2.3", "--b", "1.2.3"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestNewCmdPrerelease(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--a", "1.0.0-alpha", "--b", "1.0.0"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

func TestNewCmdMissingA(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--b", "1.0.0"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error when --a is missing")
	}
}

func TestNewCmdMissingB(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--a", "1.0.0"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error when --b is missing")
	}
}

func TestNewCmdInvalidVersion(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--a", "abc", "--b", "1.0.0"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error for invalid version")
	}
}

func TestNewCmdJSON(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--a", "1.0.0", "--b", "2.0.0", "--json"})
	err := cmd.Execute()
	if err != nil {
		t.Fatal(err)
	}
}

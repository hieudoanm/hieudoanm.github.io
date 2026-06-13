package data

import (
	"testing"
)

func TestNewCsvCmd(t *testing.T) {
	cmd := newCsvCmd()
	if cmd == nil {
		t.Fatal("newCsvCmd() returned nil")
	}
	if cmd.Use != "csv <file>" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.HasFlags() {
		flag := cmd.Flag("json")
		if flag == nil {
			t.Error("expected --json flag")
		}
	}
}

func TestNewCsvCmdArgs(t *testing.T) {
	cmd := newCsvCmd()
	if cmd.Args == nil {
		t.Fatal("expected Args validator")
	}
	// cobra.MaximumNArgs(1) should accept 0 or 1 args
	if err := cmd.Args(cmd, []string{}); err != nil {
		t.Errorf("expected no error for 0 args, got: %v", err)
	}
	if err := cmd.Args(cmd, []string{"file.csv"}); err != nil {
		t.Errorf("expected no error for 1 arg, got: %v", err)
	}
}

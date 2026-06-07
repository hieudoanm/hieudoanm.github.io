package cron

import (
	"strings"
	"testing"
)

func TestNewCmd_Structure(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "cron [--expression <expression>]" {
		t.Errorf("expected Use 'cron [--expression <expression>]', got %q", cmd.Use)
	}
	if cmd.Flag("expression") == nil {
		t.Error("expected --expression flag")
	}
	if cmd.Flag("next") == nil {
		t.Error("expected --next flag")
	}
	if cmd.Flag("until") == nil {
		t.Error("expected --until flag")
	}
	if cmd.Flag("json") == nil {
		t.Error("expected --json flag")
	}
}

func TestNewCmd_RunE_Describe(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("expression", "0 9 * * 1-5")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "09:00") {
		t.Errorf("expected 09:00, got: %s", output)
	}
}

func TestNewCmd_RunE_Next(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("expression", "*/15 * * * *")
	cmd.Flags().Set("next", "3")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Next 3 runs") {
		t.Errorf("expected 'Next 3 runs', got: %s", output)
	}
}

func TestNewCmd_RunE_JSON(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("expression", "0 0 * * *")
	cmd.Flags().Set("next", "2")
	cmd.Flags().Set("json", "true")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "expression") {
		t.Errorf("expected JSON expression field, got: %s", output)
	}
}

package image

import (
	"testing"
)

func TestInfoCmdUse(t *testing.T) {
	cmd := newInfoCmd()
	if cmd.Use != "info [--file <file>]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "info [--file <file>]")
	}
	if cmd.Flag("file") == nil {
		t.Error("expected --file flag")
	}
	if cmd.Short != "Show image metadata (dimensions, format, etc.)" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Show image metadata (dimensions, format, etc.)")
	}
}

func TestInfoCmdLong(t *testing.T) {
	cmd := newInfoCmd()
	if cmd.Long == "" {
		t.Error("expected non-empty Long")
	}
	if cmd.Example == "" {
		t.Error("expected non-empty Example")
	}
	if cmd.RunE == nil {
		t.Error("expected non-nil RunE")
	}
}

func TestInfoCmdRunEMissingFile(t *testing.T) {
	cmd := newInfoCmd()
	cmd.Flags().Set("file", "/tmp/nonexistent-image.xyz")
	if err := cmd.RunE(cmd, []string{}); err == nil {
		t.Error("expected error for missing file")
	}
}

func TestInfoCmdRunESuccess(t *testing.T) {
	path := createTestPNG(t)
	cmd := newInfoCmd()
	cmd.Flags().Set("file", path)
	if err := cmd.RunE(cmd, []string{}); err != nil {
		t.Errorf("unexpected error: %v", err)
	}
}

func TestInfoCmdRunEJSON(t *testing.T) {
	path := createTestPNG(t)
	cmd := newInfoCmd()
	cmd.Flags().Set("file", path)
	cmd.Flags().Set("json", "true")
	if err := cmd.RunE(cmd, []string{}); err != nil {
		t.Errorf("unexpected error: %v", err)
	}
}

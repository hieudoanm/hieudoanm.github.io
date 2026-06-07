package image

import (
	"testing"
)

func TestDominantCmdUse(t *testing.T) {
	cmd := newDominantCmd()
	if cmd.Use != "dominant [--file <file>]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "dominant [--file <file>]")
	}
	if cmd.Flag("file") == nil {
		t.Error("expected --file flag")
	}
	if cmd.Short != "Extract dominant color from an image" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Extract dominant color from an image")
	}
}

func TestDominantCmdLong(t *testing.T) {
	cmd := newDominantCmd()
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

func TestDominantCmdRunEMissingFile(t *testing.T) {
	cmd := newDominantCmd()
	cmd.Flags().Set("file", "/tmp/nonexistent-image.xyz")
	if err := cmd.RunE(cmd, []string{}); err == nil {
		t.Error("expected error for missing file")
	}
}

func TestDominantCmdRunESuccess(t *testing.T) {
	path := createTestPNG(t)
	cmd := newDominantCmd()
	cmd.Flags().Set("file", path)
	if err := cmd.RunE(cmd, []string{}); err != nil {
		t.Errorf("unexpected error: %v", err)
	}
}

func TestDominantCmdRunEJSON(t *testing.T) {
	path := createTestPNG(t)
	cmd := newDominantCmd()
	cmd.Flags().Set("file", path)
	cmd.Flags().Set("json", "true")
	if err := cmd.RunE(cmd, []string{}); err != nil {
		t.Errorf("unexpected error: %v", err)
	}
}

package image

import (
	"os"
	"path/filepath"
	"testing"
)

func TestConvertCmdUse(t *testing.T) {
	cmd := newConvertCmd()
	if cmd.Use != "convert [--file <file>]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "convert [--file <file>]")
	}
	if cmd.Flag("file") == nil {
		t.Error("expected --file flag")
	}
	if cmd.Short != "Convert image to another format" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Convert image to another format")
	}
}

func TestConvertCmdLong(t *testing.T) {
	cmd := newConvertCmd()
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

func TestConvertCmdRunEMissingFile(t *testing.T) {
	cmd := newConvertCmd()
	cmd.Flags().Set("file", "/tmp/nonexistent-image.xyz")
	if err := cmd.RunE(cmd, []string{}); err == nil {
		t.Error("expected error for missing file")
	}
}

func TestConvertCmdRunESuccess(t *testing.T) {
	path := createTestPNG(t)
	dir := filepath.Dir(path)
	output := filepath.Join(dir, "out.jpg")
	cmd := newConvertCmd()
	cmd.Flags().Set("file", path)
	cmd.Flags().Set("format", "jpg")
	cmd.Flags().Set("output", output)
	if err := cmd.RunE(cmd, []string{}); err != nil {
		t.Errorf("unexpected error: %v", err)
	}
	if _, err := os.Stat(output); os.IsNotExist(err) {
		t.Error("output file was not created")
	}
}

func TestConvertCmdRunEPNG(t *testing.T) {
	path := createTestPNG(t)
	dir := filepath.Dir(path)
	output := filepath.Join(dir, "out.png")
	cmd := newConvertCmd()
	cmd.Flags().Set("file", path)
	cmd.Flags().Set("format", "png")
	cmd.Flags().Set("output", output)
	if err := cmd.RunE(cmd, []string{}); err != nil {
		t.Errorf("unexpected error: %v", err)
	}
	if _, err := os.Stat(output); os.IsNotExist(err) {
		t.Error("output file was not created")
	}
}

func TestConvertCmdRunEGIF(t *testing.T) {
	path := createTestPNG(t)
	dir := filepath.Dir(path)
	output := filepath.Join(dir, "out.gif")
	cmd := newConvertCmd()
	cmd.Flags().Set("file", path)
	cmd.Flags().Set("format", "gif")
	cmd.Flags().Set("output", output)
	if err := cmd.RunE(cmd, []string{}); err != nil {
		t.Errorf("unexpected error: %v", err)
	}
	if _, err := os.Stat(output); os.IsNotExist(err) {
		t.Error("output file was not created")
	}
}

func TestConvertCmdRunEAutoOutput(t *testing.T) {
	path := createTestPNG(t)
	dir := filepath.Dir(path)
	cmd := newConvertCmd()
	cmd.Flags().Set("file", path)
	cmd.Flags().Set("format", "jpg")
	if err := cmd.RunE(cmd, []string{}); err != nil {
		t.Errorf("unexpected error: %v", err)
	}
	expected := filepath.Join(dir, "test.jpg")
	if _, err := os.Stat(expected); os.IsNotExist(err) {
		t.Error("auto-named output file was not created")
	}
}

func TestConvertCmdRunEUnsupportedFormat(t *testing.T) {
	path := createTestPNG(t)
	cmd := newConvertCmd()
	cmd.Flags().Set("file", path)
	cmd.Flags().Set("format", "bmp")
	cmd.Flags().Set("output", filepath.Join(t.TempDir(), "out.bmp"))
	if err := cmd.RunE(cmd, []string{}); err == nil {
		t.Error("expected error for unsupported format")
	}
}

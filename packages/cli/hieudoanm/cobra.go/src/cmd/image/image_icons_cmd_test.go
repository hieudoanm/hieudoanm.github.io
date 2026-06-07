package image

import (
	"testing"
)

func TestIconsCmdUse(t *testing.T) {
	cmd := newIconsCmd()
	if cmd.Use != "icons --svg <file>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "icons --svg <file>")
	}
	if cmd.Flag("svg") == nil {
		t.Error("expected --svg flag")
	}
	if cmd.Flag("sizes") == nil {
		t.Error("expected --sizes flag")
	}
	if cmd.Short != "Generate PNG icons from SVG at multiple sizes" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Generate PNG icons from SVG at multiple sizes")
	}
}

func TestIconsCmdLong(t *testing.T) {
	cmd := newIconsCmd()
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

func TestIconsCmdRunEMissingSVGFlag(t *testing.T) {
	cmd := newIconsCmd()
	if err := cmd.RunE(cmd, []string{}); err == nil {
		t.Error("expected error for missing --svg flag")
	}
}

func TestIconsCmdRunESVGFileNotFound(t *testing.T) {
	cmd := newIconsCmd()
	cmd.Flags().Set("svg", "/tmp/nonexistent-icon.svg")
	if err := cmd.RunE(cmd, []string{}); err == nil {
		t.Error("expected error for nonexistent svg file")
	}
}

func TestIconsCmdDefaultSizes(t *testing.T) {
	cmd := newIconsCmd()
	flag := cmd.Flag("sizes")
	if flag == nil {
		t.Fatal("expected --sizes flag")
	}
	want := "[16,32,48,64,96,128,144,152,192,256,384,512]"
	if got := flag.Value.String(); got != want {
		t.Errorf("default sizes = %q, want %q", got, want)
	}
}

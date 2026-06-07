package image

import (
	"image"
	"image/color"
	"image/png"
	"os"
	"path/filepath"
	"testing"
)

func createTestPNG(t *testing.T) string {
	t.Helper()
	dir := t.TempDir()
	path := filepath.Join(dir, "test.png")
	f, err := os.Create(path)
	if err != nil {
		t.Fatal(err)
	}
	defer f.Close()
	img := image.NewNRGBA(image.Rect(0, 0, 4, 4))
	for y := 0; y < 4; y++ {
		for x := 0; x < 4; x++ {
			img.Set(x, y, color.NRGBA{R: 255, G: 0, B: 0, A: 255})
		}
	}
	if err := png.Encode(f, img); err != nil {
		t.Fatal(err)
	}
	return path
}

func TestNewCommand(t *testing.T) {
	cmd := NewCommand()
	if cmd == nil {
		t.Fatal("NewCommand() returned nil")
	}
	if cmd.Use != "image" {
		t.Errorf("Use = %q, want %q", cmd.Use, "image")
	}
	if cmd.Commands() == nil {
		t.Fatal("expected subcommands")
	}
}

func TestNewCommandHasSubcommands(t *testing.T) {
	cmd := NewCommand()
	names := make(map[string]bool)
	for _, c := range cmd.Commands() {
		names[c.Name()] = true
	}
	for _, want := range []string{"info", "convert", "dominant", "icons"} {
		if !names[want] {
			t.Errorf("missing subcommand: %s", want)
		}
	}
}

func TestNewCommandRunE(t *testing.T) {
	cmd := NewCommand()
	if err := cmd.RunE(cmd, []string{}); err != nil {
		t.Errorf("RunE returned error: %v", err)
	}
}

func TestNewCommandExample(t *testing.T) {
	cmd := NewCommand()
	if cmd.Example == "" {
		t.Error("expected non-empty Example")
	}
}

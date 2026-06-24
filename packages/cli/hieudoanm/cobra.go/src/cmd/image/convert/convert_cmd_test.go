package convert

import (
	"testing"

	"github.com/hieudoanm/jack/src/cmd/image/testutil"
)

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "convert <file>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "convert <file>")
	}
	if cmd.Args == nil {
		t.Fatal("expected Args validator")
	}
	tests := []struct {
		name     string
		flag     string
		defValue string
	}{
		{"--format flag", "format", "png"},
		{"--output flag", "output", ""},
	}
	for _, tt := range tests {
		flag := cmd.Flags().Lookup(tt.flag)
		if flag == nil {
			t.Fatalf("missing flag: %s", tt.name)
		}
		if flag.DefValue != tt.defValue {
			t.Errorf("%s default = %q, want %q", tt.name, flag.DefValue, tt.defValue)
		}
	}
}

func TestRemoveExt(t *testing.T) {
	tests := []struct {
		input string
		want  string
	}{
		{"/path/to/image.png", "/path/to/image"},
		{"image.jpg", "image"},
		{"noext", "noext"},
		{"/a/b/c.tar.gz", "/a/b/c.tar"},
	}
	for _, tt := range tests {
		got := removeExt(tt.input)
		if got != tt.want {
			t.Errorf("removeExt(%q) = %q, want %q", tt.input, got, tt.want)
		}
	}
}

func TestRunConvert_NoInputArg(t *testing.T) {
	testutil.SetHomeTempDir(t)
	err := runConvert("")
	if err == nil {
		t.Error("expected error for empty path")
	}
}

func TestRunConvert_NonExistentInput(t *testing.T) {
	testutil.SetHomeTempDir(t)
	err := runConvert("/nonexistent/file.png")
	if err == nil {
		t.Error("expected error for non-existent file")
	}
}

func TestRunConvert_ValidPNG(t *testing.T) {
	inputPath := testutil.CreateTestPNG(t)
	testutil.SetHomeTempDir(t)
	err := runConvert(inputPath)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
}

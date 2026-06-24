package icons

import (
	"testing"

	"github.com/hieudoanm/jack/src/cmd/image/testutil"
)

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "icons <file>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "icons <file>")
	}
	if cmd.Args == nil {
		t.Fatal("expected Args validator")
	}
	flag := cmd.Flags().Lookup("sizes")
	if flag == nil {
		t.Fatal("expected --sizes flag")
	}
	if flag.DefValue != "[192,512]" {
		t.Errorf("--sizes default = %q, want %q", flag.DefValue, "[192,512]")
	}
}

func TestRunIcons_NoInputArg(t *testing.T) {
	testutil.SetHomeTempDir(t)
	err := runIcons("")
	if err == nil {
		t.Error("expected error for empty path")
	}
}

func TestRunIcons_NonExistentInput(t *testing.T) {
	testutil.SetHomeTempDir(t)
	err := runIcons("/nonexistent/file.png")
	if err == nil {
		t.Error("expected error for non-existent file")
	}
}

func TestRunIcons_ValidPNG(t *testing.T) {
	inputPath := testutil.CreateTestPNG(t)
	testutil.SetHomeTempDir(t)
	err := runIcons(inputPath)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
}

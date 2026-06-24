package info

import (
	"testing"

	"github.com/hieudoanm/jack/src/cmd/image/testutil"
)

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "info <file>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "info <file>")
	}
	if cmd.Args == nil {
		t.Fatal("expected Args validator")
	}
}

func TestRunInfo_NoInputArg(t *testing.T) {
	testutil.SetHomeTempDir(t)
	err := runInfo("")
	if err == nil {
		t.Error("expected error for empty path")
	}
}

func TestRunInfo_NonExistentInput(t *testing.T) {
	testutil.SetHomeTempDir(t)
	err := runInfo("/nonexistent/file.png")
	if err == nil {
		t.Error("expected error for non-existent file")
	}
}

func TestRunInfo_ValidPNG(t *testing.T) {
	inputPath := testutil.CreateTestPNG(t)
	testutil.SetHomeTempDir(t)
	err := runInfo(inputPath)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
}

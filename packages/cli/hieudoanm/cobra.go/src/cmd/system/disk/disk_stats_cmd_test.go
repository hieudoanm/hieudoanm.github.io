package disk

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/system/testutil"
)

func TestNewStatsCmd_RunE(t *testing.T) {
	cmd := NewStatsCmd()
	output := testutil.CaptureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "/") {
		t.Errorf("expected partition info in output, got %q", output)
	}
}

func TestNewStatsCmd_RunE_All(t *testing.T) {
	cmd := NewStatsCmd()
	if err := cmd.Flags().Set("all", "true"); err != nil {
		t.Fatal(err)
	}
	output := testutil.CaptureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "/") {
		t.Errorf("expected output with --all, got %q", output)
	}
}

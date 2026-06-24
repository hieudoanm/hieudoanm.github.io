package path

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/system/testutil"
)

func TestNewCmd_RunE_NoArgs(t *testing.T) {
	cmd := NewCmd()
	output := testutil.CaptureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "/") {
		t.Errorf("expected PATH entries in output, got %q", output)
	}
}

func TestNewCmd_RunE_JSON(t *testing.T) {
	cmd := NewCmd()
	if err := cmd.Flags().Set("json", "true"); err != nil {
		t.Fatal(err)
	}
	output := testutil.CaptureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, `"dir"`) {
		t.Errorf("expected JSON with dir field, got %q", output)
	}
}

func TestNewCmd_RunE_Sort(t *testing.T) {
	cmd := NewCmd()
	if err := cmd.Flags().Set("sort", "true"); err != nil {
		t.Fatal(err)
	}
	output := testutil.CaptureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "/") {
		t.Errorf("expected sorted PATH entries, got %q", output)
	}
}

func TestNewCmd_RunE_CommandJSON(t *testing.T) {
	cmd := NewCmd()
	if err := cmd.Flags().Set("json", "true"); err != nil {
		t.Fatal(err)
	}
	output := testutil.CaptureOutput(func() {
		if err := cmd.RunE(cmd, []string{"go"}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, `"command"`) {
		t.Errorf("expected JSON with command field, got %q", output)
	}
}

package system

import (
	"strings"
	"testing"
)

func TestNewPathCmd_RunE_NoArgs(t *testing.T) {
	orig := pathJSON
	pathJSON = false
	defer func() { pathJSON = orig }()

	cmd := newPathCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "/") {
		t.Errorf("expected PATH entries in output, got %q", output)
	}
}

func TestNewPathCmd_RunE_JSON(t *testing.T) {
	orig := pathJSON
	pathJSON = false
	defer func() { pathJSON = orig }()

	cmd := newPathCmd()
	if err := cmd.Flags().Set("json", "true"); err != nil {
		t.Fatal(err)
	}
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, `"dir"`) {
		t.Errorf("expected JSON with dir field, got %q", output)
	}
}

func TestNewPathCmd_RunE_Sort(t *testing.T) {
	orig := pathJSON
	pathJSON = false
	defer func() { pathJSON = orig }()

	cmd := newPathCmd()
	if err := cmd.Flags().Set("sort", "true"); err != nil {
		t.Fatal(err)
	}
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "/") {
		t.Errorf("expected sorted PATH entries, got %q", output)
	}
}

func TestNewPathCmd_RunE_CommandJSON(t *testing.T) {
	orig := pathJSON
	pathJSON = false
	defer func() { pathJSON = orig }()

	cmd := newPathCmd()
	if err := cmd.Flags().Set("json", "true"); err != nil {
		t.Fatal(err)
	}
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"go"}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, `"command"`) {
		t.Errorf("expected JSON with command field, got %q", output)
	}
}

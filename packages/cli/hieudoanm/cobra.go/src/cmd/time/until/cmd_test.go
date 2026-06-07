package until

import (
	"bytes"
	"io"
	"os"
	"strings"
	"testing"
)

func captureOutput(fn func()) string {
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	fn()
	w.Close()
	var buf bytes.Buffer
	io.Copy(&buf, r)
	os.Stdout = old
	return buf.String()
}

func TestNewCmd_Structure(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "until [--time <datetime>]" {
		t.Errorf("expected Use 'until [--time <datetime>]', got %q", cmd.Use)
	}
	if cmd.Short != "Countdown to a specific date/time" {
		t.Errorf("expected Short 'Countdown to a specific date/time', got %q", cmd.Short)
	}
	if cmd.Flag("time") == nil {
		t.Error("expected --time flag")
	}
}

func TestNewCmd_RunE(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("time", "2099-12-25")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "d") {
		t.Errorf("expected countdown output, got: %s", output)
	}
}

func TestNewCmd_RunE_PastTime(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("time", "2020-01-01")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "already passed") {
		t.Errorf("expected 'already passed' message, got: %s", output)
	}
}

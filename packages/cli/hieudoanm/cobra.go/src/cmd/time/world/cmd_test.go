package world

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
	if cmd.Use != "world [zone1 zone2 ...]" {
		t.Errorf("expected Use 'world [zone1 zone2 ...]', got %q", cmd.Use)
	}
	if cmd.Short != "Display current time in multiple timezones" {
		t.Errorf("expected Short 'Display current time in multiple timezones', got %q", cmd.Short)
	}
}

func TestNewCmd_RunE_DefaultZones(t *testing.T) {
	cmd := NewCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "ny:") {
		t.Errorf("expected ny timezone, got: %s", output)
	}
	if !strings.Contains(output, "utc:") {
		t.Errorf("expected utc timezone, got: %s", output)
	}
}

func TestNewCmd_RunE_CustomZones(t *testing.T) {
	cmd := NewCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"london", "tokyo"}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "london:") {
		t.Errorf("expected london timezone, got: %s", output)
	}
	if !strings.Contains(output, "tokyo:") {
		t.Errorf("expected tokyo timezone, got: %s", output)
	}
}

func TestNewCmd_RunE_InvalidZone(t *testing.T) {
	cmd := NewCmd()
	err := cmd.RunE(cmd, []string{"invalid_zone_xyz"})
	if err == nil {
		t.Fatal("expected error for invalid timezone")
	}
}

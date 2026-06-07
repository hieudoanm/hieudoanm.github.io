package timer

import (
	"bytes"
	"io"
	"os"
	"strings"
	"testing"
	"time"
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
	if cmd.Use != "timer [--duration <duration>]" {
		t.Errorf("expected Use 'timer [--duration <duration>]', got %q", cmd.Use)
	}
	if cmd.Short != "Simple countdown timer" {
		t.Errorf("expected Short 'Simple countdown timer', got %q", cmd.Short)
	}
	if cmd.Flag("duration") == nil {
		t.Error("expected --duration flag")
	}
	if cmd.Flag("json") == nil {
		t.Error("expected --json flag")
	}
}

func TestNewCmd_RunE(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("duration", "2s")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Time's up!") {
		t.Errorf("expected Time's up, got: %s", output)
	}
}

func TestNewCmd_RunE_JSON(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("duration", "2s")
	cmd.Flags().Set("json", "true")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "completed") {
		t.Errorf("expected JSON completed status, got: %s", output)
	}
}

func TestNewCmd_RunE_Cancelled(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("duration", "10s")
	go func() {
		time.Sleep(50 * time.Millisecond)
		p, _ := os.FindProcess(os.Getpid())
		p.Signal(os.Interrupt)
	}()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Timer cancelled") {
		t.Errorf("expected cancelled message, got: %s", output)
	}
}

func TestNewCmd_RunE_InvalidDuration(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("duration", "invalid")
	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for invalid duration")
	}
}

package stopwatch

import (
	"bytes"
	"context"
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
	if cmd.Use != "stopwatch" {
		t.Errorf("expected Use 'stopwatch', got %q", cmd.Use)
	}
	if cmd.Short != "Measure elapsed time like a stopwatch" {
		t.Errorf("expected Short 'Measure elapsed time like a stopwatch', got %q", cmd.Short)
	}
	if cmd.Flag("json") == nil {
		t.Error("expected --json flag")
	}
}

func TestNewCmd_RunE(t *testing.T) {
	cmd := NewCmd()
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Millisecond)
	defer cancel()
	cmd.SetContext(ctx)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Elapsed:") {
		t.Errorf("expected elapsed time, got: %s", output)
	}
}

func TestNewCmd_RunE_JSON(t *testing.T) {
	cmd := NewCmd()
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Millisecond)
	defer cancel()
	cmd.SetContext(ctx)
	cmd.Flags().Set("json", "true")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "elapsed") {
		t.Errorf("expected JSON elapsed field, got: %s", output)
	}
}

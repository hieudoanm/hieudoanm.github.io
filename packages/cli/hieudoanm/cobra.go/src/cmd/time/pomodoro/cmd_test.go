package pomodoro

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
	if cmd.Use != "pomodoro" {
		t.Errorf("expected Use 'pomodoro', got %q", cmd.Use)
	}
	if cmd.Short != "Start a Pomodoro timer TUI session" {
		t.Errorf("expected Short 'Start a Pomodoro timer TUI session', got %q", cmd.Short)
	}
	if cmd.Flag("work") == nil {
		t.Error("expected --work flag")
	}
	if cmd.Flag("rest") == nil {
		t.Error("expected --rest flag")
	}
}

func TestNewCmd_RunE_Flags(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("work", "25")
	cmd.Flags().Set("rest", "5")

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
	if !strings.Contains(output, "Launching Pomodoro") {
		t.Errorf("expected launch message, got: %s", output)
	}
}

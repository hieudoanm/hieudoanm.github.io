package random

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
	return strings.TrimRight(buf.String(), "\n")
}

func TestCmd_Structure(t *testing.T) {
	cmd := newCmd()
	if cmd.Use != "random" {
		t.Errorf("Use = %q, want %q", cmd.Use, "random")
	}
	if cmd.Short != "Generate random HEX colors with RGB preview" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Generate random HEX colors with RGB preview")
	}
	flag := cmd.Flag("max")
	if flag == nil {
		t.Fatal("expected --max flag")
	}
	if flag.DefValue != "1" {
		t.Errorf("--max default = %q, want %q", flag.DefValue, "1")
	}
	if flag.Shorthand != "m" {
		t.Errorf("--max shorthand = %q, want %q", flag.Shorthand, "m")
	}
}

func TestCmd_RunE(t *testing.T) {
	cmd := newCmd()
	if err := cmd.Flags().Set("max", "3"); err != nil {
		t.Fatal(err)
	}
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	lines := strings.Split(strings.TrimSpace(output), "\n")
	if len(lines) != 3 {
		t.Errorf("expected 3 lines, got %d: %q", len(lines), output)
	}
	for _, line := range lines {
		if !strings.Contains(line, "rgb(") {
			t.Errorf("expected rgb() in line %q", line)
		}
	}
}

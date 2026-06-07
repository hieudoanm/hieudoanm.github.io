package age

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
	if cmd.Use != "age [--date <birthdate>]" {
		t.Errorf("expected Use 'age [--date <birthdate>]', got %q", cmd.Use)
	}
	if cmd.Short != "Calculate age from a birthdate" {
		t.Errorf("expected Short 'Calculate age from a birthdate', got %q", cmd.Short)
	}
	if cmd.Flag("date") == nil {
		t.Error("expected --date flag")
	}
	if cmd.Flag("json") == nil {
		t.Error("expected --json flag")
	}
}

func TestNewCmd_RunE(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("date", "1990-01-15")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "years") {
		t.Errorf("expected output with years, got: %s", output)
	}
}

func TestNewCmd_RunE_JSON(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("date", "1990-01-15")
	cmd.Flags().Set("json", "true")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "birthdate") {
		t.Errorf("expected JSON birthdate field, got: %s", output)
	}
	if !strings.Contains(output, "years") {
		t.Errorf("expected JSON years field, got: %s", output)
	}
}

func TestNewCmd_RunE_FutureDate(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("date", "2099-01-01")
	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for future date")
	}
}

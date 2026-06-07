package factorial

import (
	"bytes"
	"encoding/json"
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
	if cmd.Use != "factorial [--number <n>]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "factorial [--number <n>]")
	}
	if cmd.Short != "Compute factorial of a number (n!)" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Compute factorial of a number (n!)")
	}
	if f := cmd.Flags().Lookup("number"); f == nil {
		t.Error("expected --number flag")
	}
}

func TestCmd_RunE(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("number", "5")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if strings.TrimSpace(output) != "120" {
		t.Errorf("expected 120, got %q", strings.TrimSpace(output))
	}
}

func TestCmd_RunE_Negative(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("number", "-1")
	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for negative number")
	}
	if !strings.Contains(err.Error(), "undefined") {
		t.Errorf("expected undefined error, got %v", err)
	}
}

func TestCmd_RunE_Json(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("number", "5")
	cmd.Flags().Set("json", "true")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	var result map[string]interface{}
	if err := json.Unmarshal([]byte(strings.TrimSpace(output)), &result); err != nil {
		t.Fatalf("invalid json output: %v", err)
	}
	if result["factorial"] != "120" {
		t.Errorf("expected factorial 120, got %v", result["factorial"])
	}
}

package stats

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
	if cmd.Use != "stats [--values <n1,n2,...>]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "stats [--values <n1,n2,...>]")
	}
	if cmd.Short != "Statistical summary of numbers" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Statistical summary of numbers")
	}
	if f := cmd.Flags().Lookup("values"); f == nil {
		t.Error("expected --values flag")
	}
}

func TestCmd_RunE(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("values", "1,2,3,4,5")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "count:  5") {
		t.Errorf("expected count 5 in output, got %q", output)
	}
	if !strings.Contains(output, "mean:   3") {
		t.Errorf("expected mean 3 in output, got %q", output)
	}
}

func TestCmd_RunE_InvalidValue(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("values", "1,abc,3")
	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for invalid number")
	}
}

func TestCmd_RunE_Json(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("values", "1,2,3,4,5")
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
	if result["count"] != float64(5) {
		t.Errorf("expected count 5, got %v", result["count"])
	}
	if result["mean"] != float64(3) {
		t.Errorf("expected mean 3, got %v", result["mean"])
	}
}

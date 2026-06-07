package base

import (
	"bytes"
	"encoding/json"
	"io"
	"os"
	"strconv"
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

func TestBaseConversion(t *testing.T) {
	n, _ := strconv.ParseInt("FF", 16, 64)
	if n != 255 {
		t.Errorf("hex FF = %d, want 255", n)
	}
	result := strconv.FormatInt(n, 2)
	if result != "11111111" {
		t.Errorf("dec 255 to bin = %s, want 11111111", result)
	}
	result = strconv.FormatInt(n, 16)
	if result != "ff" {
		t.Errorf("dec 255 to hex = %s, want ff", result)
	}
}

func TestNewCmd_Structure(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "base" {
		t.Errorf("Use = %q, want %q", cmd.Use, "base")
	}
}

func TestCmd_RunE(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("value", "FF")
	cmd.Flags().Set("from", "hex")
	cmd.Flags().Set("to", "dec")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "255") {
		t.Errorf("expected output containing 255, got %q", output)
	}
}

func TestCmd_RunE_InvalidFrom(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("value", "FF")
	cmd.Flags().Set("from", "invalid")
	cmd.Flags().Set("to", "dec")
	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for invalid base")
	}
	if !strings.Contains(err.Error(), "unknown base") {
		t.Errorf("expected unknown base error, got %v", err)
	}
}

func TestCmd_RunE_InvalidValue(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("value", "XYZ")
	cmd.Flags().Set("from", "hex")
	cmd.Flags().Set("to", "dec")
	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for invalid value")
	}
}

func TestCmd_RunE_Json(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("value", "FF")
	cmd.Flags().Set("from", "hex")
	cmd.Flags().Set("to", "dec")
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
	if result["result"] != "255" {
		t.Errorf("expected result 255, got %v", result["result"])
	}
}

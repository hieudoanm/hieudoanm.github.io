package percent

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

func TestPercentOf(t *testing.T) {
	value := 20.0
	of := 50.0
	pct := value / of * 100
	if pct != 40 {
		t.Errorf("20/50*100 = %f, want 40", pct)
	}
}

func TestPercentPlus(t *testing.T) {
	value := 50.0
	pct := 20.0
	result := value * (1 + pct/100)
	if result != 60 {
		t.Errorf("50 + 20%% = %f, want 60", result)
	}
}

func TestPercentMinus(t *testing.T) {
	value := 50.0
	pct := 20.0
	result := value * (1 - pct/100)
	if result != 40 {
		t.Errorf("50 - 20%% = %f, want 40", result)
	}
}

func TestNewCmd_Structure(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "percent" {
		t.Errorf("Use = %q, want %q", cmd.Use, "percent")
	}
}

func TestCmd_RunE_Of(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("value", "20")
	cmd.Flags().Set("of", "50")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "40.00") {
		t.Errorf("expected 40.00%% in output, got %q", output)
	}
}

func TestCmd_RunE_Plus(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("value", "50")
	cmd.Flags().Set("plus", "20")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "60.00") {
		t.Errorf("expected 60.00 in output, got %q", output)
	}
}

func TestCmd_RunE_Minus(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("value", "50")
	cmd.Flags().Set("minus", "20")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "40.00") {
		t.Errorf("expected 40.00 in output, got %q", output)
	}
}

func TestCmd_RunE_DefaultError(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("value", "50")
	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error when no --of/--plus/--minus specified")
	}
}

func TestCmd_RunE_Json(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("value", "20")
	cmd.Flags().Set("of", "50")
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
	if result["type"] != "percentage_of" {
		t.Errorf("expected type percentage_of, got %v", result["type"])
	}
}

func TestCmd_RunE_PlusJson(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("value", "50")
	cmd.Flags().Set("plus", "20")
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
	if result["type"] != "add_percentage" {
		t.Errorf("expected type add_percentage, got %v", result["type"])
	}
}

func TestCmd_RunE_MinusJson(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("value", "50")
	cmd.Flags().Set("minus", "20")
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
	if result["type"] != "subtract_percentage" {
		t.Errorf("expected type subtract_percentage, got %v", result["type"])
	}
}

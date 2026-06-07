package tip

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

func TestTipCalculation(t *testing.T) {
	bill := 50.0
	tipPct := 15.0
	split := 4
	tip := bill * tipPct / 100
	total := bill + tip
	perPerson := total / float64(split)
	if tip != 7.5 {
		t.Errorf("tip = %.2f, want 7.5", tip)
	}
	if total != 57.5 {
		t.Errorf("total = %.2f, want 57.5", total)
	}
	if perPerson != 14.375 {
		t.Errorf("perPerson = %.4f, want 14.375", perPerson)
	}
}

func TestNewCmd_Structure(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "tip" {
		t.Errorf("Use = %q, want %q", cmd.Use, "tip")
	}
}

func TestCmd_RunE(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("bill", "50")
	cmd.Flags().Set("percent", "15")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "57.50") {
		t.Errorf("expected total 57.50 in output, got %q", output)
	}
}

func TestCmd_RunE_Split(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("bill", "50")
	cmd.Flags().Set("percent", "15")
	cmd.Flags().Set("split", "4")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "14.38") {
		t.Errorf("expected per person ~14.38 in output, got %q", output)
	}
}

func TestCmd_RunE_Json(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("bill", "50")
	cmd.Flags().Set("percent", "15")
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
	if result["tip"] != 7.5 {
		t.Errorf("expected tip 7.5, got %v", result["tip"])
	}
}

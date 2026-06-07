package bmi

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

func TestBmiCategory(t *testing.T) {
	tests := []struct {
		bmi      float64
		category string
	}{
		{16, "Underweight"},
		{20, "Normal"},
		{27, "Overweight"},
		{35, "Obese"},
	}
	for _, tt := range tests {
		if got := bmiCategory(tt.bmi); got != tt.category {
			t.Errorf("bmiCategory(%.1f) = %q, want %q", tt.bmi, got, tt.category)
		}
	}
}

func TestNewCmd_Structure(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "bmi" {
		t.Errorf("Use = %q, want %q", cmd.Use, "bmi")
	}
	if cmd.Short != "Calculate Body Mass Index" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Calculate Body Mass Index")
	}
	if f := cmd.Flags().Lookup("weight"); f == nil {
		t.Error("expected --weight flag")
	}
	if f := cmd.Flags().Lookup("height"); f == nil {
		t.Error("expected --height flag")
	}
}

func TestCmd_RunE(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("weight", "70")
	cmd.Flags().Set("height", "175")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "BMI:") {
		t.Errorf("expected BMI in output, got %q", output)
	}
}

func TestCmd_RunE_Json(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("weight", "70")
	cmd.Flags().Set("height", "175")
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
	if result["category"] != "Normal" {
		t.Errorf("expected Normal category, got %v", result["category"])
	}
}

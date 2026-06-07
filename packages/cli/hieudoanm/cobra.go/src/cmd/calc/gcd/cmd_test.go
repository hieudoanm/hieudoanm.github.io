package gcd

import (
	"bytes"
	"encoding/json"
	"io"
	"os"
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/calc/internal"
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
	if cmd.Use != "gcd [--a <a> --b <b>]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "gcd [--a <a> --b <b>]")
	}
	if cmd.Short != "Greatest common divisor of two numbers" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Greatest common divisor of two numbers")
	}
	if f := cmd.Flags().Lookup("a"); f == nil {
		t.Error("expected --a flag")
	}
	if f := cmd.Flags().Lookup("b"); f == nil {
		t.Error("expected --b flag")
	}
}

func TestCmd_RunE(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("a", "12")
	cmd.Flags().Set("b", "18")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if strings.TrimSpace(output) != "6" {
		t.Errorf("expected 6, got %q", strings.TrimSpace(output))
	}
}

func TestCmd_RunE_Json(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("a", "12")
	cmd.Flags().Set("b", "18")
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
	if result["gcd"] != float64(6) {
		t.Errorf("expected gcd 6, got %v", result["gcd"])
	}
}

func TestGcd(t *testing.T) {
	tests := []struct {
		a, b int64
		want int64
	}{
		{12, 18, 6},
		{100, 75, 25},
		{7, 5, 1},
		{0, 5, 5},
		{5, 0, 5},
		{17, 17, 17},
		{1, 1, 1},
		{270, 192, 6},
	}
	for _, tt := range tests {
		if got := internal.Gcd(tt.a, tt.b); got != tt.want {
			t.Errorf("Gcd(%d,%d) = %d, want %d", tt.a, tt.b, got, tt.want)
		}
	}
}

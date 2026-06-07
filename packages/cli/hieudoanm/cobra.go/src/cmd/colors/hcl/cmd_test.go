package hcl

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

func withStdin(t *testing.T, input string, fn func()) {
	t.Helper()
	old := os.Stdin
	r, w, _ := os.Pipe()
	if _, err := w.Write([]byte(input)); err != nil {
		t.Fatal(err)
	}
	w.Close()
	os.Stdin = r
	defer func() { os.Stdin = old }()
	fn()
}

func TestCmd_Structure(t *testing.T) {
	cmd := newCmd()
	if cmd.Use != "hcl" {
		t.Errorf("Use = %q, want %q", cmd.Use, "hcl")
	}
	if cmd.Short != "Convert HCL values to HEX, RGB, HSL, OKLCH, and CMYK" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Convert HCL values to HEX, RGB, HSL, OKLCH, and CMYK")
	}
}

func TestConvertHCL_Valid(t *testing.T) {
	tests := []struct {
		name    string
		h, c, l float64
	}{
		{"red hue", 0, 50, 50},
		{"green hue", 120, 50, 50},
		{"blue hue", 240, 50, 50},
		{"low chroma", 180, 10, 50},
		{"high lightness", 60, 30, 90},
		{"low lightness", 300, 40, 10},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := convertHCL(tt.h, tt.c, tt.l)
			if !strings.Contains(result, "HEX") {
				t.Errorf("convertHCL(%v,%v,%v) missing HEX, got %q", tt.h, tt.c, tt.l, result)
			}
			if !strings.Contains(result, "RGB") {
				t.Errorf("convertHCL(%v,%v,%v) missing RGB, got %q", tt.h, tt.c, tt.l, result)
			}
			if !strings.Contains(result, "HSL") {
				t.Errorf("convertHCL(%v,%v,%v) missing HSL, got %q", tt.h, tt.c, tt.l, result)
			}
			if !strings.Contains(result, "OKLCH") {
				t.Errorf("convertHCL(%v,%v,%v) missing OKLCH, got %q", tt.h, tt.c, tt.l, result)
			}
			if !strings.Contains(result, "CMYK") {
				t.Errorf("convertHCL(%v,%v,%v) missing CMYK, got %q", tt.h, tt.c, tt.l, result)
			}
		})
	}
}

func TestConvertHCL_InvalidHCL(t *testing.T) {
	tests := []struct {
		name    string
		h, c, l float64
	}{
		{"hue > 360", 400, 50, 50},
		{"hue < 0", -10, 50, 50},
		{"chroma < 0", 180, -1, 50},
		{"lightness < 0", 180, 50, -5},
		{"lightness > 100", 180, 50, 110},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := convertHCL(tt.h, tt.c, tt.l)
			if !strings.Contains(result, "Error (RGB)") {
				t.Errorf("convertHCL(%v,%v,%v) expected Error (RGB), got %q", tt.h, tt.c, tt.l, result)
			}
			if strings.Contains(result, "HSL") {
				t.Errorf("convertHCL(%v,%v,%v) should not contain HSL on error, got %q", tt.h, tt.c, tt.l, result)
			}
		})
	}
}

func TestConvertHCL_EdgeCases(t *testing.T) {
	tests := []struct {
		name    string
		h, c, l float64
	}{
		{"zero values", 0, 0, 0},
		{"max lightness", 0, 0, 100},
		{"hue 360 edge", 360, 50, 50},
		{"chroma 0", 180, 0, 50},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := convertHCL(tt.h, tt.c, tt.l)
			if !strings.Contains(result, "HEX") && !strings.Contains(result, "Error") {
				t.Errorf("convertHCL(%v,%v,%v) unexpected result, got %q", tt.h, tt.c, tt.l, result)
			}
		})
	}
}

func TestCmd_RunE(t *testing.T) {
	cmd := newCmd()
	withStdin(t, "10\n50\n60\n", func() {
		output := captureOutput(func() {
			if err := cmd.RunE(cmd, nil); err != nil {
				t.Fatal(err)
			}
		})
		if !strings.Contains(output, "HEX") {
			t.Errorf("expected HEX in output, got %q", output)
		}
	})
}

func TestCmd_RunE_Error(t *testing.T) {
	cmd := newCmd()
	withStdin(t, "400\n50\n60\n", func() {
		output := captureOutput(func() {
			if err := cmd.RunE(cmd, nil); err != nil {
				t.Fatal(err)
			}
		})
		if !strings.Contains(output, "Error") {
			t.Errorf("expected error in output, got %q", output)
		}
	})
}

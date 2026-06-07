package oklch

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
	if cmd.Use != "oklch" {
		t.Errorf("Use = %q, want %q", cmd.Use, "oklch")
	}
	if cmd.Short != "Convert OKLCH values to HEX, RGB, HSL, HCL, and CMYK" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Convert OKLCH values to HEX, RGB, HSL, HCL, and CMYK")
	}
}

func TestConvertOKLCH_Valid(t *testing.T) {
	tests := []struct {
		name    string
		L, C, H float64
	}{
		{"red-ish", 0.5, 0.1, 0},
		{"green-ish", 0.5, 0.1, 120},
		{"blue-ish", 0.5, 0.1, 240},
		{"gray", 0.5, 0, 0},
		{"light", 0.9, 0.05, 60},
		{"dark", 0.1, 0.05, 300},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := convertOKLCH(tt.L, tt.C, tt.H)
			if !strings.Contains(result, "HEX") {
				t.Errorf("convertOKLCH(%v,%v,%v) missing HEX, got %q", tt.L, tt.C, tt.H, result)
			}
			if !strings.Contains(result, "RGB") {
				t.Errorf("convertOKLCH(%v,%v,%v) missing RGB, got %q", tt.L, tt.C, tt.H, result)
			}
			if !strings.Contains(result, "HSL") {
				t.Errorf("convertOKLCH(%v,%v,%v) missing HSL, got %q", tt.L, tt.C, tt.H, result)
			}
			if !strings.Contains(result, "HCL") {
				t.Errorf("convertOKLCH(%v,%v,%v) missing HCL, got %q", tt.L, tt.C, tt.H, result)
			}
			if !strings.Contains(result, "CMYK") {
				t.Errorf("convertOKLCH(%v,%v,%v) missing CMYK, got %q", tt.L, tt.C, tt.H, result)
			}
		})
	}
}

func TestConvertOKLCH_Invalid(t *testing.T) {
	tests := []struct {
		name    string
		L, C, H float64
	}{
		{"L < 0", -0.1, 0.1, 180},
		{"L > 1", 1.5, 0.1, 180},
		{"C < 0", 0.5, -0.1, 180},
		{"H < 0", 0.5, 0.1, -10},
		{"H > 360", 0.5, 0.1, 400},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := convertOKLCH(tt.L, tt.C, tt.H)
			if !strings.Contains(result, "Error (RGB)") {
				t.Errorf("convertOKLCH(%v,%v,%v) expected Error (RGB), got %q", tt.L, tt.C, tt.H, result)
			}
		})
	}
}

func TestConvertOKLCH_EdgeCases(t *testing.T) {
	tests := []struct {
		name    string
		L, C, H float64
	}{
		{"black", 0, 0, 0},
		{"white", 1, 0, 0},
		{"mid gray", 0.5, 0, 0},
		{"hue 360", 0.5, 0.1, 360},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := convertOKLCH(tt.L, tt.C, tt.H)
			if !strings.Contains(result, "HEX") && !strings.Contains(result, "Error") {
				t.Errorf("convertOKLCH(%v,%v,%v) unexpected result, got %q", tt.L, tt.C, tt.H, result)
			}
		})
	}
}

func TestCmd_RunE(t *testing.T) {
	cmd := newCmd()
	withStdin(t, "0.5\n0.2\n0.3\n", func() {
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
	withStdin(t, "-0.1\n0.2\n0.3\n", func() {
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

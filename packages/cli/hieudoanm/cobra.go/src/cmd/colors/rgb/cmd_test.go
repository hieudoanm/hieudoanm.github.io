package rgb

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
	if cmd.Use != "rgb" {
		t.Errorf("Use = %q, want %q", cmd.Use, "rgb")
	}
	if cmd.Short != "Convert RGB values to HEX, HSL, HCL, OKLCH, and CMYK" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Convert RGB values to HEX, HSL, HCL, OKLCH, and CMYK")
	}
}

func TestConvertRGB_Valid(t *testing.T) {
	tests := []struct {
		name    string
		r, g, b int
	}{
		{"red", 255, 0, 0},
		{"green", 0, 255, 0},
		{"blue", 0, 0, 255},
		{"black", 0, 0, 0},
		{"white", 255, 255, 255},
		{"gray", 128, 128, 128},
		{"yellow", 255, 255, 0},
		{"cyan", 0, 255, 255},
		{"magenta", 255, 0, 255},
		{"orange", 255, 165, 0},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := convertRGB(tt.r, tt.g, tt.b)
			if !strings.Contains(result, "HEX") {
				t.Errorf("convertRGB(%d,%d,%d) missing HEX, got %q", tt.r, tt.g, tt.b, result)
			}
			if !strings.Contains(result, "HSL") {
				t.Errorf("convertRGB(%d,%d,%d) missing HSL, got %q", tt.r, tt.g, tt.b, result)
			}
			if !strings.Contains(result, "HCL") {
				t.Errorf("convertRGB(%d,%d,%d) missing HCL, got %q", tt.r, tt.g, tt.b, result)
			}
			if !strings.Contains(result, "OKLCH") {
				t.Errorf("convertRGB(%d,%d,%d) missing OKLCH, got %q", tt.r, tt.g, tt.b, result)
			}
			if !strings.Contains(result, "CMYK") {
				t.Errorf("convertRGB(%d,%d,%d) missing CMYK, got %q", tt.r, tt.g, tt.b, result)
			}
		})
	}
}

func TestConvertRGB_Invalid(t *testing.T) {
	tests := []struct {
		name    string
		r, g, b int
	}{
		{"R > 255", 300, 0, 0},
		{"R < 0", -5, 0, 0},
		{"G > 255", 0, 300, 0},
		{"G < 0", 0, -5, 0},
		{"B > 255", 0, 0, 300},
		{"B < 0", 0, 0, -5},
		{"all invalid", 999, 999, 999},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := convertRGB(tt.r, tt.g, tt.b)
			if !strings.Contains(result, "Error (HEX)") {
				t.Errorf("convertRGB(%d,%d,%d) expected Error (HEX), got %q", tt.r, tt.g, tt.b, result)
			}
			if !strings.Contains(result, "Error (HSL)") {
				t.Errorf("convertRGB(%d,%d,%d) expected Error (HSL), got %q", tt.r, tt.g, tt.b, result)
			}
			if !strings.Contains(result, "Error (HCL)") {
				t.Errorf("convertRGB(%d,%d,%d) expected Error (HCL), got %q", tt.r, tt.g, tt.b, result)
			}
			if !strings.Contains(result, "Error (OKLCH)") {
				t.Errorf("convertRGB(%d,%d,%d) expected Error (OKLCH), got %q", tt.r, tt.g, tt.b, result)
			}
			if !strings.Contains(result, "Error (CMYK)") {
				t.Errorf("convertRGB(%d,%d,%d) expected Error (CMYK), got %q", tt.r, tt.g, tt.b, result)
			}
		})
	}
}

func TestCmd_RunE(t *testing.T) {
	cmd := newCmd()
	withStdin(t, "255\n0\n0\n", func() {
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
	withStdin(t, "300\n0\n0\n", func() {
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

func TestCmd_RunE_InputError_R(t *testing.T) {
	cmd := newCmd()
	withStdin(t, "abc\n", func() {
		output := captureOutput(func() {
			if err := cmd.RunE(cmd, nil); err != nil {
				t.Fatal(err)
			}
		})
		if !strings.Contains(output, "Error (R)") {
			t.Errorf("expected Error (R) in output, got %q", output)
		}
	})
}

package hex

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
	if cmd.Use != "hex" {
		t.Errorf("Use = %q, want %q", cmd.Use, "hex")
	}
	if cmd.Short != "Convert a HEX color to RGB, HSL, HCL, OKLCH, and CMYK" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Convert a HEX color to RGB, HSL, HCL, OKLCH, and CMYK")
	}
}

func TestConvertHex_Valid(t *testing.T) {
	tests := []struct {
		name string
		hex  string
	}{
		{"red", "#FF0000"},
		{"green", "#00FF00"},
		{"blue", "#0000FF"},
		{"black", "#000000"},
		{"white", "#FFFFFF"},
		{"short form", "#F00"},
		{"no hash", "FF0000"},
		{"lowercase", "#ff6600"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := convertHex(tt.hex)
			if !strings.Contains(result, "RGB") {
				t.Errorf("convertHex(%q) missing RGB, got %q", tt.hex, result)
			}
			if !strings.Contains(result, "HSL") {
				t.Errorf("convertHex(%q) missing HSL, got %q", tt.hex, result)
			}
			if !strings.Contains(result, "HCL") {
				t.Errorf("convertHex(%q) missing HCL, got %q", tt.hex, result)
			}
			if !strings.Contains(result, "OKLCH") {
				t.Errorf("convertHex(%q) missing OKLCH, got %q", tt.hex, result)
			}
			if !strings.Contains(result, "CMYK") {
				t.Errorf("convertHex(%q) missing CMYK, got %q", tt.hex, result)
			}
		})
	}
}

func TestConvertHex_Invalid(t *testing.T) {
	tests := []struct {
		name string
		hex  string
	}{
		{"invalid chars", "#XYZ"},
		{"too short", "#00"},
		{"too long", "#1234567"},
		{"empty", ""},
		{"just hash", "#"},
		{"5 chars", "#12345"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := convertHex(tt.hex)
			if !strings.Contains(result, "Error (RGB)") {
				t.Errorf("convertHex(%q) expected Error (RGB), got %q", tt.hex, result)
			}
			if strings.Contains(result, "HSL") {
				t.Errorf("convertHex(%q) should not contain HSL on error, got %q", tt.hex, result)
			}
		})
	}
}

func TestCmd_RunE(t *testing.T) {
	cmd := newCmd()
	withStdin(t, "FF5733\n", func() {
		output := captureOutput(func() {
			if err := cmd.RunE(cmd, nil); err != nil {
				t.Fatal(err)
			}
		})
		if !strings.Contains(output, "RGB") {
			t.Errorf("expected RGB in output, got %q", output)
		}
		if !strings.Contains(output, "HSL") {
			t.Errorf("expected HSL in output, got %q", output)
		}
	})
}

func TestCmd_RunE_Error(t *testing.T) {
	cmd := newCmd()
	withStdin(t, "ZZZ\n", func() {
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

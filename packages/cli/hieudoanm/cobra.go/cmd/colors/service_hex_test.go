package colors

import (
	"testing"
)

func TestHexToRGB(t *testing.T) {
	tests := []struct {
		hex       Hex
		r, g, b   int
		shouldErr bool
	}{
		{Hex("#FF0000"), 255, 0, 0, false},
		{Hex("#00FF00"), 0, 255, 0, false},
		{Hex("#0000FF"), 0, 0, 255, false},
		{Hex("#000000"), 0, 0, 0, false},
		{Hex("#FFFFFF"), 255, 255, 255, false},
		{Hex("#F00"), 255, 0, 0, false},
		{Hex("#0F0"), 0, 255, 0, false},
		{Hex("00FF00"), 0, 255, 0, false},
		{Hex("#XYZ"), 0, 0, 0, true},
		{Hex("#00"), 0, 0, 0, true},
		{Hex(""), 0, 0, 0, true},
	}
	for _, tt := range tests {
		r, g, b, err := tt.hex.ToRGB()
		if tt.shouldErr {
			if err == nil {
				t.Errorf("%q: expected error", string(tt.hex))
			}
			continue
		}
		if err != nil {
			t.Errorf("%q: unexpected error: %v", string(tt.hex), err)
			continue
		}
		if r != tt.r || g != tt.g || b != tt.b {
			t.Errorf("%q: got (%d,%d,%d), want (%d,%d,%d)", string(tt.hex), r, g, b, tt.r, tt.g, tt.b)
		}
	}
}

func TestHexToHSL(t *testing.T) {
	H, S, L, err := Hex("#00FF00").ToHSL()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !approxEq(H, 120, 0.01) || !approxEq(S, 100, 0.01) || !approxEq(L, 50, 0.01) {
		t.Errorf("ToHSL() = (%.4f, %.4f, %.4f), want (120, 100, 50)", H, S, L)
	}
}

func TestHexToOKLCH(t *testing.T) {
	L, C, H, err := Hex("#FF0000").ToOKLCH()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if L <= 0 || L > 1 {
		t.Errorf("L out of range: %.4f", L)
	}
	if C < 0 {
		t.Errorf("C negative: %.4f", C)
	}
	if H < 0 || H > 360 {
		t.Errorf("H out of range: %.4f", H)
	}
}

func TestHexToHCL(t *testing.T) {
	H, C, L, err := Hex("#0000FF").ToHCL()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if H < 0 || H > 360 {
		t.Errorf("hue out of range: %.4f", H)
	}
	if L <= 0 {
		t.Errorf("lightness too low: %.4f", L)
	}
	if C < 0 {
		t.Errorf("chroma negative: %.4f", C)
	}
}

func TestHexToCMYK(t *testing.T) {
	C, M, Y, K, err := Hex("#FF0000").ToCMYK()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if C != 0 || !approxEq(M, 1, 0.01) || !approxEq(Y, 1, 0.01) || K != 0 {
		t.Errorf("ToCMYK() = (%.4f, %.4f, %.4f, %.4f), want (0, 1, 1, 0)", C, M, Y, K)
	}
}

func TestHexInvalidReturnsError(t *testing.T) {
	if _, _, _, err := Hex("#XYZ").ToRGB(); err == nil {
		t.Error("ToRGB: expected error for invalid hex")
	}
	if _, _, _, err := Hex("").ToRGB(); err == nil {
		t.Error("ToRGB: expected error for empty hex")
	}
	if _, _, _, _, err := Hex("#XYZ").ToCMYK(); err == nil {
		t.Error("ToCMYK: expected error for invalid hex")
	}
}

func TestGenerateRandomHexColor(t *testing.T) {
	color := GenerateRandomHexColor()
	if !IsValidHex(color) {
		t.Errorf("generated invalid hex color: %s", color)
	}
}

func TestIsValidHex(t *testing.T) {
	valid := []string{"#FFF", "#fff", "000000", "#ABCDEF", "#abcdef", "abc"}
	invalid := []string{"#GHI", "1234", "#12345", "#1234567", "", "##FF0000"}

	for _, v := range valid {
		if !IsValidHex(v) {
			t.Errorf("expected valid: %q", v)
		}
	}
	for _, v := range invalid {
		if IsValidHex(v) {
			t.Errorf("expected invalid: %q", v)
		}
	}
}

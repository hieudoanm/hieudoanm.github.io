package colors

import (
	"math"
	"testing"
)

func TestRGB(t *testing.T) {
	c := RGB{R: 255, G: 0, B: 0}

	// IsValid
	if !c.IsValid() {
		t.Error("RGB(255,0,0) should be valid")
	}
	if (RGB{R: 256, G: 0, B: 0}).IsValid() {
		t.Error("RGB(256,0,0) should be invalid")
	}

	// ToHex
	hex, err := c.ToHex()
	if err != nil || hex != "#FF0000" {
		t.Errorf("ToHex failed: %s, err: %v", hex, err)
	}

	// ToHSL
	h, s, l, err := c.ToHSL()
	if err != nil || h != 0 || s != 100 || l != 50 {
		t.Errorf("ToHSL failed: h=%v, s=%v, l=%v, err=%v", h, s, l, err)
	}

	// ToCMYK
	cy, m, y, k, err := c.ToCMYK()
	if err != nil || cy != 0 || m != 100 || y != 100 || k != 0 {
		t.Errorf("ToCMYK failed: c=%v, m=%v, y=%v, k=%v, err=%v", cy, m, y, k, err)
	}
}

func TestHex(t *testing.T) {
	h := Hex("#00FF00")

	// ToRGB
	r, g, b, err := h.ToRGB()
	if err != nil || r != 0 || g != 255 || b != 0 {
		t.Errorf("ToRGB failed: r=%d, g=%d, b=%d, err=%v", r, g, b, err)
	}

	// Short hex
	hShort := Hex("#0F0")
	r, g, b, err = hShort.ToRGB()
	if err != nil || r != 0 || g != 255 || b != 0 {
		t.Errorf("Short hex ToRGB failed: r=%d, g=%d, b=%d, err=%v", r, g, b, err)
	}

	// ToHSL
	H, S, L, err := h.ToHSL()
	if err != nil || H != 120 || S != 100 || L != 50 {
		t.Errorf("ToHSL failed: H=%v, S=%v, L=%v, err=%v", H, S, L, err)
	}

	// IsValidHex
	if !IsValidHex("#FFF") || !IsValidHex("000000") || !IsValidHex("#ABCDEF") {
		t.Error("IsValidHex failed for valid hex")
	}
	if IsValidHex("#GHI") || IsValidHex("1234") {
		t.Error("IsValidHex failed for invalid hex")
	}
}

func TestGenerateRandomHexColor(t *testing.T) {
	color := GenerateRandomHexColor()
	if !IsValidHex(color) {
		t.Errorf("Generated invalid hex color: %s", color)
	}
}

func TestColorsRounding(t *testing.T) {
	// Test a color that needs rounding/floating point care
	c := RGB{R: 128, G: 128, B: 128}
	h, s, l, _ := c.ToHSL()
	if math.Round(h) != 0 || math.Round(s) != 0 || math.Round(l) != 50 {
		t.Errorf("ToHSL for Gray failed: h=%v, s=%v, l=%v", h, s, l)
	}
}

package color

import (
	"testing"
)

func TestComponentToHex(t *testing.T) {
	tests := []struct {
		name string
		code uint8
		want string
	}{
		{"zero", 0, "00"},
		{"one", 1, "01"},
		{"fifteen", 15, "0f"},
		{"sixteen", 16, "10"},
		{"max", 255, "ff"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := ComponentToHex(tt.code); got != tt.want {
				t.Errorf("ComponentToHex(%d) = %q, want %q", tt.code, got, tt.want)
			}
		})
	}
}

func TestRgbToHex(t *testing.T) {
	tests := []struct {
		name         string
		r, g, b      uint8
		want         string
	}{
		{"black", 0, 0, 0, "#000000"},
		{"white", 255, 255, 255, "#ffffff"},
		{"red", 255, 0, 0, "#ff0000"},
		{"green", 0, 255, 0, "#00ff00"},
		{"blue", 0, 0, 255, "#0000ff"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := RgbToHex(tt.r, tt.g, tt.b); got != tt.want {
				t.Errorf("RgbToHex(%d,%d,%d) = %q, want %q", tt.r, tt.g, tt.b, got, tt.want)
			}
		})
	}
}

func TestHexToRgb(t *testing.T) {
	tests := []struct {
		name      string
		hex       string
		wantR     uint8
		wantG     uint8
		wantB     uint8
		wantOk    bool
	}{
		{"with hash", "#ff0000", 255, 0, 0, true},
		{"without hash", "00ff00", 0, 255, 0, true},
		{"short form", "#fff", 255, 255, 255, true},
		{"short no hash", "fff", 255, 255, 255, true},
		{"invalid short", "ffff", 0, 0, 0, false},
		{"invalid length", "#fffff", 0, 0, 0, false},
		{"empty", "", 0, 0, 0, false},
		{"just hash", "#", 0, 0, 0, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r, g, b, ok := HexToRgb(tt.hex)
			if ok != tt.wantOk || r != tt.wantR || g != tt.wantG || b != tt.wantB {
				t.Errorf("HexToRgb(%q) = (%d,%d,%d,%v), want (%d,%d,%d,%v)",
					tt.hex, r, g, b, ok, tt.wantR, tt.wantG, tt.wantB, tt.wantOk)
			}
		})
	}
}

func TestRgbToHslRoundtrip(t *testing.T) {
	tests := []struct {
		name      string
		r, g, b   uint8
		wantH     float64
		wantS     float64
		wantL     float64
	}{
		{"black", 0, 0, 0, 0, 0, 0},
		{"white", 255, 255, 255, 0, 0, 100},
		{"red", 255, 0, 0, 0, 100, 50},
		{"green", 0, 255, 0, 120, 100, 50},
		{"blue", 0, 0, 255, 240, 100, 50},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			h, s, l := RgbToHsl(tt.r, tt.g, tt.b)
			if h != tt.wantH || s != tt.wantS || l != tt.wantL {
				t.Errorf("RgbToHsl(%d,%d,%d) = (%v,%v,%v), want (%v,%v,%v)",
					tt.r, tt.g, tt.b, h, s, l, tt.wantH, tt.wantS, tt.wantL)
			}
			rr, gg, bb := HslToRgb(h, s, l)
			if rr != tt.r || gg != tt.g || bb != tt.b {
				t.Errorf("HslToRgb(%v,%v,%v) = (%d,%d,%d), want (%d,%d,%d)",
					h, s, l, rr, gg, bb, tt.r, tt.g, tt.b)
			}
		})
	}
}

func TestHexToHsl(t *testing.T) {
	h, s, l := HexToHsl("#ff0000")
	if h != 0 || s != 100 || l != 50 {
		t.Errorf("HexToHsl('#ff0000') = (%v,%v,%v), want (0,100,50)", h, s, l)
	}

	h, s, l = HexToHsl("invalid")
	if h != 0 || s != 0 || l != 0 {
		t.Errorf("HexToHsl('invalid') = (%v,%v,%v), want (0,0,0)", h, s, l)
	}
}

func TestHslToHex(t *testing.T) {
	tests := []struct {
		name   string
		h, s, l float64
		want   string
	}{
		{"red", 0, 100, 50, "#ff0000"},
		{"green", 120, 100, 50, "#00ff00"},
		{"blue", 240, 100, 50, "#0000ff"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := HslToHex(tt.h, tt.s, tt.l); got != tt.want {
				t.Errorf("HslToHex(%v,%v,%v) = %q, want %q", tt.h, tt.s, tt.l, got, tt.want)
			}
		})
	}
}

func TestRgbToCmyk(t *testing.T) {
	c, m, y, k := RgbToCmyk(255, 0, 0)
	if c != 0 || m != 100 || y != 100 || k != 0 {
		t.Errorf("RgbToCmyk(255,0,0) = (%v,%v,%v,%v), want (0,100,100,0)", c, m, y, k)
	}

	c, m, y, k = RgbToCmyk(0, 0, 0)
	if c != 0 || m != 0 || y != 0 || k != 100 {
		t.Errorf("RgbToCmyk(0,0,0) = (%v,%v,%v,%v), want (0,0,0,100)", c, m, y, k)
	}
}

func TestCmykRoundtrip(t *testing.T) {
	r, g, b := CmykToRgb(0, 100, 100, 0)
	if r != 255 || g != 0 || b != 0 {
		t.Errorf("CmykToRgb(0,100,100,0) = (%d,%d,%d), want (255,0,0)", r, g, b)
	}

	c, m, y, k := RgbToCmyk(255, 0, 0)
	if c != 0 || m != 100 || y != 100 || k != 0 {
		t.Errorf("RgbToCmyk(255,0,0) = (%v,%v,%v,%v)", c, m, y, k)
	}
}

func TestHexToCmyk(t *testing.T) {
	c, m, y, k := HexToCmyk("#ff0000")
	if c != 0 || m != 100 || y != 100 || k != 0 {
		t.Errorf("HexToCmyk('#ff0000') = (%v,%v,%v,%v)", c, m, y, k)
	}

	c, m, y, k = HexToCmyk("invalid")
	if c != 0 || m != 0 || y != 0 || k != 100 {
		t.Errorf("HexToCmyk('invalid') = (%v,%v,%v,%v)", c, m, y, k)
	}
}

func TestCmykToHex(t *testing.T) {
	if got := CmykToHex(0, 100, 100, 0); got != "#ff0000" {
		t.Errorf("CmykToHex(0,100,100,0) = %q, want '#ff0000'", got)
	}
}

func TestCmykToHsl(t *testing.T) {
	h, s, l := CmykToHsl(0, 100, 100, 0)
	if h != 0 || s != 100 || l != 50 {
		t.Errorf("CmykToHsl(0,100,100,0) = (%v,%v,%v), want (0,100,50)", h, s, l)
	}
}

func TestHslToCmyk(t *testing.T) {
	c, m, y, k := HslToCmyk(0, 100, 50)
	if c != 0 || m != 100 || y != 100 || k != 0 {
		t.Errorf("HslToCmyk(0,100,50) = (%v,%v,%v,%v), want (0,100,100,0)", c, m, y, k)
	}
}

func TestHexToOklch(t *testing.T) {
	l, c, h := HexToOklch("#ff0000")
	if l == 0 && c == 0 && h == 0 {
		t.Errorf("HexToOklch('#ff0000') returned all zeros")
	}

	l, c, h = HexToOklch("#12345")
	if l != 0 || c != 0 || h != 0 {
		t.Errorf("HexToOklch('#12345') = (%v,%v,%v), want (0,0,0)", l, c, h)
	}
}

func TestOklchToHex(t *testing.T) {
	hex := OklchToHex(0.5, 0.2, 30)
	if hex == "" {
		t.Errorf("OklchToHex returned empty")
	}
	if len(hex) != 7 || hex[0] != '#' {
		t.Errorf("OklchToHex returned invalid hex: %q", hex)
	}
}

func TestOklchRoundtrip(t *testing.T) {
	testCases := []string{"#ff0000", "#00ff00", "#0000ff", "#ffffff", "#000000"}
	for _, tc := range testCases {
		l, c, h := HexToOklch(tc)
		got := OklchToHex(l, c, h)
		if got != tc {
			t.Errorf("Oklch roundtrip(%q) = %q", tc, got)
		}
	}
}

func TestBrightness(t *testing.T) {
	tests := []struct {
		name string
		hex  string
		want bool
	}{
		{"dark is dim", "#000000", true},
		{"white is bright", "#ffffff", false},
		{"invalid hex", "invalid", false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Brightness(tt.hex); got != tt.want {
				t.Errorf("Brightness(%q) = %v, want %v", tt.hex, got, tt.want)
			}
		})
	}
}

func TestRandomHex(t *testing.T) {
	for i := 0; i < 10; i++ {
		got := RandomHex()
		if len(got) != 7 || got[0] != '#' {
			t.Errorf("RandomHex() = %q, invalid format", got)
		}
	}
}

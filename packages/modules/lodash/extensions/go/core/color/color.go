package color

import (
	"math"
	"math/rand"
)

func ComponentToHex(code uint8) string {
	h := []byte("  ")
	for i := 1; i >= 0; i-- {
		digit := code % 16
		if digit < 10 {
			h[i] = '0' + byte(digit)
		} else {
			h[i] = 'a' + byte(digit-10)
		}
		code /= 16
	}
	return string(h)
}

func RgbToHex(red, green, blue uint8) string {
	return "#" + ComponentToHex(red) + ComponentToHex(green) + ComponentToHex(blue)
}

func HexToRgb(hex string) (uint8, uint8, uint8, bool) {
	h := hex
	if len(h) > 0 && h[0] == '#' {
		h = h[1:]
	}
	if len(h) == 3 {
		h = string([]byte{h[0], h[0], h[1], h[1], h[2], h[2]})
	}
	if len(h) != 6 {
		return 0, 0, 0, false
	}
	r := parseHex(h[0:2])
	g := parseHex(h[2:4])
	b := parseHex(h[4:6])
	return r, g, b, true
}

func parseHex(s string) uint8 {
	var val uint8
	for i := 0; i < len(s); i++ {
		val <<= 4
		c := s[i]
		switch {
		case c >= '0' && c <= '9':
			val += c - '0'
		case c >= 'a' && c <= 'f':
			val += c - 'a' + 10
		case c >= 'A' && c <= 'F':
			val += c - 'A' + 10
		}
	}
	return val
}

// ---------------------------------------------------------------------------
// RGB <-> HSL
// ---------------------------------------------------------------------------

func RgbToHsl(r, g, b uint8) (h, s, l float64) {
	rf := float64(r) / 255.0
	gf := float64(g) / 255.0
	bf := float64(b) / 255.0

	max := math.Max(rf, math.Max(gf, bf))
	min := math.Min(rf, math.Min(gf, bf))
	delta := max - min

	l = (max + min) / 2.0

	if delta == 0 {
		return 0, 0, l * 100.0
	}

	s = delta / (1.0 - math.Abs(2.0*l-1.0))

	switch max {
	case rf:
		h = ((gf-bf)/delta + math.Mod(6.0, 6.0)) * 60.0
		if gf < bf {
			h += 360.0
		}
	case gf:
		h = ((bf-rf)/delta + 2.0) * 60.0
	case bf:
		h = ((rf-gf)/delta + 4.0) * 60.0
	}

	return h, s * 100.0, l * 100.0
}

func HexToHsl(hex string) (h, s, l float64) {
	r, g, b, ok := HexToRgb(hex)
	if !ok {
		return 0, 0, 0
	}
	return RgbToHsl(r, g, b)
}

func HslToRgb(h, s, l float64) (uint8, uint8, uint8) {
	s /= 100.0
	l /= 100.0

	c := (1 - math.Abs(2*l-1)) * s
	x := c * (1 - math.Abs(math.Mod(h/60.0, 2)-1))
	m := l - c/2.0

	var r, g, b float64
	switch int(h / 60.0) {
	case 0:
		r, g, b = c, x, 0
	case 1:
		r, g, b = x, c, 0
	case 2:
		r, g, b = 0, c, x
	case 3:
		r, g, b = 0, x, c
	case 4:
		r, g, b = x, 0, c
	case 5:
		r, g, b = c, 0, x
	}

	return uint8(math.Round((r + m) * 255)), uint8(math.Round((g + m) * 255)), uint8(math.Round((b + m) * 255))
}

func HslToHex(h, s, l float64) string {
	r, g, b := HslToRgb(h, s, l)
	return RgbToHex(r, g, b)
}

// ---------------------------------------------------------------------------
// CMYK
// ---------------------------------------------------------------------------

func RgbToCmyk(r, g, b uint8) (c, m, y, k float64) {
	rf := float64(r) / 255.0
	gf := float64(g) / 255.0
	bf := float64(b) / 255.0

	k = 1 - math.Max(rf, math.Max(gf, bf))
	if k == 1 {
		return 0, 0, 0, 100
	}
	c = (1 - rf - k) / (1 - k) * 100
	m = (1 - gf - k) / (1 - k) * 100
	y = (1 - bf - k) / (1 - k) * 100
	return
}

func HexToCmyk(hex string) (c, m, y, k float64) {
	r, g, b, ok := HexToRgb(hex)
	if !ok {
		return 0, 0, 0, 100
	}
	return RgbToCmyk(r, g, b)
}

func CmykToRgb(c, m, y, k float64) (uint8, uint8, uint8) {
	c /= 100
	m /= 100
	y /= 100
	k /= 100

	r := uint8(math.Round(255 * (1 - c) * (1 - k)))
	g := uint8(math.Round(255 * (1 - m) * (1 - k)))
	b := uint8(math.Round(255 * (1 - y) * (1 - k)))
	return r, g, b
}

func CmykToHex(c, m, y, k float64) string {
	r, g, b := CmykToRgb(c, m, y, k)
	return RgbToHex(r, g, b)
}

func CmykToHsl(c, m, y, k float64) (h, s, l float64) {
	r, g, b := CmykToRgb(c, m, y, k)
	return RgbToHsl(r, g, b)
}

func HslToCmyk(h, s, l float64) (c, m, y, k float64) {
	r, g, b := HslToRgb(h, s, l)
	return RgbToCmyk(r, g, b)
}

// ---------------------------------------------------------------------------
// OKLCH
// ---------------------------------------------------------------------------

func srgbLinearize(v float64) float64 {
	if v <= 0.04045 {
		return v / 12.92
	}
	return math.Pow((v+0.055)/1.055, 2.4)
}

func srgbDelinearize(v float64) float64 {
	if v <= 0.0031308 {
		return v * 12.92
	}
	return 1.055*math.Pow(v, 1.0/2.4) - 0.055
}

func HexToOklch(hex string) (l, c, h float64) {
	r, g, b, ok := HexToRgb(hex)
	if !ok {
		return 0, 0, 0
	}

	rLin := srgbLinearize(float64(r) / 255.0)
	gLin := srgbLinearize(float64(g) / 255.0)
	bLin := srgbLinearize(float64(b) / 255.0)

	lL := 0.4122214708*rLin + 0.5363325363*gLin + 0.0514459929*bLin
	mL := 0.2119034982*rLin + 0.6806995451*gLin + 0.1073969566*bLin
	sL := 0.0883024619*rLin + 0.2817188376*gLin + 0.6299787005*bLin

	lCbrt := math.Cbrt(lL)
	mCbrt := math.Cbrt(mL)
	sCbrt := math.Cbrt(sL)

	lVal := 0.2104542553*lCbrt + 0.793617785*mCbrt - 0.0040720468*sCbrt
	a := 1.9779984951*lCbrt - 2.428592205*mCbrt + 0.4505937099*sCbrt
	b2 := 0.0259040371*lCbrt + 0.7827717662*mCbrt - 0.808675766*sCbrt

	cVal := math.Sqrt(a*a + b2*b2)
	hDeg := math.Atan2(b2, a) * 180.0 / math.Pi
	hVal := math.Mod(hDeg+360.0, 360.0)

	l = math.Round(lVal*10000.0) / 10000.0
	c = math.Round(cVal*10000.0) / 10000.0
	h = math.Round(hVal*100.0) / 100.0
	return
}

func OklchToHex(l, c, h float64) string {
	a := c * math.Cos(h/360.0*2.0*math.Pi)
	b2 := c * math.Sin(h/360.0*2.0*math.Pi)

	lCbrt := l + 0.3963377774*a + 0.2158037573*b2
	mCbrt := l - 0.1055613458*a - 0.0638541728*b2
	sCbrt := l - 0.0894841775*a - 1.291485548*b2

	lL := lCbrt * lCbrt * lCbrt
	mL := mCbrt * mCbrt * mCbrt
	sL := sCbrt * sCbrt * sCbrt

	rLin := 4.0767416621*lL - 3.3077115913*mL + 0.2309699292*sL
	gLin := -1.2684380046*lL + 2.6097574011*mL - 0.3413193965*sL
	bLin := -0.0041960863*lL - 0.7034186147*mL + 1.707614701*sL

	rS := srgbDelinearize(rLin)
	gS := srgbDelinearize(gLin)
	bS := srgbDelinearize(bLin)

	clamp := func(v float64) uint8 {
		if v < 0 {
			return 0
		}
		if v > 1 {
			return 255
		}
		return uint8(math.Round(v * 255))
	}

	return RgbToHex(clamp(rS), clamp(gS), clamp(bS))
}

// ---------------------------------------------------------------------------
// Brightness / Random
// ---------------------------------------------------------------------------

func Brightness(hex string) bool {
	r, g, b, ok := HexToRgb(hex)
	if !ok {
		return false
	}
	luma := 0.299*float64(r) + 0.587*float64(g) + 0.114*float64(b)
	return luma < 186
}

func RandomHex() string {
	r := uint8(rand.Intn(256))
	g := uint8(rand.Intn(256))
	b := uint8(rand.Intn(256))
	return RgbToHex(r, g, b)
}

package colors

import (
	"fmt"
	"math"
)

// -------------------------------
// OKLCH struct
// -------------------------------
type OKLCH struct {
	L float64 // Lightness 0–1
	C float64 // Chroma
	H float64 // Hue 0–360
}

// -------------------------------
// Validate OKLCH
// -------------------------------
func (c OKLCH) IsValid() bool {
	return c.L >= 0 && c.L <= 1 &&
		c.C >= 0 &&
		c.H >= 0 && c.H <= 360
}

// -------------------------------
// OKLCH → Oklab
// -------------------------------
func (c OKLCH) ToOklab() (L, a, b float64) {
	hRad := c.H * math.Pi / 180
	a = c.C * math.Cos(hRad)
	b = c.C * math.Sin(hRad)
	L = c.L
	return
}

// -------------------------------
// Oklab → linear RGB
// -------------------------------
func oklabToLinearRGB(L, a, b float64) (R, G, B float64) {
	L_ := L + 0
	A := a
	Bb := b

	l_ := L_ + 0.3963377774*A + 0.2158037573*Bb
	m_ := L_ - 0.1055613458*A - 0.0638541728*Bb
	s_ := L_ - 0.0894841775*A - 1.2914855480*Bb

	cbrt := math.Cbrt
	R = 4.0767416621*cbrt(l_) - 3.3077115913*cbrt(m_) + 0.2309699292*cbrt(s_)
	G = -1.2684380046*cbrt(l_) + 2.6097574011*cbrt(m_) - 0.3413193965*cbrt(s_)
	B = -0.0041960863*cbrt(l_) - 0.7034186147*cbrt(m_) + 1.7076147010*cbrt(s_)

	return
}

// -------------------------------
// linear RGB → sRGB 0–255
// -------------------------------
func linearToRGB255(R, G, B float64) (r, g, b int) {
	toSRGB := func(u float64) float64 {
		if u <= 0 {
			return 0
		}
		if u >= 1 {
			return 1
		}
		if u <= 0.0031308 {
			return 12.92 * u
		}
		return 1.055*math.Pow(u, 1/2.4) - 0.055
	}
	r = int(math.Round(toSRGB(R) * 255))
	g = int(math.Round(toSRGB(G) * 255))
	b = int(math.Round(toSRGB(B) * 255))
	return
}

// -------------------------------
// OKLCH → RGB
// -------------------------------
func (c OKLCH) ToRGB() (r, g, b int, err error) {
	if !c.IsValid() {
		return 0, 0, 0, fmt.Errorf("invalid OKLCH")
	}

	L, a, b_ := c.ToOklab()
	Rlin, Glin, Blin := oklabToLinearRGB(L, a, b_)
	r, g, b = linearToRGB255(Rlin, Glin, Blin)
	return r, g, b, nil
}

// -------------------------------
// OKLCH → HEX
// -------------------------------
func (c OKLCH) ToHex() (string, error) {
	r, g, b, err := c.ToRGB()
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("#%02X%02X%02X", r, g, b), nil
}

// -------------------------------
// OKLCH → HSL
// -------------------------------
func (c OKLCH) ToHSL() (h, s, l float64, err error) {
	r, g, b, err := c.ToRGB()
	if err != nil {
		return 0, 0, 0, err
	}

	h, s, l, err = RGB{R: r, G: g, B: b}.ToHSL()
	if err != nil {
		return 0, 0, 0, err
	}
	return h, s, l, nil
}

// -------------------------------
// OKLCH → HCL
// -------------------------------
func (c OKLCH) ToHCL() (h, cVal, l float64, err error) {
	r, g, b, err := c.ToRGB()
	if err != nil {
		return 0, 0, 0, err
	}

	h, cVal, l, err = RGB{R: r, G: g, B: b}.ToHCL()
	if err != nil {
		return 0, 0, 0, err
	}
	return h, cVal, l, nil
}

// -------------------------------
// OKLCH → CMYK
// -------------------------------
func (c OKLCH) ToCMYK() (C, M, Y, K float64, err error) {
	r, g, b, err := c.ToRGB()
	if err != nil {
		return 0, 0, 0, 0, err
	}

	C, M, Y, K, err = RGB{R: r, G: g, B: b}.ToCMYK()
	if err != nil {
		return 0, 0, 0, 0, err
	}
	return C, M, Y, K, nil
}

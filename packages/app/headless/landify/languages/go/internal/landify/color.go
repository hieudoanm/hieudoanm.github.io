package landify

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

// Tokens expands a Theme into every :root custom property. Only the authored
// colors appear as inputs; the rest are derived:
//
//	base           → base-100, and base-200/base-300 via lighten/darken
//	               → base-content by contrast
//	primary        → primary-dark (shade), primary-soft (tint on base),
//	               → primary-content by contrast
//	secondary      → secondary-content by contrast
//	neutral        → neutral-faint, border, border-soft (tints on base)
//	info/warning/success/error → passed through
//	radius         → passed through
func Tokens(t Theme) (map[string]string, error) {
	baseR, baseG, baseB, err := parseHex(t.Base)
	if err != nil {
		return nil, err
	}
	primaryR, primaryG, primaryB, err := parseHex(t.Primary)
	if err != nil {
		return nil, err
	}
	secondaryR, secondaryG, secondaryB, err := parseHex(t.Secondary)
	if err != nil {
		return nil, err
	}
	neutralR, neutralG, neutralB, err := parseHex(t.Neutral)
	if err != nil {
		return nil, err
	}
	for _, color := range []string{t.Info, t.Warning, t.Success, t.Error} {
		if _, _, _, err := parseHex(color); err != nil {
			return nil, err
		}
	}

	baseLum := luminance(baseR, baseG, baseB)
	base200 := hex(mix(baseR, 255, 0.85), mix(baseG, 255, 0.85), mix(baseB, 255, 0.85))
	base300 := hex(mix(baseR, 0, 0.03), mix(baseG, 0, 0.03), mix(baseB, 0, 0.03))
	if baseLum < 0.35 {
		base200 = hex(mix(baseR, 255, 0.10), mix(baseG, 255, 0.10), mix(baseB, 255, 0.10))
		base300 = hex(mix(baseR, 0, 0.08), mix(baseG, 0, 0.08), mix(baseB, 0, 0.08))
	}

	return map[string]string{
		"base-100":          t.Base,
		"base-200":          base200,
		"base-300":          base300,
		"base-content":      contrastingText(baseR, baseG, baseB),
		"primary":           t.Primary,
		"primary-dark":      hex(mix(primaryR, 0, 0.15), mix(primaryG, 0, 0.15), mix(primaryB, 0, 0.15)),
		"primary-soft":      hex(mix(primaryR, baseR, 0.88), mix(primaryG, baseG, 0.88), mix(primaryB, baseB, 0.88)),
		"primary-content":   contrastingText(primaryR, primaryG, primaryB),
		"secondary":         t.Secondary,
		"secondary-content": contrastingText(secondaryR, secondaryG, secondaryB),
		"neutral":           t.Neutral,
		"neutral-faint":     hex(mix(neutralR, baseR, 0.45), mix(neutralG, baseG, 0.45), mix(neutralB, baseB, 0.45)),
		"border":            t.Neutral,
		"border-soft":       hex(mix(neutralR, baseR, 0.60), mix(neutralG, baseG, 0.60), mix(neutralB, baseB, 0.60)),
		"info":              t.Info,
		"warning":           t.Warning,
		"success":           t.Success,
		"error":             t.Error,
		"radius":            t.Radius,
	}, nil
}

// readableOn walks the color in these steps toward whichever extreme the
// background needs: 25 × 4% reaches white or black and then some.
const (
	readableStep  = 0.04
	readableSteps = 25
)

// blend mixes two "#RRGGBB" colors, strength 0 returning a and 1 returning b.
func blend(a, b string, strength float64) (string, error) {
	ar, ag, ab, err := parseHex(a)
	if err != nil {
		return "", err
	}
	br, bg, bb, err := parseHex(b)
	if err != nil {
		return "", err
	}
	return hex(mix(ar, br, strength), mix(ag, bg, strength), mix(ab, bb, strength)), nil
}

// mix blends one channel toward target by strength: 0 leaves it alone, 1
// replaces it. Every derived color in Tokens is a mix against white (tint),
// black (shade), or the base color.
func mix(c, target int, strength float64) int {
	return int(math.Round(float64(c) + (float64(target)-float64(c))*strength))
}

// contrastRatio returns the WCAG contrast ratio between two colors: 1 when
// they are the same, 21 for black on white.
func contrastRatio(a, b string) (float64, error) {
	ar, ag, ab, err := parseHex(a)
	if err != nil {
		return 0, err
	}
	br, bg, bb, err := parseHex(b)
	if err != nil {
		return 0, err
	}
	lighter, darker := luminance(ar, ag, ab), luminance(br, bg, bb)
	if darker > lighter {
		lighter, darker = darker, lighter
	}
	return (lighter + 0.05) / (darker + 0.05), nil
}

// readableOn shifts fg toward black (on a light bg) or white (on a dark one)
// until it reaches min contrast against bg, and returns it unchanged when it
// already does. The social card uses it for accent-colored text: a theme's
// primary is chosen to sit on a surface, not to carry small type.
func readableOn(fg, bg string, min float64) (string, error) {
	r, g, b, err := parseHex(fg)
	if err != nil {
		return "", err
	}
	br, bgR, bb, err := parseHex(bg)
	if err != nil {
		return "", err
	}
	if ratio, err := contrastRatio(fg, bg); err == nil && ratio >= min {
		return fg, nil
	}
	target := 255
	if luminance(br, bgR, bb) >= 0.5 {
		target = 0
	}
	for step := 1; step <= readableSteps; step++ {
		strength := float64(step) * readableStep
		candidate := hex(mix(r, target, strength), mix(g, target, strength), mix(b, target, strength))
		if ratio, err := contrastRatio(candidate, bg); err == nil && ratio >= min {
			return candidate, nil
		}
	}
	return hex(mix(r, target, 1), mix(g, target, 1), mix(b, target, 1)), nil
}

// parseHex parses a "#RRGGBB" color (the "#" is optional) into RGB channels.
func parseHex(s string) (r, g, b int, err error) {
	s = strings.TrimPrefix(strings.TrimSpace(s), "#")
	if len(s) != 6 {
		return 0, 0, 0, fmt.Errorf("parse %q: want #RRGGBB", s)
	}
	n, err := strconv.ParseUint(s, 16, 32)
	if err != nil {
		return 0, 0, 0, fmt.Errorf("parse %q: %w", s, err)
	}
	return int(n >> 16), int(n >> 8 & 0xff), int(n & 0xff), nil
}

// hex formats RGB channels as a "#RRGGBB" string.
func hex(r, g, b int) string {
	return fmt.Sprintf("#%02x%02x%02x", r, g, b)
}

// contrastingText picks the readable foreground for a background: near-black
// on light backgrounds, white on dark ones, using WCAG relative luminance.
func contrastingText(r, g, b int) string {
	if luminance(r, g, b) >= 0.5 {
		return "#181d25"
	}
	return "#ffffff"
}

// luminance returns the WCAG relative luminance of an sRGB color.
func luminance(r, g, b int) float64 {
	linear := func(c int) float64 {
		v := float64(c) / 255
		if v <= 0.04045 {
			return v / 12.92
		}
		return math.Pow((v+0.055)/1.055, 2.4)
	}
	return 0.2126*linear(r) + 0.7152*linear(g) + 0.0722*linear(b)
}

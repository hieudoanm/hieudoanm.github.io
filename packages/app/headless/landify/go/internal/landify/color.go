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

	tint := func(c, base int, strength float64) int {
		return int(math.Round(float64(c) + (float64(base)-float64(c))*strength))
	}
	shade := func(c int, strength float64) int {
		return int(math.Round(float64(c) * (1 - strength)))
	}

	baseLum := luminance(baseR, baseG, baseB)
	base200 := hex(tint(baseR, 255, 0.85), tint(baseG, 255, 0.85), tint(baseB, 255, 0.85))
	base300 := hex(shade(baseR, 0.03), shade(baseG, 0.03), shade(baseB, 0.03))
	if baseLum < 0.35 {
		base200 = hex(tint(baseR, 255, 0.10), tint(baseG, 255, 0.10), tint(baseB, 255, 0.10))
		base300 = hex(shade(baseR, 0.08), shade(baseG, 0.08), shade(baseB, 0.08))
	}

	return map[string]string{
		"base-100":          t.Base,
		"base-200":          base200,
		"base-300":          base300,
		"base-content":      contrastingText(baseR, baseG, baseB),
		"primary":           t.Primary,
		"primary-dark":      hex(shade(primaryR, 0.15), shade(primaryG, 0.15), shade(primaryB, 0.15)),
		"primary-soft":      hex(tint(primaryR, baseR, 0.88), tint(primaryG, baseG, 0.88), tint(primaryB, baseB, 0.88)),
		"primary-content":   contrastingText(primaryR, primaryG, primaryB),
		"secondary":         t.Secondary,
		"secondary-content": contrastingText(secondaryR, secondaryG, secondaryB),
		"neutral":           t.Neutral,
		"neutral-faint":     hex(tint(neutralR, baseR, 0.45), tint(neutralG, baseG, 0.45), tint(neutralB, baseB, 0.45)),
		"border":            t.Neutral,
		"border-soft":       hex(tint(neutralR, baseR, 0.60), tint(neutralG, baseG, 0.60), tint(neutralB, baseB, 0.60)),
		"info":              t.Info,
		"warning":           t.Warning,
		"success":           t.Success,
		"error":             t.Error,
		"radius":            t.Radius,
	}, nil
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

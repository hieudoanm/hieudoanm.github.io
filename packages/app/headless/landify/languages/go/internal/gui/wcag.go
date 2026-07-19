package gui

import (
	"fmt"
	"math"
	"strconv"
	"strings"

	"landify/internal/landify"
)

// ContrastResult is one text/background pair with its ratio and WCAG level.
type ContrastResult struct {
	Label  string
	FG     string
	BG     string
	Ratio  float64
	Rating string // "AAA", "AA", "AA-lg", "fail"
}

// ContrastReport computes the contrast ratio for every meaningful
// token pair in a landify theme.
func ContrastReport(theme landify.Theme) ([]ContrastResult, error) {
	tok, err := landify.Tokens(theme)
	if err != nil {
		return nil, err
	}
	pairs := [][3]string{
		{"Body text on base", "base-content", "base-100"},
		{"Body text on surface-200", "base-content", "base-200"},
		{"Primary button text", "primary-content", "primary"},
		{"Secondary accent text", "secondary-content", "secondary"},
		{"Soft accent text", "base-content", "primary-soft"},
	}
	var out []ContrastResult
	for _, p := range pairs {
		r, err := Contrast(tok[p[1]], tok[p[2]])
		if err != nil {
			return nil, err
		}
		out = append(out, ContrastResult{Label: p[0], FG: tok[p[1]], BG: tok[p[2]], Ratio: r, Rating: WCAGLevel(r)})
	}
	return out, nil
}

// Contrast returns the WCAG 2.1 contrast ratio between two hex colors.
func Contrast(fg, bg string) (float64, error) {
	fgR, fgG, fgB, err := parseHex(fg)
	if err != nil {
		return 0, fmt.Errorf("foreground %q: %w", fg, err)
	}
	bgR, bgG, bgB, err := parseHex(bg)
	if err != nil {
		return 0, fmt.Errorf("background %q: %w", bg, err)
	}
	l1 := relativeLuminance(fgR, fgG, fgB)
	l2 := relativeLuminance(bgR, bgG, bgB)
	if l1 < l2 {
		return (l2 + 0.05) / (l1 + 0.05), nil
	}
	return (l1 + 0.05) / (l2 + 0.05), nil
}

// WCAGLevel returns a human label for the ratio: AAA, AA, AA-lg, or fail.
func WCAGLevel(r float64) string {
	switch {
	case r >= 7:
		return "AAA"
	case r >= 4.5:
		return "AA"
	case r >= 3:
		return "AA-lg"
	default:
		return "fail"
	}
}

func relativeLuminance(r, g, b int) float64 {
	linear := func(c int) float64 {
		v := float64(c) / 255
		if v <= 0.04045 {
			return v / 12.92
		}
		return math.Pow((v+0.055)/1.055, 2.4)
	}
	return 0.2126*linear(r) + 0.7152*linear(g) + 0.0722*linear(b)
}

func parseHex(s string) (int, int, int, error) {
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

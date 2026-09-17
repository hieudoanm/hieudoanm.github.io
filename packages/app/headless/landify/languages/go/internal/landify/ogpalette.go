package landify

import (
	"fmt"
	"math"
)

// OGColor is the palette the card draws with, all of it derived from the theme.
type OGColor struct {
	Base, BaseAlt                    string // gradient ends
	Glow                             string // accent, over the base gradient
	Accent, AccentInk                string
	AccentDeep                       string // gradient end for the accent fills
	AccentOnDark                     string
	Ink, Muted                       string
	Hairline, Panel, PanelLine, Pill string
}

// ogInk is the card's dark ink. It matches the near-black the page uses for
// body text, so a monogram on a bright accent tile belongs to the same ink as
// the copy beside it.
const ogInk = "#181d25"

// ogColors maps the page tokens onto the card palette. AccentInk and Muted are
// the two places the card asks for a color the page does not: both carry text,
// so neither is trusted to the theme's raw value. AccentInk is pushed off the
// accent until it clears the contrast floor on the background, and Muted is
// pushed off the neutral for the same reason — a theme whose neutral is a
// surface tone (daisyUI's neutrals are) would otherwise print the description
// almost invisibly. The panel takes primary-soft rather than the base so it
// stays a visible block on top of the gradient, and the chips go back to the
// base so they read against the tint.
func ogColors(tokens map[string]string) (OGColor, error) {
	base := tokens["base-100"]
	accent := tokens["primary"]
	glow, err := blend(accent, tokens["secondary"], 0.5)
	if err != nil {
		return OGColor{}, fmt.Errorf("og glow: %w", err)
	}
	readable, err := readableOn(accent, base, ogMinContrast)
	if err != nil {
		return OGColor{}, fmt.Errorf("og accent: %w", err)
	}
	muted, err := readableOn(tokens["neutral"], base, ogMinContrast)
	if err != nil {
		return OGColor{}, fmt.Errorf("og muted: %w", err)
	}
	onAccent, err := ogInkOn(accent, tokens["primary-dark"])
	if err != nil {
		return OGColor{}, fmt.Errorf("og accent ink: %w", err)
	}
	return OGColor{
		Base:         base,
		BaseAlt:      tokens["base-200"],
		Glow:         glow,
		Accent:       accent,
		AccentDeep:   tokens["primary-dark"],
		AccentInk:    readable,
		AccentOnDark: onAccent,
		Ink:          tokens["base-content"],
		Muted:        muted,
		Hairline:     tokens["neutral-faint"],
		Panel:        tokens["primary-soft"],
		PanelLine:    tokens["border-soft"],
		Pill:         base,
	}, nil
}

// ogInkOn returns whichever of the card's two inks reads better on the accent
// tile. The page's contrastingText switches at a fixed luminance, which leaves
// white on a mid-tone primary — a bright orange or lime clears 4.5:1 with dark
// ink but only 3:1 with white, and a 26px monogram has to be legible. The tile
// is painted with a gradient, so both of its ends count: an ink that reads on
// the lighter end can still disappear on the darker one.
func ogInkOn(gradient ...string) (string, error) {
	worst := func(ink string) (float64, error) {
		lowest := math.MaxFloat64
		for _, bg := range gradient {
			ratio, err := contrastRatio(ink, bg)
			if err != nil {
				return 0, err
			}
			lowest = min(lowest, ratio)
		}
		return lowest, nil
	}
	onWhite, err := worst("#ffffff")
	if err != nil {
		return "", err
	}
	onInk, err := worst(ogInk)
	if err != nil {
		return "", err
	}
	if onInk > onWhite {
		return ogInk, nil
	}
	return "#ffffff", nil
}

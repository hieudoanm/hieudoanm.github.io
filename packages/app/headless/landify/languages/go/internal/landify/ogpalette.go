package landify

import "fmt"

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

// ogColors maps the page tokens onto the card palette. AccentOnDark is the one
// place the card asks for a different color than the page: a light label on
// the accent tile, which is what primary-content already is. The panel takes
// primary-soft rather than the base so it stays a visible block on top of the
// gradient, and the chips go back to the base so they read against the tint.
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
	return OGColor{
		Base:         base,
		BaseAlt:      tokens["base-200"],
		Glow:         glow,
		Accent:       accent,
		AccentDeep:   tokens["primary-dark"],
		AccentInk:    readable,
		AccentOnDark: tokens["primary-content"],
		Ink:          tokens["base-content"],
		Muted:        tokens["neutral"],
		Hairline:     tokens["neutral-faint"],
		Panel:        tokens["primary-soft"],
		PanelLine:    tokens["border-soft"],
		Pill:         base,
	}, nil
}

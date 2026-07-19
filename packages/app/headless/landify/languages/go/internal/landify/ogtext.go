package landify

import (
	"strings"
	"unicode"
	"unicode/utf8"
)

// Card geometry, in the 1200 × 630 frame every Open Graph card uses. The layout
// is two columns: the copy fills the left one, an identity panel (a monogram
// tile over a stack of tag pills) fills the right one, and a header row spans
// the top. Every number here is in frame pixels.
const (
	ogWidth  = 1200
	ogHeight = 630
	ogRail   = 12
	ogPad    = 96
	ogEdge   = ogWidth - ogPad

	// Header row: a monogram tile, the site name beside it, the host of
	// site.og.url right-aligned, and a hairline spanning the content width.
	ogHeadY      = 84
	ogHeadTile   = 56
	ogHeadRadius = 16
	ogNameSize   = 26
	ogHostSize   = 22
	ogNameStep   = 20 // gap between the tile and the site name
	ogRuleY      = 176
	ogGutter     = 48
	ogHeadLift   = 37 // header row baseline, from the top of the tile
	ogHeadNudge  = 35 // the host sits 2px above the name: a size reads high
	ogMonoSize   = 26 // monogram size on the header tile
	ogMonoLift   = 15 // monogram baseline below the tile centre

	// Body: the copy fills the left column, the identity panel the right one.
	// Both stop at ogTextBottom, so the panel's foot lines up with the last
	// description line.
	ogColumn      = ogPanelX - ogPad - ogGutter
	ogTextTop     = 202
	ogTextBottom  = 584
	ogKickerSize  = 17
	ogKickerStep  = 30
	ogKickerTrack = 0.16 // letter-spacing, in ems
	ogTitleSize   = 58
	ogTitleStep   = 62
	ogTitleLines  = 3
	ogDescSize    = 25
	ogDescStep    = 35
	ogDescLines   = 3
	ogGap         = 52 // last title baseline → first description baseline
	ogKickerCap   = 12 // cap height of the kicker
	ogAscender    = 45 // cap height of the title
	ogTitleDesc   = 14 // descender of the title
	ogDescDepth   = 7  // descender of the description

	// Identity panel.
	ogPanelX        = 748
	ogPanelY        = ogTextTop
	ogPanelW        = ogEdge - ogPanelX
	ogPanelH        = ogTextBottom - ogTextTop
	ogPanelRadius   = 24
	ogPanelPad      = 30
	ogPanelTile     = 84
	ogPanelTileR    = 24
	ogPanelMonogram = 42 // monogram size on the panel tile
	ogPanelGap      = 26
	ogPillH         = 44
	ogPillGap       = 10
	ogPillSize      = 19
	ogPillPadX      = 20
	ogPillDot       = 8
	ogPillTextGap   = 12 // dot to label
	ogPillLift      = 7  // half the label's cap height, to centre it in the pill
	ogPillMax       = 4
	// ogPillFrame is what a pill spends on chrome: left pad, dot, gap, right pad.
	ogPillFrame = 2*ogPillPadX + ogPillDot + ogPillTextGap
)

// Contrast floors, WCAG AA. Text at 24px or larger, or 18.66px bold and up, is
// large text and only has to clear 3:1; the monogram is the card's only run that
// qualifies, at 26px bold in the header and 42px on the panel.
const (
	ogMinContrast      = 4.5
	ogLargeMinContrast = 3.0
)

// Advance widths per rune class, as a fraction of the font size. Wrapping only
// needs an estimate, and it has to stay deliberately generous: a line that
// overflows the card is visible, a slightly short line is not.
const (
	ogWidthSpace  = 0.28
	ogWidthNarrow = 0.32
	ogWidthWide   = 0.92
	ogWidthUpper  = 0.70
	ogWidthText   = 0.55
)

// ogRuneWidth returns the advance width of r at the given font size.
func ogRuneWidth(r rune, size float64) float64 {
	switch {
	case r == ' ':
		return ogWidthSpace * size
	case strings.ContainsRune("iljtIf.,:;'!|()[]{}-`", r):
		return ogWidthNarrow * size
	case strings.ContainsRune("mwMW@%", r):
		return ogWidthWide * size
	case unicode.IsUpper(r):
		return ogWidthUpper * size
	default:
		return ogWidthText * size
	}
}

// ogTextWidth estimates how wide s renders at the given font size.
func ogTextWidth(s string, size float64) float64 {
	var total float64
	for _, r := range s {
		total += ogRuneWidth(r, size)
	}
	return total
}

// ogTrackWidth is ogTextWidth plus letter-spacing, which SVG adds after every
// glyph including the last. The kicker is tracked, so it needs this.
func ogTrackWidth(s string, size, tracking float64) float64 {
	return ogTextWidth(s, size) + float64(utf8.RuneCountInString(s))*tracking*size
}

// ogClampTrack cuts s to maxWidth at the given tracking, for text drawn on a
// single line that has to fit beside the identity panel.
func ogClampTrack(s string, size, tracking, maxWidth float64) string {
	if ogTrackWidth(s, size, tracking) <= maxWidth {
		return s
	}
	for s != "" && ogTrackWidth(s+"…", size, tracking) > maxWidth {
		s = strings.TrimRight(s[:len(s)-1], " ")
	}
	return s + "…"
}

// ogWrap breaks s into at most maxLines lines that each fit maxWidth, cutting
// the overflow with an ellipsis once the line budget is spent. It never
// splits a word, so a single word longer than maxWidth stays on its own line.
func ogWrap(s string, size, maxWidth float64, maxLines int) []string {
	var lines []string
	used := ""
	for _, word := range strings.Fields(s) {
		candidate := word
		if used != "" {
			candidate = used + " " + word
		}
		if used != "" && ogTextWidth(candidate, size) > maxWidth {
			lines = append(lines, used)
			used = word
			continue
		}
		used = candidate
	}
	if used != "" {
		lines = append(lines, used)
	}
	if len(lines) <= maxLines {
		return lines
	}
	lines = lines[:maxLines]
	lines[len(lines)-1] = ogEllipsis(lines[len(lines)-1], size, maxWidth)
	return lines
}

// ogClamp returns s unchanged when it already fits maxWidth, and an
// ellipsized cut of it when it does not.
func ogClamp(s string, size, maxWidth float64) string {
	if ogTextWidth(s, size) <= maxWidth {
		return s
	}
	return ogEllipsis(s, size, maxWidth)
}

// ogEllipsis shortens line until line + "…" fits maxWidth, marking the cut.
func ogEllipsis(line string, size, maxWidth float64) string {
	for ogTextWidth(line+"…", size) > maxWidth && line != "" {
		line = strings.TrimRight(line[:len(line)-1], " ")
	}
	return line + "…"
}

// ogMonogram picks the one- or two-letter mark for a site name: the first two
// letters of the first word, or the initials of the first two words when the
// name has more than one (J.A.C.K. → JA). Emoji and punctuation are skipped,
// because site.mark does not survive rasterising.
func ogMonogram(name string) string {
	words := strings.FieldsFunc(name, func(r rune) bool {
		return !unicode.IsLetter(r) && !unicode.IsDigit(r)
	})
	if len(words) == 0 {
		return ""
	}
	letter := func(word string) string {
		for _, r := range word {
			if unicode.IsLetter(r) || unicode.IsDigit(r) {
				return string(unicode.ToUpper(r))
			}
		}
		return ""
	}
	if len(words) > 1 {
		return letter(words[0]) + letter(words[1])
	}
	if first := letter(words[0]); first != "" && len(words[0]) > 1 {
		return first + letter(words[0][1:])
	}
	return letter(words[0])
}

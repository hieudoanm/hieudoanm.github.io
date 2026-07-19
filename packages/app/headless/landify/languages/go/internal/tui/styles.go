package tui

import (
	"strings"

	"charm.land/lipgloss/v2"
	compat "charm.land/lipgloss/v2/compat"
)

// Adaptive colour palette from the shared design tokens; Lip Gloss picks the
// light or dark value from the terminal background automatically.
var (
	cPrimary = compat.AdaptiveColor{Light: lipgloss.Color("#3B7DD8"), Dark: lipgloss.Color("#4F9CFF")}
	cAccent  = compat.AdaptiveColor{Light: lipgloss.Color("#7C3AED"), Dark: lipgloss.Color("#A78BFA")}
	cMuted   = compat.AdaptiveColor{Light: lipgloss.Color("#6B6B75"), Dark: lipgloss.Color("#9A9AA5")}
	cSurface = compat.AdaptiveColor{Light: lipgloss.Color("#FFFFFF"), Dark: lipgloss.Color("#26262C")}
	cBorder  = compat.AdaptiveColor{Light: lipgloss.Color("#D0D0D5"), Dark: lipgloss.Color("#3A3A42")}
	cError   = compat.AdaptiveColor{Light: lipgloss.Color("#D64545"), Dark: lipgloss.Color("#FF5C5C")}
	cSuccess = compat.AdaptiveColor{Light: lipgloss.Color("#2FA968"), Dark: lipgloss.Color("#4FD68C")}
)

// Styles used by View. The editor and :command prompt share a rounded border;
// whichever mode is active gets the primary colour, the other stays neutral.
var (
	titleStyle   = lipgloss.NewStyle().Bold(true).Foreground(cPrimary)
	mutedStyle   = lipgloss.NewStyle().Foreground(cMuted)
	hintStyle    = lipgloss.NewStyle().Foreground(cMuted).Faint(true)
	successStyle = lipgloss.NewStyle().Bold(true).Foreground(cSuccess)
	errorStyle   = lipgloss.NewStyle().Bold(true).Foreground(cError)
	accentStyle  = lipgloss.NewStyle().Bold(true).Foreground(cAccent)
	dirtyStyle   = lipgloss.NewStyle().Foreground(cAccent)
	promptStyle  = lipgloss.NewStyle().Bold(true).Foreground(cPrimary)
	ruleStyle    = lipgloss.NewStyle().Foreground(cBorder)
	focusedStyle = lipgloss.NewStyle().
			Border(lipgloss.RoundedBorder()).
			BorderForeground(cPrimary).
			Padding(0, 1)
	unfocusedStyle = lipgloss.NewStyle().
			Border(lipgloss.RoundedBorder()).
			BorderForeground(cBorder).
			Padding(0, 1)
	rootStyle = lipgloss.NewStyle().Padding(1, 2)
)

// Content width limits keep the editor legible on very wide terminals.
const (
	minContentWidth = 40
	maxContentWidth = 100
)

// contentWidth caps the rendered width so content never stretches across a
// wide terminal; it falls back to 80 before the first resize message.
func contentWidth(termWidth int) int {
	if termWidth <= 0 {
		termWidth = 80
	}
	if termWidth > maxContentWidth {
		return maxContentWidth
	}
	return termWidth
}

// editorInnerWidth is the textarea width given the border and inner padding
// of the editor box (2 border columns + 2 padding columns).
func editorInnerWidth(cw int) int {
	if inner := cw - 4; inner > minContentWidth {
		return inner
	}
	return minContentWidth
}

// commandWidth leaves room next to the :command prompt for the key hints.
func commandWidth(cw int) int {
	if cw-8 > minContentWidth {
		return cw - 8
	}
	return minContentWidth
}

// statusStyle colours the status bar by meaning: errors are red, successful
// actions green, everything else a muted hint.
func statusStyle(status string) lipgloss.Style {
	for _, prefix := range []string{
		"could not read", "save failed", "build failed", "invalid", "unknown",
	} {
		if strings.HasPrefix(status, prefix) {
			return errorStyle
		}
	}
	for _, prefix := range []string{
		"Saved", "Reloaded", "Built", "Generated", "valid", "Build theme:",
	} {
		if strings.HasPrefix(status, prefix) {
			return successStyle
		}
	}
	return hintStyle
}

// distribute lays left and right across width, with at least one space gap.
func distribute(left, right string, width int) string {
	gap := width - lipgloss.Width(left) - lipgloss.Width(right)
	if gap < 1 {
		gap = 1
	}
	return left + strings.Repeat(" ", gap) + right
}

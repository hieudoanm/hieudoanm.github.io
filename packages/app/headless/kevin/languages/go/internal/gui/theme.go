//go:build gui

package gui

import (
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/theme"
)

// appTheme is the custom theme for the key/value manager, following the
// project's fyne design reference (packages/app/headless/FYNE.md): a
// two-variant palette (dark + light), slightly larger spacing tokens than the
// default theme, and consistent semantic colors for destructive/success
// actions and muted captions.
type appTheme struct{}

func (appTheme) Font(s fyne.TextStyle) fyne.Resource {
	return theme.DefaultTheme().Font(s)
}

func (appTheme) Icon(n fyne.ThemeIconName) fyne.Resource {
	return theme.DefaultTheme().Icon(n)
}

// Size widens the default padding and slims the scrollbar for a more modern
// look, keeping text and input border sizes at their defaults.
func (appTheme) Size(n fyne.ThemeSizeName) float32 {
	switch n {
	case theme.SizeNamePadding:
		return 8
	case theme.SizeNameInnerPadding:
		return 12
	case theme.SizeNameScrollBar, theme.SizeNameScrollBarSmall:
		return 10
	case theme.SizeNameInputBorder:
		return 1
	}
	return theme.DefaultTheme().Size(n)
}

// Color returns the app palette for the given name and theme variant.
func (appTheme) Color(name fyne.ThemeColorName, v fyne.ThemeVariant) color.Color {
	switch name {
	case theme.ColorNameBackground:
		if v == theme.VariantDark {
			return color.NRGBA{R: 0x1a, G: 0x1a, B: 0x1e, A: 0xff}
		}
		return color.NRGBA{R: 0xf7, G: 0xf7, B: 0xf9, A: 0xff}
	case theme.ColorNamePrimary:
		if v == theme.VariantDark {
			return color.NRGBA{R: 0x4f, G: 0x9c, B: 0xff, A: 0xff}
		}
		return color.NRGBA{R: 0x3b, G: 0x7d, B: 0xd8, A: 0xff}
	case theme.ColorNameForeground:
		if v == theme.VariantDark {
			return color.NRGBA{R: 0xe8, G: 0xe8, B: 0xec, A: 0xff}
		}
		return color.NRGBA{R: 0x1a, G: 0x1a, B: 0x1e, A: 0xff}
	case theme.ColorNameInputBackground:
		if v == theme.VariantDark {
			return color.NRGBA{R: 0x26, G: 0x26, B: 0x2c, A: 0xff}
		}
		return color.NRGBA{R: 0xff, G: 0xff, B: 0xff, A: 0xff}
	case theme.ColorNameDisabled:
		if v == theme.VariantDark {
			return color.NRGBA{R: 0x9a, G: 0x9a, B: 0xa5, A: 0xff}
		}
		return color.NRGBA{R: 0x6b, G: 0x6b, B: 0x75, A: 0xff}
	case theme.ColorNameSeparator:
		if v == theme.VariantDark {
			return color.NRGBA{R: 0x1f, G: 0x20, B: 0x29, A: 0xff}
		}
		return color.NRGBA{R: 0xe8, G: 0xeb, B: 0xf0, A: 0xff}
	case theme.ColorNameError:
		if v == theme.VariantDark {
			return color.NRGBA{R: 0xff, G: 0x5c, B: 0x5c, A: 0xff}
		}
		return color.NRGBA{R: 0xd6, G: 0x45, B: 0x45, A: 0xff}
	case theme.ColorNameSuccess:
		if v == theme.VariantDark {
			return color.NRGBA{R: 0x4f, G: 0xd6, B: 0x8c, A: 0xff}
		}
		return color.NRGBA{R: 0x2f, G: 0xa9, B: 0x68, A: 0xff}
	}
	return theme.DefaultTheme().Color(name, v)
}

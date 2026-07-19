//go:build gui

package gui

import (
	"fmt"
	"image/color"
	"sort"
	"strings"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/dialog"
	"fyne.io/fyne/v2/widget"

	"landify/internal/landify"
)

// themeWidgets binds every control in the theme studio pane.
type themeWidgets struct {
	p        *page
	preset   *widget.Select
	colors   map[string]string
	radius   *widget.Entry
	swatches map[string]*widget.Label
	tokens   *widget.Label
	contrast *widget.Label
	applying bool
}

// themeBaseColors are the eight authored colors in loader order.
var themeBaseColors = []struct {
	Key   string
	Label string
}{
	{"base", "base — backgrounds"},
	{"primary", "primary — brand accent"},
	{"secondary", "secondary — secondary accent"},
	{"neutral", "neutral — muted text / hairlines"},
	{"info", "info"},
	{"warning", "warning"},
	{"success", "success"},
	{"error", "error"},
}

// themePane builds the full "Theme Studio" inspector for the page. It starts
// from the 64 presets, lets each of the eight base colors be picked, shows the
// derived :root tokens, and lists the WCAG contrast for the important
// text/background pairs.
func (p *page) themePane() fyne.CanvasObject {
	t := &themeWidgets{
		p:        p,
		colors:   map[string]string{},
		swatches: map[string]*widget.Label{},
	}

	t.preset = widget.NewSelect(landify.ThemeNames(), t.applyPreset)
	t.radius = widget.NewEntry()
	t.radius.SetPlaceHolder("radius, e.g. 10px")
	t.tokens = widget.NewLabel("")
	t.contrast = widget.NewLabel("")

	var rows []fyne.CanvasObject
	for _, c := range themeBaseColors {
		rows = append(rows, t.colorRow(c.Key, c.Label))
	}
	rows = append(rows, container.NewHBox(widget.NewLabel("Radius"), t.radius))

	apply := widget.NewButton("Apply theme to YAML", t.applyTheme)
	reset := widget.NewButton("Reset to defaults", t.resetTheme)

	t.refresh()
	return container.NewScroll(container.NewVBox(
		widget.NewLabel("Every other :root token is derived from the eight colors below. Pick a preset to start, then tune individual colors. Apply writes the result back into the YAML (re-serialized)."),
		widget.NewLabel("Preset"),
		t.preset,
		widget.NewSeparator(),
		rows[0], rows[1], rows[2], rows[3], rows[4], rows[5], rows[6], rows[7], rows[8],
		widget.NewSeparator(),
		container.NewHBox(apply, reset),
		widget.NewSeparator(),
		widget.NewLabelWithStyle("Derived :root tokens", fyne.TextAlignLeading, fyne.TextStyle{Bold: true}),
		t.tokens,
		widget.NewLabelWithStyle("WCAG contrast (text on background)", fyne.TextAlignLeading, fyne.TextStyle{Bold: true}),
		t.contrast,
	))
}

// colorRow builds one labeled row with a "Choose" button and a live hex readout.
func (t *themeWidgets) colorRow(key, label string) fyne.CanvasObject {
	hex := widget.NewLabel("")
	t.swatches[key] = hex
	choose := widget.NewButton("Choose", func() { t.chooseColor(key) })
	return container.NewHBox(
		widget.NewLabel(label),
		choose,
		hex,
	)
}

// chooseColor opens the color dialog for one base color.
func (t *themeWidgets) chooseColor(key string) {
	title := "Pick " + key + " (#rrggbb)"
	dialog.ShowColorPicker(title, "Choose a new color.", func(c color.Color) {
		if t.applying {
			return
		}
		t.colors[key] = hexString(c)
		if l := t.swatches[key]; l != nil {
			l.SetText(t.colors[key])
		}
		t.previewDerived()
	}, t.p.ctrl.win)
}

// theme picks the current preview theme from the stored colors and radius.
func (t *themeWidgets) theme() landify.Theme {
	return landify.Theme{
		Base:      t.colors["base"],
		Primary:   t.colors["primary"],
		Secondary: t.colors["secondary"],
		Neutral:   t.colors["neutral"],
		Info:      t.colors["info"],
		Warning:   t.colors["warning"],
		Success:   t.colors["success"],
		Error:     t.colors["error"],
		Radius:    t.radius.Text,
	}
}

// refresh repaints every control from the document's current theme.
func (t *themeWidgets) refresh() {
	t.applying = true
	defer func() { t.applying = false }()

	th := landify.DefaultTheme()
	if cfg := t.p.doc.cfg; cfg != nil {
		th = cfg.Theme
	}
	for _, c := range themeBaseColors {
		t.colors[c.Key] = themeValue(th, c.Key)
		if l := t.swatches[c.Key]; l != nil {
			l.SetText(t.colors[c.Key])
		}
	}
	t.radius.SetText(th.Radius)
	t.previewDerived()
}

func themeValue(th landify.Theme, key string) string {
	switch key {
	case "base":
		return th.Base
	case "primary":
		return th.Primary
	case "secondary":
		return th.Secondary
	case "neutral":
		return th.Neutral
	case "info":
		return th.Info
	case "warning":
		return th.Warning
	case "success":
		return th.Success
	case "error":
		return th.Error
	}
	return ""
}

// previewDerived recalculates and renders the token + contrast readouts.
func (t *themeWidgets) previewDerived() {
	theme := t.theme()
	tokens, err := landify.Tokens(theme)
	if err != nil {
		t.tokens.SetText("theme is invalid: " + err.Error())
		t.contrast.SetText("")
		return
	}
	var b strings.Builder
	for _, k := range tokenKeys(tokens) {
		fmt.Fprintf(&b, "  --%s: %s\n", k, tokens[k])
	}
	t.tokens.SetText(strings.TrimSpace(b.String()))

	report, err := ContrastReport(theme)
	if err != nil {
		t.contrast.SetText("contrast unavailable: " + err.Error())
		return
	}
	var cb strings.Builder
	for _, r := range report {
		mark := "✓"
		if r.Rating == "fail" {
			mark = "✗"
		}
		fmt.Fprintf(&cb, "%s %-28s %s/%s  ratio %.2f\n", mark, r.Label, r.FG, r.BG, r.Ratio)
	}
	t.contrast.SetText(cb.String())
}

func tokenKeys(tokens map[string]string) []string {
	keys := make([]string, 0, len(tokens))
	for k := range tokens {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	return keys
}

func (t *themeWidgets) applyPreset(name string) {
	if name == "" {
		return
	}
	th, ok := landify.ThemeByName(name)
	if !ok {
		return
	}
	t.applying = true
	for _, c := range themeBaseColors {
		t.colors[c.Key] = themeValue(th, c.Key)
		if l := t.swatches[c.Key]; l != nil {
			l.SetText(t.colors[c.Key])
		}
	}
	t.radius.SetText(th.Radius)
	t.applying = false
	t.previewDerived()
	t.applyTheme()
}

func (t *themeWidgets) applyTheme() {
	if _, err := t.p.doc.SetTheme(t.theme()); err != nil {
		t.p.ctrl.statusErr("theme", err)
		return
	}
	t.p.dirty = true
	t.p.reloadEditor()
	t.p.ctrl.refreshTitle()
	t.p.ctrl.setStatus("Theme applied — YAML re-serialized")
}

func (t *themeWidgets) resetTheme() {
	th := landify.DefaultTheme()
	t.applying = true
	for _, c := range themeBaseColors {
		t.colors[c.Key] = themeValue(th, c.Key)
		if l := t.swatches[c.Key]; l != nil {
			l.SetText(t.colors[c.Key])
		}
	}
	t.radius.SetText(th.Radius)
	t.applying = false
	t.previewDerived()
	t.applyTheme()
}

func hexString(c color.Color) string {
	if c == nil {
		return ""
	}
	r, g, b, _ := c.RGBA()
	return fmt.Sprintf("#%02x%02x%02x", r>>8, g>>8, b>>8)
}

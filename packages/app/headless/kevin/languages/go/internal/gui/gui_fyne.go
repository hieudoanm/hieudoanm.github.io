//go:build gui

package gui

import (
	"context"
	"image/color"
	"time"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/dialog"
	"fyne.io/fyne/v2/theme"

	"github.com/hieudoanm/kevin/internal/db"
)

// lightSepTheme wraps the default theme and lightens separator lines so the
// table grid feels subtle rather than heavy.
type lightSepTheme struct{ fyne.Theme }

func (lightSepTheme) Color(name fyne.ThemeColorName, v fyne.ThemeVariant) color.Color {
	if name == theme.ColorNameSeparator {
		if v == theme.VariantDark {
			return color.NRGBA{R: 0x1F, G: 0x20, B: 0x29, A: 0xFF}
		}
		return color.NRGBA{R: 0xE8, G: 0xEB, B: 0xF0, A: 0xFF}
	}
	return theme.DefaultTheme().Color(name, v)
}

// lighterSepColor returns the same lighter separator colour used by
// lightSepTheme, so hand-drawn border lines match the table grid.
func lighterSepColor() color.Color {
	v := fyne.CurrentApp().Settings().ThemeVariant()
	if v == theme.VariantDark {
		return color.NRGBA{R: 0x1F, G: 0x20, B: 0x29, A: 0xFF}
	}
	return color.NRGBA{R: 0xE8, G: 0xEB, B: 0xF0, A: 0xFF}
}

// Run opens the key/value manager window backed by kv and blocks until the
// window is closed.
func Run(_ context.Context, kv *db.DB) error {
	a := app.New()
	a.Settings().SetTheme(lightSepTheme{Theme: theme.DefaultTheme()})
	w := a.NewWindow("kevin — Key/Value")
	w.Resize(fyne.NewSize(900, 600))
	w.SetPadded(true)

	c := newController(
		kv,
		w.SetTitle,
		func(title, message string, onConfirm func(bool)) {
			dialog.ShowConfirm(title, message, onConfirm, w)
		},
		w.Clipboard(),
	)
	c.focusKey = func() { w.Canvas().Focus(c.keyEntry) }
	c.render()

	stop := make(chan struct{})
	w.SetOnClosed(func() { close(stop) })
	go func() {
		ticker := time.NewTicker(500 * time.Millisecond)
		defer ticker.Stop()
		for {
			select {
			case <-stop:
				return
			case <-ticker.C:
				fyne.Do(c.render)
			}
		}
	}()

	c.keyEntry.OnSubmitted = func(string) { w.Canvas().Focus(c.valueEntry) }
	c.valueEntry.OnSubmitted = func(string) { c.doSet() }

	w.SetContent(buildContent(c))
	w.ShowAndRun()
	return nil
}

// buildContent assembles the control bar, the key/value table, and a bottom
// border line. The control bar shares the table's column widths so the inputs
// line up with Key/Value.
func buildContent(c *controller) fyne.CanvasObject {
	controls := container.New(
		controlLayout{actionWidth: c.actionWide},
		c.count, c.keyEntry, c.valueEntry, c.setBtn, c.refreshBtn, c.delAllBtn,
	)
	bottom := canvas.NewLine(lighterSepColor())
	tableArea := container.NewBorder(nil, bottom, nil, nil, c.tableView)
	return container.NewBorder(controls, c.status, nil, nil, tableArea)
}

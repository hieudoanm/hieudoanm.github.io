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
	"fyne.io/fyne/v2/widget"

	"github.com/hieudoanm/kevin/internal/db"
)

// lighterSepColor returns the separator colour from the app theme, so
// hand-drawn border lines match the table grid in both variants.
func lighterSepColor() color.Color {
	return appTheme{}.Color(theme.ColorNameSeparator, fyne.CurrentApp().Settings().ThemeVariant())
}

// Run opens the key/value manager window backed by kv and blocks until the
// window is closed.
func Run(_ context.Context, kv *db.DB) error {
	a := app.New()
	a.Settings().SetTheme(appTheme{})
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
// border line, framed in a card so the app reads as a single surface panel.
// The control bar shares the table's column widths so the inputs line up with
// Key/Value and the buttons line up with the per-row actions.
func buildContent(c *controller) fyne.CanvasObject {
	controls := container.New(
		controlLayout{actionWidth: c.actionWide},
		c.count, c.keyEntry, c.valueEntry, c.setBtn, c.refreshBtn, c.delAllBtn,
	)
	bottom := canvas.NewLine(lighterSepColor())
	tableArea := container.NewBorder(nil, bottom, nil, nil, c.tableView)
	inner := container.NewBorder(controls, c.status, nil, nil, tableArea)
	return widget.NewCard("", "", inner)
}

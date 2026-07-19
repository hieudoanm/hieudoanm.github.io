//go:build gui

package gui

import (
	"fyne.io/fyne/v2/app"
)

// Run opens the "landify studio" window. path, when non-empty, is the initial
// document to open; otherwise the studio starts with a blank product scaffold.
// Run blocks until the window is closed.
func Run(path string) error {
	a := app.New()
	c := newController(a, path)
	c.window()
	c.run()
	return nil
}

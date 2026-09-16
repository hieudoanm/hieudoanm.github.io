//go:build !gui

// Package gui is the optional "landify studio" window. The window requires
// CGO (fyne), so the default binary ships only the stub below; the real
// implementation lives in gui_fyne.go behind the `gui` build tag.
package gui

import "errors"

// ErrUnavailable is returned by Run when the binary was built without fyne
// support (e.g. a CGO_ENABLED=0 build or the default `make build`).
var ErrUnavailable = errors.New("GUI support not compiled in; rebuild with the `gui` build tag (CGO enabled)")

// Run reports that the GUI build is unavailable. The gui-tagged build
// replaces this with the real window.
func Run(_ string) error {
	return ErrUnavailable
}

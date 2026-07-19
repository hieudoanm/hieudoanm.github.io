//go:build !gui

package gui

import (
	"context"
	"errors"

	"github.com/hieudoanm/kevin/internal/db"
)

// ErrUnavailable is returned by Run when the binary was built without fyne
// support (e.g. a CGO_ENABLED=0 build).
var ErrUnavailable = errors.New("GUI support not compiled in; rebuild with the `gui` build tag (CGO enabled)")

// Run reports that the GUI build is unavailable.
func Run(_ context.Context, _ *db.DB) error {
	return ErrUnavailable
}

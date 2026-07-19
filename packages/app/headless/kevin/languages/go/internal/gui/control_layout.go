//go:build gui

package gui

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/theme"
)

// controlLayout lays out the control bar with the same column widths as the
// list table, so the inputs line up with the Key and Value columns and the
// buttons line up with the per-row action columns.
type controlLayout struct {
	actionWidth float32
}

var _ fyne.Layout = controlLayout{}

func (l controlLayout) MinSize(objects []fyne.CanvasObject) fyne.Size {
	padding := theme.Padding()
	width, height := float32(0), float32(0)
	for _, o := range objects {
		if !o.Visible() {
			continue
		}
		min := o.MinSize()
		width += min.Width + padding
		if min.Height > height {
			height = min.Height
		}
	}
	return fyne.NewSize(width, height)
}

func (l controlLayout) Layout(objects []fyne.CanvasObject, size fyne.Size) {
	if len(objects) != columnCount {
		return
	}
	padding := theme.Padding()
	widths := columnWidths(size.Width, padding, l.actionWidth)
	x := float32(0)
	for i, o := range objects {
		w := widths[i]
		if i == 0 || i >= 3 {
			childWidth := o.MinSize().Width
			o.Move(fyne.NewPos(x+(w-childWidth)/2, 0))
			o.Resize(fyne.NewSize(childWidth, size.Height))
		} else {
			o.Move(fyne.NewPos(x, 0))
			o.Resize(fyne.NewSize(w, size.Height))
		}
		x += w + padding
	}
}

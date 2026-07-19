//go:build gui

package gui

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"
)

const (
	columnCount      = 6
	noColWidth       = float32(50)
	minActionWidth   = float32(40)
	minKeyValueWidth = float32(100)
)

// columnWidths returns the six column widths: a narrow "No" column, three
// uniform action columns, and Key/Value splitting the remaining space evenly.
func columnWidths(total, padding, action float32) [columnCount]float32 {
	if action < minActionWidth {
		action = minActionWidth
	}
	fixed := noColWidth + action*3 + padding*float32(columnCount-1)
	half := (total - fixed) / 2
	if half < minKeyValueWidth {
		half = minKeyValueWidth
	}
	return [columnCount]float32{noColWidth, half, half, action, action, action}
}

// maxButtonWidth returns the widest of the given buttons, never below the
// minimum action column width.
func maxButtonWidth(buttons ...*widget.Button) float32 {
	width := minActionWidth
	for _, b := range buttons {
		if w := b.MinSize().Width; w > width {
			width = w
		}
	}
	return width
}

// flexTable wraps a widget.Table and keeps its columns filling the available
// width. fyne paints the header background across the whole table width, so
// leftover space would otherwise look like an oversized last column.
type flexTable struct {
	widget.BaseWidget
	inner       *widget.Table
	actionWidth float32
	keyWidth    float32
	valueWidth  float32
}

func newFlexTable(inner *widget.Table, actionWidth float32) *flexTable {
	f := &flexTable{inner: inner, actionWidth: actionWidth}
	f.ExtendBaseWidget(f)
	return f
}

func (f *flexTable) CreateRenderer() fyne.WidgetRenderer {
	return widget.NewSimpleRenderer(f.inner)
}

func (f *flexTable) Resize(size fyne.Size) {
	f.stretchColumns(size.Width)
	f.BaseWidget.Resize(size)
}

func (f *flexTable) stretchColumns(width float32) {
	padding := f.inner.Theme().Size(theme.SizeNamePadding)
	widths := columnWidths(width, padding, f.actionWidth)
	for i, w := range widths {
		f.inner.SetColumnWidth(i, w)
	}
	f.keyWidth = widths[1]
	f.valueWidth = widths[2]
}
